package main

import (
	"fmt"
	"math/rand"
	"sync"
	"time"
)

// 具体要求：
// 1. 初始化任务：
// - 准备一个 urls 切片，里面存放 10 个字符串（如 url-1 到 url-10）。
// - 创建一个 SafeStore 结构体，内部包含一个 map[string]int（Key 是 URL，Value 是内容长度）和一个 sync.Mutex。实现一个 Save(url string, size int) 方法。
// 2. 通道与同步：
// - 创建一个 jobs 通道，用于传递 URL。
// -使用 sync.WaitGroup 确保所有工人完成工作。
// 3. 抓取工人 (Worker)：
// - 启动 3 个工人协程。
// - 核心逻辑：工人使用 select 尝试从 jobs 获取任务。
// - 情况 A：如果拿到 URL，模拟抓取（time.Sleep 随机几百毫秒），然后生成一个随机数作为“网页大小”，调用 Save 方法存入 SafeStore。
// - 情况 B：如果 5 秒钟内没有拿到任何 URL（可能是老板发货慢了或者发完了），打印“工人 [ID] 等太久了，辞职回家”，并退出协程。
// 4. 主协程 (Boss)：
// - 负责将 10 个 URL 发送到 jobs 通道。
// - 发完后关闭 jobs 通道。
// - 等待所有工人收工。
// - 最后打印 SafeStore 里的所有抓取结果。

type SafeStore struct {
	Collect map[string]int
	Lock    sync.Mutex
}

func NewSafeStore() *SafeStore {
	return &SafeStore{
		Collect: make(map[string]int),
		Lock:    sync.Mutex{},
	}
}

func (s *SafeStore) Save(url string, size int) {
	s.Lock.Lock()
	defer s.Lock.Unlock()

	s.Collect[url] = size
}

func worker(id int, jobs <-chan string, store *SafeStore, wg *sync.WaitGroup) {
	defer wg.Done()
	defer func() {
		if err := recover(); err != nil {
			fmt.Println(err)
		}
	}()

	for {
		select {
		case url, ok := <-jobs:
			if !ok {
				fmt.Printf("工人 [%d] 发现活发完了，下班！\n", id)
				return
			}
			// 模拟抓取
			fmt.Printf("工人 [%d] 正在抓取: %s\n", id, url)
			time.Sleep(time.Duration(rand.Intn(500)) * time.Millisecond)
			store.Save(url, rand.Intn(1000))

		case <-time.After(5 * time.Second): // 5秒没领到新任务
			fmt.Printf("工人 [%d] 等得花儿都谢了，辞职！\n", id)
			return
		}
	}
}

func main() {
	urls := []string{"url-1", "url-2", "url-3", "url-4", "url-5", "url-6", "url-7", "url-8", "url-9", "url-10"}
	store := NewSafeStore()
	var wg sync.WaitGroup
	jobs := make(chan string, 10)

	// 启动 3 个工人
	for i := 0; i < 3; i++ {
		wg.Add(1)
		go worker(i, jobs, store, &wg)
	}

	// 发送 10 个 URL
	go func() {
		defer func() {
			if err := recover(); err != nil {
				fmt.Println(err)
			}
		}()

		for _, value := range urls {
			jobs <- value
		}
		close(jobs)
	}()

	wg.Wait()

	fmt.Printf("%+v", store.Collect)
}
