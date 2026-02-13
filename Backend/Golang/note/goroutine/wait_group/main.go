package main

import (
	"fmt"
	"sync"
	"time"
)

func say(id int, wg *sync.WaitGroup) {
	defer wg.Done()
	fmt.Printf("工人 %d 开始干活\n", id)
	time.Sleep(time.Duration(id) * time.Second)
	fmt.Printf("工人 %d 完工\n", id)
}

func test1() {
	var wg sync.WaitGroup

	for i := 1; i <= 5; i++ {
		wg.Add(1)
		go say(i, &wg)
	}

	fmt.Println("主进程等待所有工人完工")
	wg.Wait()
	fmt.Println("所有工人完工")
}

func download() {
	urls := []string{"baidu.com", "google.com", "bing.com"}

	var wg sync.WaitGroup

	wg.Add(len(urls))

	for i := 0; i < len(urls); i++ {
		go func(url string) {
			defer wg.Done()
			fmt.Println("Downloading from: " + url)
			time.Sleep(3 * time.Second)
			fmt.Println("Downloaded from: " + url)
		}(urls[i])
	}

	wg.Wait()
}

func main() {
	// test1()
	download()
}
