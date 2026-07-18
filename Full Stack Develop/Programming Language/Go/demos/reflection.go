package demos

import (
	"fmt"
	"reflect"
	"strings"

	"proglang/internal/logx"
)

// Product attaches "metadata" to fields via struct tags.
// A tag is a string inside backticks; encoding/json, database ORMs, and validation libraries all rely on it.
type Product struct {
	ID    int     `json:"id" validate:"required"`
	Name  string  `json:"name" validate:"required"`
	Price float64 `json:"price" validate:"min=0"`
	notes string  // unexported field: reflection can see it but can't read its value
}

// validate reads tags via reflection to build a mini validator — the equivalent of what other languages do with "decorators/annotations".
func validate(v any) []string {
	var problems []string
	rv := reflect.ValueOf(v)
	rt := rv.Type()
	for i := 0; i < rt.NumField(); i++ {
		field := rt.Field(i)
		rule := field.Tag.Get("validate") // read the rule inside `validate:"..."`
		if strings.Contains(rule, "required") && rv.Field(i).IsZero() {
			problems = append(problems, field.Name+" cannot be empty")
		}
	}
	return problems
}

// Reflection demonstrates struct tags + reflection (Go's take on "metaprogramming / annotations").
// Key points:
//  1. Go has no decorators like TS/Python; cross-cutting logic is done with struct tags + reflect.
//  2. A tag is string metadata attached to a field, uninterpreted at compile time and read at runtime via reflection.
//  3. JSON serialization, ORM mapping, and parameter validation are all built on this mechanism.
//  4. Reflection is flexible but slow and loses compile-time checking, so avoid it when you can.
func Reflection() {
	logx.Title("10 struct tags + reflection (metaprogramming)")

	logx.Note("reflect walks field names and types")
	rt := reflect.TypeOf(Product{})
	for i := 0; i < rt.NumField(); i++ {
		f := rt.Field(i)
		logx.Show("field "+f.Name, fmt.Sprintf("%s  json=%s", f.Type, f.Tag.Get("json")))
	}

	logx.Note("a mini validator based on the validate tag (missing required fields get reported)")
	bad := Product{Price: -1} // ID, Name empty
	logx.Show("validate(bad)", validate(bad))

	good := Product{ID: 1, Name: "Book", Price: 20}
	logx.Show("validate(good)", validate(good))
}
