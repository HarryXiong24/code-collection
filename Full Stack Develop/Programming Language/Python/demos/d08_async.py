"""08 Concurrency & async — asyncio (coroutines) is Python's main workhorse for I/O concurrency.

Key points:
  1. async def defines a coroutine; await suspends the current coroutine and hands control back to the event loop.
  2. asyncio.gather runs multiple coroutines concurrently; total time ≈ the slowest one.
  3. TaskGroup (3.11+) is a safer way to write concurrency; if any fails the rest are cancelled.
  4. asyncio.wait_for does timeouts; a cancelled coroutine raises CancelledError.
  5. Mind the GIL: asyncio/threads suit I/O-bound work; CPU-bound work needs multiprocessing.
"""

import asyncio
import time

from .log import note, show, title


async def task(label: str, seconds: float) -> str:
    await asyncio.sleep(seconds)  # simulate an I/O wait without blocking the event loop
    return f"{label}({int(seconds * 1000)}ms)"


async def _main() -> None:
    note("serial await: one after another, total time is the sum")
    t = time.perf_counter()
    a = await task("A", 0.03)
    b = await task("B", 0.03)
    show("serial result", [a, b])
    show("serial time (ms)", int((time.perf_counter() - t) * 1000))

    note("concurrent gather: run together, total time ≈ the slowest one")
    t = time.perf_counter()
    c, d = await asyncio.gather(task("C", 0.03), task("D", 0.03))
    show("concurrent result", [c, d])
    show("concurrent time (ms)", int((time.perf_counter() - t) * 1000))

    note("TaskGroup (3.11+): structured concurrency, any failure auto-cancels the rest")
    async with asyncio.TaskGroup() as tg:
        t1 = tg.create_task(task("X", 0.01))
        t2 = tg.create_task(task("Y", 0.02))
    show("TaskGroup result", [t1.result(), t2.result()])

    note("timeout control: wait_for raises TimeoutError on timeout")
    try:
        await asyncio.wait_for(task("slow", 0.1), timeout=0.02)
    except asyncio.TimeoutError:
        show("wait_for timeout", "TimeoutError")


def run() -> None:
    title("08 Concurrency & async (asyncio)")
    asyncio.run(_main())  # enter the event loop from the synchronous world
