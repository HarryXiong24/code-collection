package demos

import "testing"

// 13 Testing — Go's built-in testing package, zero third-party dependencies.
// Run: go test ./...   (verbose: go test -v ./...)
// Key points:
//  1. Test file names end in _test.go, and functions start with Test and take *testing.T.
//  2. Table-driven tests are the Go community's standard style: list cases in a table and loop over them.
//  3. t.Run names each subcase, so failures can be pinpointed.
//  4. Assertions are plain if + t.Errorf; the standard library ships no assertion library (you can add testify).

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
	t.Run("normal division", func(t *testing.T) {
		got, err := Divide(10, 2)
		if err != nil || got != 5 {
			t.Errorf("Divide(10,2) = %d, %v; want 5, nil", got, err)
		}
	})

	t.Run("dividing by 0 returns an error", func(t *testing.T) {
		if _, err := Divide(1, 0); err == nil {
			t.Error("Divide(1,0) should return an error, got nil")
		}
	})
}
