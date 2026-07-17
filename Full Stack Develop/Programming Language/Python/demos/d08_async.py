"""08 并发与异步 —— asyncio（协程）是 Python 处理 I/O 并发的主力。

要点：
  1. async def 定义协程；await 挂起当前协程、把控制权交回事件循环。
  2. asyncio.gather 并发跑多个协程；总耗时≈最慢那个。
  3. TaskGroup（3.11+）是更安全的并发写法，任一失败会取消其余。
  4. asyncio.wait_for 做超时；协程被取消抛 CancelledError。
  5. 注意 GIL：asyncio/线程适合 I/O 密集；CPU 密集要用多进程。
"""

import asyncio
import time

from .log import note, show, title


async def task(label: str, seconds: float) -> str:
    await asyncio.sleep(seconds)  # 模拟 I/O 等待，不阻塞事件循环
    return f"{label}({int(seconds * 1000)}ms)"


async def _main() -> None:
    note("串行 await：一个接一个，总耗时相加")
    t = time.perf_counter()
    a = await task("A", 0.03)
    b = await task("B", 0.03)
    show("串行结果", [a, b])
    show("串行耗时(ms)", int((time.perf_counter() - t) * 1000))

    note("并发 gather：一起跑，总耗时≈最慢那个")
    t = time.perf_counter()
    c, d = await asyncio.gather(task("C", 0.03), task("D", 0.03))
    show("并发结果", [c, d])
    show("并发耗时(ms)", int((time.perf_counter() - t) * 1000))

    note("TaskGroup（3.11+）：结构化并发，任一失败自动取消其余")
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(task("X", 0.01))
        t2 = tg.create_task(task("Y", 0.02))
    show("TaskGroup 结果", [t1.result(), t2.result()])

    note("超时控制：wait_for 超时抛 TimeoutError")
    try:
        await asyncio.wait_for(task("slow", 0.1), timeout=0.02)
    except asyncio.TimeoutError:
        show("wait_for 超时", "TimeoutError")


def run() -> None:
    title("08 并发与异步（asyncio）")
    asyncio.run(_main())  # 从同步世界进入事件循环
