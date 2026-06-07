# ===== 标准库依赖 =====
import ast  # 用于把字符串安全地解析成 Python 字面量（如 int、list、dict）
import inspect  # 用于反射：读取工具函数的签名和 docstring，自动生成工具说明
import os  # 文件路径、环境变量等操作系统相关操作
import re  # 正则表达式，用于从模型输出里提取 <thought>/<action> 等标签内容
from string import Template  # 简单的模板替换（用 $变量 占位），用来渲染系统提示词
from typing import List, Callable, Tuple  # 类型注解

# ===== 第三方依赖 =====
import click  # 构建命令行界面（CLI）
from dotenv import load_dotenv  # 从 .env 文件加载环境变量（如 API Key）
from openai import OpenAI  # OpenAI 官方 SDK，这里用来访问 OpenAI 兼容的 OpenRouter 接口
import platform  # 检测当前操作系统类型

# 从同目录的 prompt_template.py 导入系统提示词模板（含 ReAct 协议的说明）
from prompt_template import react_system_prompt_template


class ReActAgent:
    """ReAct 模式的 AI 代理：让大模型在「思考 → 行动 → 观察」的循环中自主调用工具完成任务。"""

    def __init__(self, tools: List[Callable], model: str, project_directory: str):
        # 把工具函数列表转成 {函数名: 函数对象} 的字典，方便后续按名字调用
        self.tools = {func.__name__: func for func in tools}
        self.model = model  # 要使用的模型名称（如 "openai/gpt-oss-120b:free"）
        self.project_directory = project_directory  # 代理操作的目标项目目录
        # 初始化 OpenAI 客户端，但指向 OpenRouter 的兼容接口
        self.client = OpenAI(
            base_url="https://openrouter.ai/api/v1",
            api_key=ReActAgent.get_api_key(),  # 从环境变量读取 API Key
        )

    def run(self, user_input: str):
        """ReAct 主循环：接收用户任务，反复「思考-行动-观察」直到得出最终答案。"""
        # 初始化对话历史：系统提示词（含工具说明和协议） + 用户的问题
        messages = [
            {
                "role": "system",
                "content": self.render_system_prompt(react_system_prompt_template),
            },
            # 用 <question> 标签包裹用户输入，符合提示词约定的格式
            {"role": "user", "content": f"<question>{user_input}</question>"},
        ]

        # 无限循环，直到模型给出 <final_answer> 或用户取消才退出
        while True:

            # 1) 请求模型，拿到本轮回复内容
            content = self.call_model(messages)

            # 2) 检测并打印 Thought（模型的思考过程），便于观察推理链
            thought_match = re.search(r"<thought>(.*?)</thought>", content, re.DOTALL)
            if thought_match:
                thought = thought_match.group(1)
                print(f"\n\n💭 Thought: {thought}")

            # 3) 检测模型是否给出最终答案，如果是就提取内容并结束循环
            if "<final_answer>" in content:
                final_answer = re.search(
                    r"<final_answer>(.*?)</final_answer>", content, re.DOTALL
                )
                # 防御：标签存在但格式不完整（缺少闭合标签）时 search 会返回 None，
                # 此时不要直接 .group() 以免抛 AttributeError
                if not final_answer:
                    raise RuntimeError("模型输出的 <final_answer> 标签不完整")
                return final_answer.group(1)

            # 4) 检测 Action（模型要调用的工具），没有则说明输出不符合协议，报错
            action_match = re.search(r"<action>(.*?)</action>", content, re.DOTALL)
            if not action_match:
                raise RuntimeError("模型未输出 <action>")
            action = action_match.group(1)
            # 把 "工具名(参数...)" 字符串解析成函数名和参数列表
            tool_name, args = self.parse_action(action)

            print(f"\n\n🔧 Action: {tool_name}({', '.join(args)})")
            # 5) 安全确认：只有执行终端命令这种有风险的操作才询问用户，其余工具直接执行
            should_continue = (
                input(f"\n\n是否继续？（Y/N）")
                if tool_name == "run_terminal_command"
                else "y"
            )
            if should_continue.lower() != "y":
                print("\n\n操作已取消。")
                return "操作被用户取消"

            # 6) 实际执行工具，捕获异常并把错误信息当作观察结果反馈给模型
            try:
                observation = self.tools[tool_name](*args)
            except Exception as e:
                observation = f"工具执行错误：{str(e)}"
            print(f"\n\n🔍 Observation：{observation}")
            # 7) 把工具执行结果用 <observation> 标签包裹，追加到对话里，进入下一轮思考
            obs_msg = f"<observation>{observation}</observation>"
            messages.append({"role": "user", "content": obs_msg})

    def get_tool_list(self) -> str:
        """生成工具列表字符串，包含函数签名和简要说明（供系统提示词使用）"""
        tool_descriptions = []
        for func in self.tools.values():
            name = func.__name__  # 工具名
            signature = str(inspect.signature(func))  # 反射得到参数签名，如 (file_path, content)
            doc = inspect.getdoc(func)  # 反射得到函数的 docstring 作为说明
            tool_descriptions.append(f"- {name}{signature}: {doc}")
        return "\n".join(tool_descriptions)

    def render_system_prompt(self, system_prompt_template: str) -> str:
        """渲染系统提示模板：把工具列表、操作系统、项目文件列表填进占位符"""
        tool_list = self.get_tool_list()  # 动态生成的工具说明
        # 列出项目目录下所有文件的绝对路径，逗号分隔，告诉模型有哪些文件可操作
        file_list = ", ".join(
            os.path.abspath(os.path.join(self.project_directory, f))
            for f in os.listdir(self.project_directory)
        )
        # 用 Template.substitute 把模板里的 $operating_system / $tool_list / $file_list 替换掉
        return Template(system_prompt_template).substitute(
            operating_system=self.get_operating_system_name(),
            tool_list=tool_list,
            file_list=file_list,
        )

    @staticmethod
    def get_api_key() -> str:
        """从环境变量中加载 API Key（先读取 .env 文件）。"""
        load_dotenv()  # 把 .env 文件里的键值对加载到环境变量
        api_key = os.getenv("OPENROUTER_API_KEY")
        if not api_key:
            # 缺少 Key 时直接报错，提示用户去 .env 配置
            raise ValueError(
                "未找到 OPENROUTER_API_KEY 环境变量，请在 .env 文件中设置。"
            )
        return api_key

    def call_model(self, messages):
        """调用大模型：发送完整对话历史，拿到回复并追加到历史中。"""
        print("\n\n正在请求模型，请稍等...")
        # 发起一次 Chat Completions 请求（传入到目前为止的全部消息）
        response = self.client.chat.completions.create(
            model=self.model,
            messages=messages,
        )
        content = response.choices[0].message.content  # 取出模型回复文本
        # 把模型回复以 assistant 角色加入历史，保证下一轮有上下文记忆
        messages.append({"role": "assistant", "content": content})
        return content

    def parse_action(self, code_str: str) -> Tuple[str, List[str]]:
        """把形如 `工具名("参数1", "参数2")` 的字符串解析成 (函数名, 参数列表)。

        没有直接用 ast/eval，是为了稳健处理工具参数里包含多行文本、嵌套括号、
        引号内逗号等情况（典型场景：写文件时 content 是一大段代码）。
        """
        # 先用正则拆出「函数名」和「括号内的参数整体字符串」
        match = re.match(r"(\w+)\((.*)\)", code_str, re.DOTALL)
        if not match:
            raise ValueError("Invalid function call syntax")

        func_name = match.group(1)
        args_str = match.group(2).strip()

        # 下面手动逐字符扫描，按「顶层逗号」切分参数
        args = []
        current_arg = ""  # 正在累积的当前参数文本
        in_string = False  # 是否处于字符串字面量内部
        string_char = None  # 记录字符串的引号类型（' 或 "）
        i = 0
        paren_depth = 0  # 括号嵌套深度，确保只在最外层逗号处切分

        while i < len(args_str):
            char = args_str[i]

            if not in_string:
                # 不在字符串内：需要识别引号、括号、顶层逗号
                if char in ['"', "'"]:
                    in_string = True  # 进入字符串
                    string_char = char
                    current_arg += char
                elif char == "(":
                    paren_depth += 1  # 进入更深一层括号
                    current_arg += char
                elif char == ")":
                    paren_depth -= 1  # 退出一层括号
                    current_arg += char
                elif char == "," and paren_depth == 0:
                    # 只有顶层（不在任何括号/字符串内）的逗号才是参数分隔符
                    args.append(self._parse_single_arg(current_arg.strip()))
                    current_arg = ""
                else:
                    current_arg += char
            else:
                # 在字符串内：原样累积，只检测「未被转义的」结束引号
                current_arg += char
                if char == string_char and (i == 0 or args_str[i - 1] != "\\"):
                    in_string = False
                    string_char = None

            i += 1

        # 循环结束后，把最后一个参数也加进去
        if current_arg.strip():
            args.append(self._parse_single_arg(current_arg.strip()))

        return func_name, args

    def _parse_single_arg(self, arg_str: str):
        """解析单个参数：把字符串字面量去引号并还原转义，其余尝试转成 Python 字面量。"""
        arg_str = arg_str.strip()

        # 情况一：被成对引号包裹的字符串字面量
        if (arg_str.startswith('"') and arg_str.endswith('"')) or (
            arg_str.startswith("'") and arg_str.endswith("'")
        ):
            # 去掉外层引号
            inner_str = arg_str[1:-1]
            # 手动还原常见转义字符（\" \' \n \t \r \\）
            inner_str = inner_str.replace('\\"', '"').replace("\\'", "'")
            inner_str = inner_str.replace("\\n", "\n").replace("\\t", "\t")
            inner_str = inner_str.replace("\\r", "\r").replace("\\\\", "\\")
            return inner_str

        # 情况二：尝试用 ast.literal_eval 解析数字、布尔、列表、字典等字面量
        try:
            return ast.literal_eval(arg_str)
        except (SyntaxError, ValueError):
            # 解析失败就当作普通字符串原样返回
            return arg_str

    def get_operating_system_name(self):
        """返回友好的操作系统名称（用于填进系统提示词，让模型知道命令语法环境）。"""
        os_map = {"Darwin": "macOS", "Windows": "Windows", "Linux": "Linux"}

        return os_map.get(platform.system(), "Unknown")


# ==================== 工具函数（供 Agent 调用）====================
# 注意：这些函数的 docstring 会被 get_tool_list() 反射读取，作为给模型的工具说明，
# 所以注释要写清楚用途。


def read_file(file_path):
    """用于读取文件内容"""
    with open(file_path, "r", encoding="utf-8") as f:
        return f.read()


def write_to_file(file_path, content):
    """将指定内容写入指定文件"""
    with open(file_path, "w", encoding="utf-8") as f:
        # 再做一次 \n 还原，兜底模型传入的字面量换行符没有被正确转义的情况
        f.write(content.replace("\\n", "\n"))
    return "写入成功"


def run_terminal_command(command):
    """用于执行终端命令"""
    import subprocess

    # shell=True 执行命令，捕获标准输出/错误，text=True 让结果以字符串返回
    run_result = subprocess.run(command, shell=True, capture_output=True, text=True)
    # 返回码为 0 表示成功，否则把错误输出返回给模型作为观察结果
    return "执行成功" if run_result.returncode == 0 else run_result.stderr


# ==================== 命令行入口 ====================
@click.command()
@click.argument(
    # 必填参数：项目目录，必须存在且是目录（不能是文件）
    "project_directory", type=click.Path(exists=True, file_okay=False, dir_okay=True)
)
def main(project_directory):
    project_dir = os.path.abspath(project_directory)  # 转成绝对路径

    # 注册可供 Agent 使用的工具集合
    tools = [read_file, write_to_file, run_terminal_command]
    # 创建 Agent 实例（指定免费模型与目标项目目录）
    agent = ReActAgent(
        tools=tools, model="openai/gpt-oss-120b:free", project_directory=project_dir
    )

    task = input("请输入任务：")  # 从命令行读取用户任务

    final_answer = agent.run(task)  # 启动 ReAct 循环，得到最终答案

    print(f"\n\n✅ Final Answer：{final_answer}")


if __name__ == "__main__":
    # 直接运行本文件时，启动 click 命令行
    main()
