package demos

import (
	"encoding/json"
	"fmt"
	"sort"
	"strings"
	"time"

	"proglang/internal/logx"
)

// person carries json tags that control the field names after serialization.
type person struct {
	ID    int      `json:"id"`
	Name  string   `json:"name"`
	Roles []string `json:"roles"`
}

// Stdlib demonstrates common standard-library idioms.
// Key points:
//  1. encoding/json uses struct tags for serialization; Marshal/Unmarshal convert both ways.
//  2. The time package handles time: time.Time, Duration, and formatting via the "reference time" 2006-01-02.
//  3. The strings package provides many string utilities; strings are immutable.
//  4. sort and slices do sorting (here we demonstrate sorting by a custom rule).
func Stdlib() {
	logx.Title("12 Common standard-library idioms")

	logx.Note("JSON: struct ↔ bytes, tags decide field names")
	p := person{ID: 1, Name: "Harry", Roles: []string{"dev", "admin"}}
	b, _ := json.Marshal(p)
	logx.Show("json.Marshal", string(b))

	var back person
	_ = json.Unmarshal([]byte(`{"id":2,"name":"Alice","roles":["ops"]}`), &back)
	logx.Show("json.Unmarshal .Name", back.Name)

	logx.Note("time: formatting uses the magic-number \"reference time Mon Jan 2 15:04:05 2006\"")
	t := time.Date(2026, 7, 16, 8, 0, 0, 0, time.UTC)
	logx.Show("Format(2006-01-02)", t.Format("2006-01-02"))
	logx.Show("after +24h", t.Add(24*time.Hour).Format("2006-01-02"))
	logx.Show("Duration", (90 * time.Minute).String())

	logx.Note("strings: all utility functions that return a new string")
	s := "  Hello, Go  "
	logx.Show("TrimSpace", strings.TrimSpace(s))
	logx.Show("ToUpper", strings.ToUpper("go"))
	logx.Show("Split", strings.Split("a,b,c", ","))
	logx.Show("ReplaceAll", strings.ReplaceAll("a-b-c", "-", "_"))
	logx.Show("Contains", strings.Contains("golang", "lang"))

	logx.Note("sort.Slice: sort by a custom rule (here by string length)")
	words := []string{"banana", "fig", "apple"}
	sort.Slice(words, func(i, j int) bool { return len(words[i]) < len(words[j]) })
	logx.Show("sorted by length", words)

	logx.Note("fmt.Sprintf is the most commonly used formatting/concatenation")
	logx.Show("Sprintf", fmt.Sprintf("%s=%d (%.1f%%)", "cpu", 80, 80.0))
}
