package demos

import (
	"encoding/json"
	"fmt"
	"sort"
	"strings"
	"time"

	"proglang/internal/logx"
)

// person 带 json tag，控制序列化后的字段名。
type person struct {
	ID    int      `json:"id"`
	Name  string   `json:"name"`
	Roles []string `json:"roles"`
}

// Stdlib 演示标准库常用惯例。
// 要点：
//  1. encoding/json 用 struct tag 做序列化，Marshal/Unmarshal 双向转换。
//  2. time 包处理时间：time.Time、Duration、格式化用「参考时间」2006-01-02。
//  3. strings 包提供大量字符串工具；字符串不可变。
//  4. sort 与 slices 做排序（这里演示按自定义规则排序）。
func Stdlib() {
	logx.Title("12 标准库常用惯例")

	logx.Note("JSON：struct ↔ 字节，tag 决定字段名")
	p := person{ID: 1, Name: "Harry", Roles: []string{"dev", "admin"}}
	b, _ := json.Marshal(p)
	logx.Show("json.Marshal", string(b))

	var back person
	_ = json.Unmarshal([]byte(`{"id":2,"name":"Alice","roles":["ops"]}`), &back)
	logx.Show("json.Unmarshal .Name", back.Name)

	logx.Note("time：格式化用「参考时间 Mon Jan 2 15:04:05 2006」这套魔数")
	t := time.Date(2026, 7, 16, 8, 0, 0, 0, time.UTC)
	logx.Show("Format(2006-01-02)", t.Format("2006-01-02"))
	logx.Show("+24h 后", t.Add(24*time.Hour).Format("2006-01-02"))
	logx.Show("Duration", (90 * time.Minute).String())

	logx.Note("strings：全是返回新串的工具函数")
	s := "  Hello, Go  "
	logx.Show("TrimSpace", strings.TrimSpace(s))
	logx.Show("ToUpper", strings.ToUpper("go"))
	logx.Show("Split", strings.Split("a,b,c", ","))
	logx.Show("ReplaceAll", strings.ReplaceAll("a-b-c", "-", "_"))
	logx.Show("Contains", strings.Contains("golang", "lang"))

	logx.Note("sort.Slice：按自定义规则排序（这里按字符串长度）")
	words := []string{"banana", "fig", "apple"}
	sort.Slice(words, func(i, j int) bool { return len(words[i]) < len(words[j]) })
	logx.Show("按长度排序", words)

	logx.Note("fmt.Sprintf 是最常用的格式化拼接")
	logx.Show("Sprintf", fmt.Sprintf("%s=%d (%.1f%%)", "cpu", 80, 80.0))
}
