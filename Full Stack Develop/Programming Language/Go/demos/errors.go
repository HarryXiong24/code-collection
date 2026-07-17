package demos

import (
	"errors"
	"fmt"

	"proglang/internal/logx"
)

// ValidationError 自定义错误类型：实现 error 接口（有 Error() string 即可）。
type ValidationError struct {
	Field string
	Msg   string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("%s: %s", e.Field, e.Msg)
}

// ErrNotFound 哨兵错误：用 errors.Is 比对。
var ErrNotFound = errors.New("not found")

func parseAge(input string) (int, error) {
	n := 0
	_, err := fmt.Sscanf(input, "%d", &n)
	if err != nil {
		return 0, &ValidationError{Field: "age", Msg: fmt.Sprintf("%q 不是数字", input)}
	}
	if n < 0 {
		return 0, &ValidationError{Field: "age", Msg: "年龄不能为负"}
	}
	return n, nil
}

func lookup(id int) (string, error) {
	if id != 1 {
		// %w 包裹底层错误，保留链条供 errors.Is/As 追溯
		return "", fmt.Errorf("lookup id=%d: %w", id, ErrNotFound)
	}
	return "Harry", nil
}

// Errors 演示错误处理。
// 要点：
//  1. Go 把错误当普通返回值：if err != nil 是最核心的惯用法，没有异常控制流。
//  2. 自定义错误 = 实现 error 接口；用 errors.As 取出具体类型。
//  3. fmt.Errorf("...: %w", err) 包裹错误，errors.Is 判断是否是某个哨兵错误。
//  4. panic/recover 只用于真正的「不可恢复」场景，不是常规错误处理。
func Errors() {
	logx.Title("07 错误处理")

	logx.Note("错误是返回值：调用后立刻 if err != nil")
	if _, err := parseAge("abc"); err != nil {
		var ve *ValidationError
		if errors.As(err, &ve) { // 取出具体错误类型，读它的字段
			logx.Show("errors.As 取出字段", fmt.Sprintf("field=%s msg=%s", ve.Field, ve.Msg))
		}
	}

	logx.Note("errors.Is：顺着 %w 链判断是不是某个哨兵错误")
	_, err := lookup(99)
	logx.Show("err", err)
	logx.Show("errors.Is(err, ErrNotFound)", errors.Is(err, ErrNotFound))

	logx.Note("正常路径：err 为 nil")
	name, err := lookup(1)
	logx.Show("lookup(1)", fmt.Sprintf("name=%s, err=%v", name, err))

	logx.Note("panic/recover：仅用于不可恢复错误，defer 里 recover 兜住")
	safe := func() (result string) {
		defer func() {
			if r := recover(); r != nil {
				result = fmt.Sprintf("recovered: %v", r)
			}
		}()
		panic("boom")
	}
	logx.Show("recover 结果", safe())
}
