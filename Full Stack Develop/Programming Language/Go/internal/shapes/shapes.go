// Package shapes demonstrates that a "package" is Go's unit of encapsulation.
// The rule is simple: an identifier starting with an uppercase letter = exported
// (visible outside the package), lowercase = package-private.
// This is the example package imported by demos/modules.go.
package shapes

// Pi is an exported constant (starts with an uppercase letter).
const Pi = 3.14159

// loaded is an unexported package-level variable, readable/writable only within this package.
var loaded []string

// init runs automatically when the package is first imported (there can be several; they run before main).
func init() {
	loaded = append(loaded, "shapes.init has run")
}

// CircleArea is an exported function that internally uses the unexported square.
func CircleArea(r float64) float64 {
	return Pi * square(r)
}

// square is unexported: outside the package you cannot call shapes.square.
func square(x float64) float64 {
	return x * x
}

// Loaded exposes the unexported state through an exported function (the idiom for encapsulation).
func Loaded() []string {
	return loaded
}
