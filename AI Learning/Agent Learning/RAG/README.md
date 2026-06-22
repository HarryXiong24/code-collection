# 运行方法

## 安装依赖

首先请确保你的系统已经安装了 uv 和 Jupyter，否则请参照如下链接安装：

- uv: https://docs.astral.sh/uv/getting-started/installation/
- Jupyter: https://jupyter.org/install

然后在项目根目录下创建一个名为 `.env` 的文件，并添加以下内容：

```env
GEMINI_API_KEY=xxx
```

其中 xxx 为你的 Google Gemini API 密钥。没有密钥的用户可以在 https://aistudio.google.com/apikey 上申请。

然后使用 uv 安装如下 Python 依赖：

```bash
uv add sentence_transformers chromadb google-genai python-dotenv
```

再使用 uv 运行 Jupyter Notebook：

```bash
uv run --with jupyter jupyter lab
```