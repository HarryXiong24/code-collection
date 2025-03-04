// 管道的阻塞
// 当这个管道只写入数据，不读，就会发生阻塞
// 阻塞发生的原因在于 Go 中的通道（channel）在没有数据可读取或者无法发送数据时，默认情况下会让 Goroutine 进入等待状态，导致代码暂停执行，直到条件满足为止。这种行为称为 阻塞。

// 写的快，读的慢，不会发生阻塞

package main

import (
	"fmt"
	"sync"
)

func read(intChan chan int) {
	defer wg.Done()
	for value := range intChan {
		fmt.Println("The read data is: ", value)
	}
}

func write(intChan chan int) {
	defer wg.Done()
	for i := 1; i <= 50; i++ {
		intChan <- i
		fmt.Println("The write data is: ", i)
	}

	close(intChan)
}

var wg sync.WaitGroup

func main() {
	intChan := make(chan int, 50)

	// 开启读和写的协程
	wg.Add(2)
	go write(intChan)
	go read(intChan)

	wg.Wait()
}

// 在 Go 语言中，**通道（channel）会阻塞**，但是否阻塞取决于通道的**类型（无缓冲 or 有缓冲）**以及**读写速度**。

// ---

// ## **1. 无缓冲通道（Unbuffered Channel）**
// ### **写入操作会阻塞，直到有 Goroutine 读取**
// ```go
// package main

// import "fmt"

// func main() {
//     ch := make(chan int) // 无缓冲通道

//     go func() {
//         ch <- 10 // 这里会阻塞，直到 main 协程读取数据
//         fmt.Println("Sent 10")
//     }()

//     fmt.Println(<-ch) // 读取数据，解除阻塞
//     fmt.Println("Done")
// }
// ```
// ### **执行结果**
// ```
// 10
// Sent 10
// Done
// ```
// ### **解释**
// - **写入 `ch <- 10` 时，若没有其他协程读取数据，写入操作会阻塞。**
// - **`<-ch` 读取数据后，写入才完成。**
// - **无缓冲通道** 强制发送方和接收方在**同一时刻进行数据交互**。

// ### **✅ 结论：无缓冲通道写入时必须有人读取，否则会阻塞。**

// ---

// ## **2. 有缓冲通道（Buffered Channel）**
// ### **写入不会立即阻塞，直到缓冲区满**
// ```go
// package main

// import (
//     "fmt"
//     "time"
// )

// func main() {
//     ch := make(chan int, 3) // 有缓冲通道，容量为3

//     go func() {
//         ch <- 1
//         fmt.Println("Sent 1")
//         ch <- 2
//         fmt.Println("Sent 2")
//         ch <- 3
//         fmt.Println("Sent 3")
//         ch <- 4 // 阻塞，因为缓冲区已满
//         fmt.Println("Sent 4")
//     }()

//     time.Sleep(time.Second * 2) // 延迟读取数据
//     fmt.Println("Received:", <-ch)
//     fmt.Println("Received:", <-ch)
//     fmt.Println("Received:", <-ch)
//     fmt.Println("Received:", <-ch) // 解除阻塞
// }
// ```
// ### **可能的输出**
// ```
// Sent 1
// Sent 2
// Sent 3
// Received: 1
// Sent 4
// Received: 2
// Received: 3
// Received: 4
// ```
// ### **解释**
// - `ch <- 1, 2, 3` **不会阻塞**，因为缓冲区有 3 个空位。
// - `ch <- 4` **会阻塞**，因为缓冲区已满，必须等 `<-ch` 读取数据后才会继续执行。
// - 当 `<-ch` 读取数据，缓冲区空出位置，`ch <- 4` 才能继续执行。

// ### **✅ 结论：**
// - **有缓冲通道** 允许写入**不阻塞**，只要缓冲区**未满**。
// - **当缓冲区满时，写入阻塞，直到有协程读取数据。**

// ---

// ## **3. 写入快，读取慢，不会发生阻塞？**
// 你提到的「**写的快，读的慢，不会发生阻塞**」，**前提是有足够大的缓冲区**。

// ```go
// package main

// import (
// 	"fmt"
// 	"time"
// )

// func main() {
// 	ch := make(chan int, 100) // 100个缓冲

// 	// 写入数据（生产者）
// 	go func() {
// 		for i := 1; i <= 100; i++ {
// 			ch <- i
// 			fmt.Println("Sent:", i)
// 			time.Sleep(time.Millisecond * 10) // 写入间隔短
// 		}
// 		close(ch) // 关闭通道
// 	}()

// 	// 读取数据（消费者）
// 	go func() {
// 		time.Sleep(time.Second * 2) // 读取延迟
// 		for val := range ch {
// 			fmt.Println("Received:", val)
// 			time.Sleep(time.Millisecond * 500) // 读取间隔长
// 		}
// 	}()

// 	time.Sleep(time.Second * 20) // 等待所有 goroutine 完成
// }
// ```

// ### **执行结果**
// - 由于 `ch` 的缓冲区很大，生产者 `ch <- i` **可以一直写入数据，而不会阻塞**，直到缓冲区满。
// - 读取数据时，即使比写入慢，也不会影响写入，除非缓冲区满。

// ### **✅ 结论**
// - **写入速度快，读取速度慢**，如果**缓冲区足够大**，那么**不会发生阻塞**。
// - **当缓冲区满时，写入操作才会阻塞，直到有数据被消费。**

// ---

// ## **4. 什么时候会发生阻塞？**
// | **通道类型**       | **写入时是否会阻塞？**                                |
// |------------------|--------------------------------|
// | **无缓冲通道** (`make(chan int)`) | ✅ **阻塞**（必须有读取方，否则写入会阻塞） |
// | **有缓冲通道** (`make(chan int, N)`) | ❌ 不阻塞（缓冲未满） ✅ 阻塞（缓冲区满） |
// | **写的快，读的慢** | ✅ 可能阻塞（如果缓冲区满） ❌ 不阻塞（如果缓冲区够大） |

// ---

// ## **5. 总结**
// 1. **无缓冲通道 `make(chan T)`**
//    - 发送和接收必须**同步**，否则写入操作会阻塞。
//    - 发送操作 `ch <- x` **必须等到接收方 `<-ch` 读取后才能继续**。

// 2. **有缓冲通道 `make(chan T, N)`**
//    - 写入不会阻塞，**只要缓冲区未满**。
//    - 如果缓冲区**写满后，写入会阻塞**，直到有读取操作。

// 3. **写的快，读的慢**
//    - **不会阻塞**，如果**缓冲区足够大**，可以暂存未消费的数据。
//    - **会阻塞**，如果**缓冲区满**，写入必须等到数据被消费。

// ### **🚀 如何避免阻塞**
// ✅ **使用合适大小的缓冲区**
// ✅ **使用 goroutine 读取数据**
// ✅ **确保写入方和读取方的执行速率匹配**
// ✅ **如果不确定速率，可以 select + default 避免阻塞**
// ```go
// select {
// case ch <- value:
//     fmt.Println("Sent:", value)
// default:
//     fmt.Println("Channel is full, skipping...")
// }
// ```
// 这样写入不会阻塞，而是跳过写入，避免 goroutine 挂起。

// ---
// **📌 结论：在 Go 语言中，写的快、读的慢不会阻塞的前提是**「**缓冲区足够大**」。但如果缓冲区满了，**写入操作会阻塞**，等待数据被消费。
