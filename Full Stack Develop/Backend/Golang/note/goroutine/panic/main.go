package main

import (
	"fmt"
	"sync"
)

func main() {
	var wg sync.WaitGroup
	tasks := []string{"任务1", "任务2", "任务3"}

	for _, t := range tasks {
		wg.Add(1)
		go func(name string) {
			defer wg.Done()
			defer func() {
				if err := recover(); err != nil {
					fmt.Println(err)
				}
			}()

			fmt.Println("正在执行:", name)
			if name == "任务2" {
				panic("任务2炸了！")
			}
			fmt.Println("执行完毕:", name)
		}(t)
	}

	wg.Wait()
	fmt.Println("所有任务处理完毕（无论成功失败）")
}
