package demos

import (
	"fmt"
	"sync"
	"time"

	"proglang/internal/logx"
)

// Concurrency demonstrates concurrency.
// Key points:
//  1. go f() starts a goroutine (extremely lightweight, a few KB stack); thousands or tens of thousands are fine.
//  2. A channel is a type-safe pipe between goroutines: ch <- v sends, <-ch receives.
//  3. sync.WaitGroup waits for a group of goroutines to all finish.
//  4. select waits on multiple channels at once, and can pair with time.After for a timeout.
//  5. Shared memory needs a lock (sync.Mutex), or just "communicate instead of share".
func Concurrency() {
	logx.Title("08 Concurrency (goroutine + channel)")

	logx.Note("WaitGroup + buffered channel: collect results after concurrent computation")
	start := time.Now()
	tasks := []int{30, 30, 30} // each sleeps 30ms
	results := make(chan string, len(tasks))
	var wg sync.WaitGroup
	for i, ms := range tasks {
		wg.Add(1)
		go func(id, delay int) { // one goroutine per task
			defer wg.Done()
			time.Sleep(time.Duration(delay) * time.Millisecond)
			results <- fmt.Sprintf("task%d(%dms)", id, delay)
		}(i, ms)
	}
	wg.Wait()      // wait for all to finish
	close(results) // after closing you can range over it cleanly
	got := []string{}
	for r := range results {
		got = append(got, r)
	}
	logx.Show("number of concurrent results", len(got))
	logx.Show("concurrent time ≈ the slowest one (ms)", time.Since(start).Milliseconds()) // ≈30, not 90

	logx.Note("select + time.After: whichever is ready first wins, implementing a timeout")
	slow := make(chan string)
	go func() {
		time.Sleep(100 * time.Millisecond)
		slow <- "done"
	}()
	select {
	case v := <-slow:
		logx.Show("select", v)
	case <-time.After(20 * time.Millisecond):
		logx.Show("select timeout", "timeout")
	}

	logx.Note("shared counter: protected by a Mutex to avoid data races")
	var mu sync.Mutex
	counter := 0
	var wg2 sync.WaitGroup
	for i := 0; i < 100; i++ {
		wg2.Add(1)
		go func() {
			defer wg2.Done()
			mu.Lock()
			counter++ // critical section
			mu.Unlock()
		}()
	}
	wg2.Wait()
	logx.Show("100 goroutines each +1", counter) // reliably 100
}
