package demos

import "testing"

// 13 测试 —— Go 内置 testing 包，零第三方依赖。
// 运行：go test ./...   （详细：go test -v ./...）
// 要点：
//  1. 测试文件名以 _test.go 结尾，函数以 Test 开头、收 *testing.T。
//  2. 表驱动测试是 Go 社区的标准写法：把用例列成一张表，循环跑。
//  3. t.Run 给每个子用例命名，失败时能精确定位。
//  4. 断言就是普通 if + t.Errorf，标准库不带断言库（也可上 testify）。

func TestClassify(t *testing.T) {
	cases := []struct {
		name string
		in   int
		want string
	}{
		{"negative", -5, "negative"},
		{"zero", 0, "zero"},
		{"positive", 42, "positive"},
	}
	for _, c := range cases {
		t.Run(c.name, func(t *testing.T) {
			if got := Classify(c.in); got != c.want {
				t.Errorf("Classify(%d) = %q, want %q", c.in, got, c.want)
			}
		})
	}
}

func TestDivide(t *testing.T) {
	t.Run("正常相除", func(t *testing.T) {
		got, err := Divide(10, 2)
		if err != nil || got != 5 {
			t.Errorf("Divide(10,2) = %d, %v; want 5, nil", got, err)
		}
	})

	t.Run("除以0返回error", func(t *testing.T) {
		if _, err := Divide(1, 0); err == nil {
			t.Error("Divide(1,0) 应返回 error，实际为 nil")
		}
	})
}
