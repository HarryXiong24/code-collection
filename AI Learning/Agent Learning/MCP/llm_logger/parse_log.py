"""Render the raw llm.log (OpenRouter SSE stream dump) into a complete, readable
Markdown transcript.

The log interleaves request lines ("模型请求：{...}") with hundreds of SSE chunks
("data: {...}"). For every round this script reconstructs BOTH sides in full:

  Request  : model + all sampling params, the system prompt, every tool schema,
             and the complete messages array (system / user / assistant / tool).
  Response : the SSE chunks reassembled into reasoning (thinking) + content
             (answer) + tool_calls (streamed argument fragments concatenated) +
             usage.

Constant parts (params / system prompt / tools are identical across rounds) are
shown once up top; each round then shows its message list and the model output.
"""
import json
import re
from pathlib import Path

LOG = Path(__file__).with_name("llm.log")
OUT_MD = Path(__file__).with_name("transcript.md")


# --------------------------------------------------------------------------- #
# Parsing
# --------------------------------------------------------------------------- #
def parse_log():
    requests, streams, order = [], {}, []
    with LOG.open(encoding="utf-8") as f:
        for raw in f:
            line = raw.strip()
            if line.startswith("模型请求："):
                try:
                    requests.append(json.loads(line[len("模型请求："):]))
                except json.JSONDecodeError:
                    requests.append({})
                continue
            if not line.startswith("data: ") or "[DONE]" in line:
                continue
            try:
                obj = json.loads(line[len("data: "):])
            except json.JSONDecodeError:
                continue
            gid = obj.get("id")
            if gid not in streams:
                streams[gid] = {"id": gid, "model": obj.get("model"),
                                "content": [], "reasoning": [],
                                "tool_calls": {}, "finish_reason": None,
                                "usage": None}
                order.append(gid)
            acc = streams[gid]
            if obj.get("usage"):
                acc["usage"] = obj["usage"]
            for choice in obj.get("choices", []):
                delta = choice.get("delta", {})
                if delta.get("content"):
                    acc["content"].append(delta["content"])
                if delta.get("reasoning"):
                    acc["reasoning"].append(delta["reasoning"])
                for tc in delta.get("tool_calls", []) or []:
                    slot = acc["tool_calls"].setdefault(
                        tc.get("index", 0), {"id": None, "name": None, "arguments": []})
                    if tc.get("id"):
                        slot["id"] = tc["id"]
                    fn = tc.get("function", {})
                    if fn.get("name"):
                        slot["name"] = fn["name"]
                    if fn.get("arguments"):
                        slot["arguments"].append(fn["arguments"])
                if choice.get("finish_reason"):
                    acc["finish_reason"] = choice["finish_reason"]

    responses = []
    for gid in order:
        acc = streams[gid]
        tool_calls = []
        for idx in sorted(acc["tool_calls"]):
            slot = acc["tool_calls"][idx]
            arg_str = "".join(slot["arguments"])
            try:
                args = json.loads(arg_str) if arg_str.strip() else {}
            except json.JSONDecodeError:
                args = arg_str
            tool_calls.append({"id": slot["id"], "name": slot["name"], "arguments": args})
        responses.append({
            "id": gid, "model": acc["model"], "finish_reason": acc["finish_reason"],
            "usage": acc["usage"], "content": "".join(acc["content"]),
            "reasoning": "".join(acc["reasoning"]), "tool_calls": tool_calls,
        })
    return requests, responses


# --------------------------------------------------------------------------- #
# Rendering helpers
# --------------------------------------------------------------------------- #
def details(summary, body):
    return f"<details>\n<summary>{summary}</summary>\n\n{body}\n\n</details>"


def code(text, lang=""):
    return f"```{lang}\n{text}\n```"


def render_tool_args(args):
    if isinstance(args, dict):
        return code(json.dumps(args, ensure_ascii=False, indent=2), "json")
    return code(str(args))


def render_message(idx, msg):
    """Render one request message (system / user / assistant / tool) in full."""
    role = msg.get("role", "?")
    out = [f"#### [{idx}] `{role}`", ""]
    content = msg.get("content")

    if role == "assistant" and msg.get("tool_calls"):
        if content:
            out += [content, ""]
        for tc in msg["tool_calls"]:
            fn = tc.get("function", {})
            args = fn.get("arguments", "")
            try:
                args = json.dumps(json.loads(args), ensure_ascii=False, indent=2)
            except (json.JSONDecodeError, TypeError):
                pass
            out += [f"调用工具 **`{fn.get('name')}`** (id: `{tc.get('id')}`):",
                    "", code(args, "json"), ""]
        return "\n".join(out)

    if role == "tool":
        out += [f"工具返回 (tool_call_id: `{msg.get('tool_call_id')}`):", ""]
        out += [code(content if isinstance(content, str) else
                     json.dumps(content, ensure_ascii=False, indent=2), "text"), ""]
        return "\n".join(out)

    if isinstance(content, list):  # multi-part content
        content = "\n".join(p.get("text", "") for p in content if isinstance(p, dict))
    out += [code(content or "(空)", "text"), ""]
    return "\n".join(out)


def render(requests, responses):
    L = ["# LLM 完整交互记录", ""]
    if not requests:
        OUT_MD.write_text("\n".join(L), encoding="utf-8")
        return

    req0 = requests[0]
    L.append(f"**模型**: `{req0.get('model')}`　|　**轮数**: {len(requests)}")
    L.append("")
    L.append("> 由 `llm.log` 完整整合：SSE 流式分块已合并；下方"
             "“请求配置 / 系统提示词 / 工具定义”在所有轮次中完全一致，故只展示一次。")
    L.append("")

    # ---- global request config -------------------------------------------- #
    params = {k: v for k, v in req0.items() if k not in ("messages", "tools")}
    L += ["## ⚙️ 请求配置（所有轮次一致）", "", code(json.dumps(params, ensure_ascii=False, indent=2), "json"), ""]

    # ---- system prompt ---------------------------------------------------- #
    system = next((m["content"] for m in req0["messages"] if m["role"] == "system"), "")
    L += ["## 📜 系统提示词（system prompt）", "",
          f"长度 {len(system)} 字符。", "",
          details("点击展开完整系统提示词", code(system, "text")), ""]

    # ---- tools ------------------------------------------------------------ #
    tools = req0.get("tools", [])
    L += [f"## 🧰 可用工具（{len(tools)} 个）", ""]
    for t in tools:
        fn = t.get("function", {})
        desc = (fn.get("description", "") or "").strip()
        first_line = desc.splitlines()[0] if desc else ""
        body = []
        if desc:
            body += ["**描述**：", "", code(desc, "text"), ""]
        if fn.get("parameters"):
            body += ["**参数 schema**：", "",
                     code(json.dumps(fn["parameters"], ensure_ascii=False, indent=2), "json")]
        L.append(details(f"<code>{fn.get('name')}</code> — {first_line[:70]}", "\n".join(body)))
    L.append("")

    # ---- per-round -------------------------------------------------------- #
    L += ["## 💬 逐轮对话", ""]
    for i, req in enumerate(requests):
        resp = responses[i] if i < len(responses) else None
        L += [f"### ━━━ 第 {i + 1} 轮 ━━━", ""]

        # request side (skip the constant system prompt, note it)
        msgs = req.get("messages", [])
        L += ["#### 📥 请求消息", "",
              "_(省略已在上方展示的 system 提示词)_", ""]
        for idx, m in enumerate(msgs):
            if m.get("role") == "system":
                continue
            L.append(render_message(idx, m))

        # response side
        if resp:
            L += ["#### 📤 模型响应（SSE 整合）", ""]
            meta = f"`finish_reason: {resp['finish_reason']}`"
            if resp["usage"]:
                u = resp["usage"]
                meta += (f"　|　tokens: prompt {u.get('prompt_tokens')} + "
                         f"completion {u.get('completion_tokens')} = {u.get('total_tokens')}")
            L += [meta, ""]
            if resp["reasoning"]:
                L += ["**🤔 思考 (reasoning)**", "", resp["reasoning"], ""]
            if resp["content"]:
                L += ["**💬 回答 (content)**", "", resp["content"], ""]
            for tc in resp["tool_calls"]:
                L += [f"**🔧 工具调用 `{tc['name']}`** (id: `{tc['id']}`)", "",
                      render_tool_args(tc["arguments"]), ""]
                if isinstance(tc["arguments"], dict) and tc["arguments"].get("result"):
                    L += [f"> ✅ **最终回答**：{tc['arguments']['result']}", ""]
        L += ["", "<br>", ""]

    OUT_MD.write_text("\n".join(L), encoding="utf-8")


def main():
    requests, responses = parse_log()
    render(requests, responses)
    print(f"Rendered {len(requests)} rounds -> {OUT_MD}")


if __name__ == "__main__":
    main()
