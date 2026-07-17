package demos

import (
	"fmt"
	"reflect"
	"strings"

	"proglang/internal/logx"
)

// Product 用 struct tag 给字段附加「元数据」。
// tag 是反引号里的字符串，encoding/json、数据库 ORM、校验库都靠它工作。
type Product struct {
	ID    int     `json:"id" validate:"required"`
	Name  string  `json:"name" validate:"required"`
	Price float64 `json:"price" validate:"min=0"`
	notes string  // 未导出字段：反射看得到但读不了值
}

// validate 用反射读取 tag，做一个迷你校验器 —— 相当于其它语言用「装饰器/注解」做的事。
func validate(v any) []string {
	var problems []string
	rv := reflect.ValueOf(v)
	rt := rv.Type()
	for i := 0; i < rt.NumField(); i++ {
		field := rt.Field(i)
		rule := field.Tag.Get("validate") // 读 `validate:"..."` 里的规则
		if strings.Contains(rule, "required") && rv.Field(i).IsZero() {
			problems = append(problems, field.Name+" 不能为空")
		}
	}
	return problems
}

// Reflection 演示 struct tag + 反射（Go 版「元编程 / 注解」）。
// 要点：
//  1. Go 没有 TS/Python 那样的装饰器，横切逻辑靠 struct tag + reflect 实现。
//  2. tag 是附在字段上的字符串元数据，编译期不解释，运行时用反射读取。
//  3. json 序列化、ORM 映射、参数校验全都基于这套机制。
//  4. 反射灵活但慢且丢失编译期检查，能不用就不用。
func Reflection() {
	logx.Title("10 struct tag + 反射（元编程）")

	logx.Note("reflect 遍历字段名与类型")
	rt := reflect.TypeOf(Product{})
	for i := 0; i < rt.NumField(); i++ {
		f := rt.Field(i)
		logx.Show("field "+f.Name, fmt.Sprintf("%s  json=%s", f.Type, f.Tag.Get("json")))
	}

	logx.Note("基于 validate tag 的迷你校验器（缺 required 字段会报出来）")
	bad := Product{Price: -1} // ID、Name 空
	logx.Show("validate(bad)", validate(bad))

	good := Product{ID: 1, Name: "Book", Price: 20}
	logx.Show("validate(good)", validate(good))
}
