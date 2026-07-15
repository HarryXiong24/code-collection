# 运行方法

首先请确保你已经安装了 uv，如果没有的话，请按以下页面的要求安装：

https://docs.astral.sh/uv/guides/install-python/

然后在当前目录下，新建一个叫做 .env 的文件，输入以下内容：

```
OPENROUTER_API_KEY=xxx
```

xxx 就是你在 OpenRouter 上配好的 API Key。如果你不用 OpenRouter，那直接改下代码，换个别的 baseUrl 就行了。

确保 uv 已经安装成功后，进入到当前文件所在目录，然后执行以下命令即可启动：

```bash
uv run agent.py snake
```