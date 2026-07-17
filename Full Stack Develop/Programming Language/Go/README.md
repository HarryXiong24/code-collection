# Go

Go 语言用法演示。每个 demo 打印出「表达式 → 结果」，跑一遍就能看到语言特性的真实行为，不用去背文档。

与同目录的 [`../TypeScript`](../TypeScript) 和 [`../Python`](../Python) 是**同一套主题、逐一对应**的三份实现，方便横向对比三种强类型语言的写法差异。

## 跑起来

```bash
go run .                    # 跑全部 15 个 demo
go run . generics memory    # 只跑指定的几个
go test ./...               # 跑单元测试（见 demos/mathx_test.go）
```

需要 Go ≥ 1.21（用到 `slices` / `cmp` / `maps` 泛型标准库；本项目声明 1.23）。无第三方依赖。

## 内容

| # | 文件 | 名字 | 重点 |
| --- | --- | --- | --- |
| 01 | `demos/types.go` | `types` | `var`/`:=`、基本类型、零值、无隐式转换、`iota`、`rune`/`byte` |
| 02 | `demos/collections.go` | `collections` | 数组 vs 切片、`map`、逗号 ok、`map[T]struct{}` 当 set、`slices` 包 |
| 03 | `demos/functions.go` | `functions` | 多返回值、可变参数、命名返回、`defer`、闭包、高阶函数 |
| 04 | `demos/controlflow.go` | `control-flow` | 只有 `for`、`if` 带初始化、`switch` 自动 break、类型 switch |
| 05 | `demos/structs.go` | `structs` | 结构体、值/指针接收者、隐式接口、嵌入组合替代继承 |
| 06 | `demos/generics.go` | `generics` | 类型参数、`cmp.Ordered`、自定义 type set、泛型类型 `Stack[T]` |
| 07 | `demos/errors.go` | `errors` | `error` 返回值、`errors.Is`/`As`、`%w` 包裹、`panic`/`recover` |
| 08 | `demos/concurrency.go` | `concurrency` | goroutine、channel、`WaitGroup`、`select` + 超时、`Mutex` |
| 09 | `demos/advancedtypes.go` | `advanced-types` | defined type、`iota` + `Stringer` 枚举、type alias、类型断言 |
| 10 | `demos/reflection.go` | `reflection` | struct tag + `reflect`（Go 版「注解/元编程」）、迷你校验器 |
| 11 | `demos/memory.go` | `memory` | 指针 `*T`/`&`、传值 vs 传指针、`new`/`make`、逃逸分析 |
| 12 | `demos/stdlib.go` | `stdlib` | `encoding/json`、`time`、`strings`、`sort` |
| 13 | `demos/iterators.go` | `iterators` | **range-over-func（1.23）**、`iter.Seq`、惰性无限序列、`slices.Collect` |
| 14 | `demos/modules.go` + `internal/shapes/` | `modules` | 包是封装单元、大小写控制导出、`init()`、`internal/` 边界 |
| 15 | `demos/sortingequality.go` | `sorting` | `slices.SortFunc`、`cmp.Or` 多键、稳定排序、结构体 `==` 可比 / 作 map 键 |
| 16 | `demos/mathx_test.go` | — | 内置 `testing` 包，表驱动测试（用 `go test ./...` 跑） |

## 类型系统要点（Go 的取舍）

- **静态强类型 + 无隐式转换**：`int` 和 `int64` 相加也要显式转，看似啰嗦，但杜绝了一整类隐蔽 bug。
- **隐式接口（结构化）**：类型只要有接口要求的方法就自动满足，不写 `implements`。这点与 TypeScript 的结构化类型、Python 的 `Protocol` 一致。
- **组合优于继承**：Go 没有继承，用**嵌入**（把一个类型匿名放进另一个结构体）复用字段和方法（见 `05`）。
- **错误是值，不是异常**：`if err != nil` 是最核心的惯用法；`panic`/`recover` 只留给真正不可恢复的场景（见 `07`）。
- **没有装饰器/注解**：需要「元编程」时用 struct tag + 反射（见 `10`），json 序列化、ORM、参数校验都基于此。

## 工具链

| 用途 | 工具 |
| --- | --- |
| 依赖管理 | `go mod`（`go.mod` / `go.sum`），`go get` 添加依赖 |
| 构建 / 运行 | `go build`、`go run .` |
| 测试 | 内置 `go test`（无需第三方） |
| 格式化 | `gofmt` / `go fmt`（官方唯一风格，不用争论） |
| 静态检查 | `go vet`，社区常配 `staticcheck` / `golangci-lint` |
