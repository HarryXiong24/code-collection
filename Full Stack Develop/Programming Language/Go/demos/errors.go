package demos

import (
	"errors"
	"fmt"

	"proglang/internal/logx"
)

// ValidationError is a custom error type: implements the error interface (having Error() string is enough).
type ValidationError struct {
	Field string
	Msg   string
}

func (e *ValidationError) Error() string {
	return fmt.Sprintf("%s: %s", e.Field, e.Msg)
}

// ErrNotFound is a sentinel error: compared with errors.Is.
var ErrNotFound = errors.New("not found")

func parseAge(input string) (int, error) {
	n := 0
	_, err := fmt.Sscanf(input, "%d", &n)
	if err != nil {
		return 0, &ValidationError{Field: "age", Msg: fmt.Sprintf("%q is not a number", input)}
	}
	if n < 0 {
		return 0, &ValidationError{Field: "age", Msg: "age cannot be negative"}
	}
	return n, nil
}

func lookup(id int) (string, error) {
	if id != 1 {
		// %w wraps the underlying error, preserving the chain for errors.Is/As to trace
		return "", fmt.Errorf("lookup id=%d: %w", id, ErrNotFound)
	}
	return "Harry", nil
}

// Errors demonstrates error handling.
// Key points:
//  1. Go treats errors as ordinary return values: if err != nil is the most central idiom, with no exception control flow.
//  2. A custom error = implementing the error interface; use errors.As to extract the concrete type.
//  3. fmt.Errorf("...: %w", err) wraps an error; errors.Is checks whether it is a particular sentinel error.
//  4. panic/recover is only for truly "unrecoverable" situations, not routine error handling.
func Errors() {
	logx.Title("07 Error handling")

	logx.Note("errors are return values: right after the call, if err != nil")
	if _, err := parseAge("abc"); err != nil {
		var ve *ValidationError
		if errors.As(err, &ve) { // extract the concrete error type and read its fields
			logx.Show("errors.As extracts fields", fmt.Sprintf("field=%s msg=%s", ve.Field, ve.Msg))
		}
	}

	logx.Note("errors.Is: follow the %w chain to check whether it is a particular sentinel error")
	_, err := lookup(99)
	logx.Show("err", err)
	logx.Show("errors.Is(err, ErrNotFound)", errors.Is(err, ErrNotFound))

	logx.Note("happy path: err is nil")
	name, err := lookup(1)
	logx.Show("lookup(1)", fmt.Sprintf("name=%s, err=%v", name, err))

	logx.Note("panic/recover: only for unrecoverable errors, caught by recover inside a defer")
	safe := func() (result string) {
		defer func() {
			if r := recover(); r != nil {
				result = fmt.Sprintf("recovered: %v", r)
			}
		}()
		panic("boom")
	}
	logx.Show("recover result", safe())
}
