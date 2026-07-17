package demos

import (
	"fmt"
	"sync"
	"time"

	"proglang/internal/logx"
)

// Concurrency 演示并发。
// 要点：
//  1. go f() 起一个 goroutine（极轻量，几 KB 栈），几千上万个都没问题。
//  2. channel 是 goroutine 之间的类型安全管道：ch <- v 发送，<-ch 接收。
//  3. sync.WaitGroup 等一组 goroutine 全部结束。
//  4. select 同时等多个 channel，可配 time.After 做超时。
//  5. 共享内存要加锁（sync.Mutex），或干脆「用通信代替共享」。
func Concurrency() {
	logx.Title("08 并发（goroutine + channel）")

	logx.Note("WaitGroup + 带缓冲 channel：并发算完再收集结果")
	start := time.Now()
	tasks := []int{30, 30, 30} // 每个睡 30ms
	results := make(chan string, len(tasks))
	var wg sync.WaitGroup
	for i, ms := range tasks {
		wg.Add(1)
		go func(id, delay int) { // 每个任务一个 goroutine
			defer wg.Done()
			time.Sleep(time.Duration(delay) * time.Millisecond)
			results <- fmt.Sprintf("task%d(%dms)", id, delay)
		}(i, ms)
	}
	wg.Wait()      // 等全部完成
	close(results) // 关闭后可以 range 取干净
	got := []string{}
	for r := range results {
		got = append(got, r)
	}
	logx.Show("并发结果数", len(got))
	logx.Show("并发耗时≈最慢那个(ms)", time.Since(start).Milliseconds()) // ≈30 而非 90

	logx.Note("select + time.After：谁先就绪走谁，实现超时")
	slow := make(chan string)
	go func() {
		time.Sleep(100 * time.Millisecond)
		slow <- "done"
	}()
	select {
	case v := <-slow:
		logx.Show("select", v)
	case <-time.After(20 * time.Millisecond):
		logx.Show("select 超时", "timeout")
	}

	logx.Note("共享计数器：Mutex 保护，避免数据竞争")
	var mu sync.Mutex
	counter := 0
	var wg2 sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg2.Add(1)
		go func() {
			defer wg2.Done()
			mu.Lock()
			counter++ // 临界区
			mu.Unlock()
		}()
	}
	wg2.Wait()
	logx.Show("100 goroutine 各 +1", counter) // 稳定是 100
}
