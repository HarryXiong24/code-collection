import httpx
from fastapi import FastAPI, Request
from starlette.responses import StreamingResponse


class AppLogger:
    def __init__(self, log_file="llm.log"):
        """Initialize the logger with a file that will be cleared on startup."""
        self.log_file = log_file
        # Clear the log file on startup
        with open(self.log_file, 'w') as f:
            f.write("")

    def log(self, message):
        """Log a message to both file and console."""

        # Log to file
        with open(self.log_file, 'a') as f:
            f.write(message + "\n")

        # Log to console
        print(message)


app = FastAPI(title="LLM API Logger")
logger = AppLogger("llm.log")


@app.post("/chat/completions")
async def proxy_request(request: Request):

    body_bytes = await request.body()
    body_str = body_bytes.decode('utf-8')
    logger.log(f"模型请求：{body_str}")
    body = await request.json()

    logger.log("模型返回：\n")

    async def event_stream():
        async with httpx.AsyncClient(timeout=None) as client:
            async with client.stream(
                    "POST",
                    "https://openrouter.ai/api/v1/chat/completions",
                    json=body,
                    headers={
                        "Content-Type": "application/json",
                        "Accept": "text/event-stream",
                        "Authorization": request.headers.get("Authorization"),
                    },
            ) as response:
                async for line in response.aiter_lines():
                    logger.log(line)
                    yield f"{line}\n"

    return StreamingResponse(event_stream(), media_type="text/event-stream")


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=8000)
