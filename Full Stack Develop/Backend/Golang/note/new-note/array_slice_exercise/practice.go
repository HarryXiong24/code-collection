package main

import "fmt"

// Time to practice what you learned!

// 1) Create a new array (!) that contains three hobbies you have
// 		Output (print) that array in the command line.
// 2) Also output more data about that array:
//		- The first element (standalone)
//		- The second and third element combined as a new list
// 3) Create a slice based on the first element that contains
//		the first and second elements.
//		Create that slice in two different ways (i.e. create two slices in the end)
// 4) Re-slice the slice from (3) and change it to contain the second
//		and last element of the original array.
// 5) Create a "dynamic array" that contains your course goals (at least 2 goals)
// 6) Set the second goal to a different one AND then add a third goal to that existing dynamic array
// 7) Bonus: Create a "Product" struct with title, id, price and create a
//		dynamic list of products (at least 2 products).
//		Then add a third product to the existing list of products.

type Product struct {
	title string
	id    string
	price float64
}

func main() {

	// 1
	hobbies := input()

	// 2
	fmt.Println("The first element: ", hobbies[0])
	fmt.Println("The second and third element combined as a new list: ", hobbies[1:3])

	// 3
	slice1 := hobbies[0:][0:2]
	slice2 := hobbies[0:2]
	fmt.Println(slice1, slice2)

	// 4
	slice1 = hobbies[1:3]
	fmt.Println(slice1)

	// 5
	goals := []float64{99, 98}

	// 6
	goals[1] = 100
	goals = append(goals, 96)
	fmt.Println(goals)

	// 7
	products := []Product{
		{
			"first-product",
			"A First Product",
			12.99,
		},
		{
			"second-product",
			"A Second Product",
			129.99,
		},
	}

	fmt.Println(products)

	newProduct := Product{
		"third-product",
		"A Third Product",
		15.99,
	}

	products = append(products, newProduct)

	fmt.Println(products)
}

func input() [3]string {
	var values1 string
	var values2 string
	var values3 string

	fmt.Println("Hobby 1: ")
	fmt.Scan(&values1)

	fmt.Println("Hobby 2: ")
	fmt.Scan(&values2)

	fmt.Println("Hobby 3: ")
	fmt.Scan(&values3)

	return [3]string{values1, values2, values3}
}
