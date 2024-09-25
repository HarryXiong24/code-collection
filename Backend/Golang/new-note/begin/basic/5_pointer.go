package basic

import "fmt"

func PointerDemo() {
	age := 32 // regular variable

	// var agePointer *int
	agePointer := &age

	fmt.Println("Age:", *agePointer)

	adultYears := getAdultYears(agePointer)
	fmt.Println(adultYears)
}

func getAdultYears(age *int) int {
	return *age - 18
}

// func PointerDemo() {
// 	age := 32 // regular variable

// 	var agePointer *int

// 	agePointer = &age

// 	fmt.Println("Age:", *agePointer)

// 	editAgeToAdultYears(agePointer)
// 	fmt.Println(age)
// }

// func editAgeToAdultYears(age *int) {
// 	// return *age - 18
// 	*age = *age - 18
// }

// No pointer
// func PointerDemo() {
// 	age := 32 // regular variable

// 	var agePointer *int

// 	agePointer = &age

// 	fmt.Println("Age:", *agePointer)

// 	// adultYears := getAdultYears(age)
// 	// fmt.Println(adultYears)
// }

// func getAdultYears(age int) int {
// 	return age - 18
// }
