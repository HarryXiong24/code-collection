package main

import (
	"fmt"
	"sync"
	"time"
)

// 状态,发送 (ch <- x),接收 (<-ch),关闭 (close(ch))
// 未初始化 (nil),永久阻塞 (死锁),永久阻塞 (死锁),Panic
// 正常 (已 make),阻塞或成功,阻塞或成功,成功
// 已关闭 (closed),Panic,立刻返回零值,Panic
// 已满 (有缓冲),阻塞,成功,成功

var wg sync.WaitGroup

func work1(worker int, jobs <-chan int) {
	defer wg.Done()
	for jobId := range jobs {
		fmt.Printf("工人 [%d] 领取了任务 [%d]\n", worker, jobId)
		time.Sleep(time.Millisecond * 10)
		fmt.Printf("工人 [%d] 完成了任务 [%d]\n", worker, jobId)
	}
}

func factory1() {
	workers := []int{1, 2, 3}
	jobs := make(chan int, 10)

	for i := 0; i < len(workers); i++ {
		wg.Add(1)
		go work1(workers[i], jobs)
	}

	// 下发任务
	for i := 1; i <= 100; i++ {
		jobs <- i
	}

	close(jobs)

	wg.Wait()
	fmt.Printf("所有任务已完成")
}

func work2(worker int, jobs <-chan int, results chan<- int) {
	defer wg.Done()
	for jobId := range jobs {
		fmt.Printf("工人 [%d] 领取了任务 [%d]\n", worker, jobId)
		time.Sleep(time.Millisecond * 10)
		results <- jobId * jobId
		fmt.Printf("工人 [%d] 完成了任务 [%d]\n", worker, jobId*jobId)
	}
}

func factory2() {
	workers := []int{1, 2, 3}
	jobs := make(chan int, 10)
	results := make(chan int, 100)

	for i := 0; i < len(workers); i++ {
		wg.Add(1)
		go work2(workers[i], jobs, results)
	}

	for i := 1; i <= 100; i++ {
		jobs <- i
	}
	close(jobs)

	wg.Wait()
	close(results)

	output := make([]int, 0)
	for res := range results {
		output = append(output, res)
	}

	fmt.Printf("所有任务已完成: %+v", output)
}

func work3(worker int, jobs <-chan []int, results chan<- int) {
	defer wg.Done()
	for job := range jobs {
		fmt.Printf("工人 [%d] 领取了任务 [%+v]\n", worker, job)
		sum := 0
		for _, val := range job {
			sum += val
		}
		results <- sum
		time.Sleep(time.Millisecond * 10)
		fmt.Printf("工人 [%d] 完成了任务 [%d]\n", worker, sum)
	}
}

func factory3() {
	workers := []int{1, 2, 3, 4, 5}
	jobs := make(chan []int, 100)
	results := make(chan int, 8)

	for i := 0; i < len(workers); i++ {
		wg.Add(1)
		go work3(workers[i], jobs, results)
	}

	go func() {
		task := make([]int, 0)
		for i := 1; i <= 100; i++ {
			task = append(task, i)
			if len(task) == 10 {
				temp := make([]int, len(task))
				copy(temp, task)
				jobs <- temp
				task = task[:0]
			}
		}
		close(jobs)
	}()

	go func() {
		wg.Wait()
		close(results)
	}()

	totalSum := 0
	for res := range results {
		totalSum += res
	}

	fmt.Printf("所有任务已完成: %+v", totalSum)
}

func main() {
	// factory1()
	// factory2()
	factory3()
}
