//
//  DataTypes.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

func testBasicTypes() {
    // String variable
    let greeting: String = "Hello, World!"
    print(greeting) // Output: Hello, World!

    // Int variable
    let age: Int = 30
    print(age) // Output: 30

    // Double variable
    let pi: Double = 3.14159
    print(pi) // Output: 3.14159

    // Bool variable
    let isRaining: Bool = false
    print(isRaining) // Output: false
}

func testArray() {
    // 1. Create an Array
    // Empty collection literal requires an explicit type
    let emptyArray = [Any]()
    let emptyArray1 = [Int]()
    let emptyArray2: [String] = [] // Good practice
    let fiveZs = Array(repeating: "Z", count: 5)

    let isArrayEmpty = emptyArray2.isEmpty // Boolean -> true/false depending upon content in it

    // Mutable array
    var mutableFruits = ["Apple", "Orange"]
    mutableFruits.append("Banana") // OK

    // Immutable array
    let immutableFruits = ["Apple", "Orange"]
    // immutableFruits.append("Banana") // Error: immutableFruits is a let constant

    // Accessing an array element by index
    print(mutableFruits[1]) // Outputs "Orange"
    
    mutableFruits.remove(at: 1);
    
    print("Count: ", mutableFruits.count);
    
    mutableFruits.enumerated().forEach {
        (index, value) in
            print(value, index)
    }
    
    if mutableFruits.contains("Apple") {
        print("True")
    }
}

func testSet() {
    // Declaration
    let set1 = Set<String>()
    let set2: Set<String> = []
    let set3: Set<String> = ["a", "b"]
    let set4 = Set<String>(["a", "b"])
    let set5 = Set(["a", "b"])
    let set6 = Set(Array(arrayLiteral: "a", "b"))

    // Mutable set
    var set7: Set = [2, 3, 5]
    set7.insert(7) // OK

    // Immutable set
    let set8: Set = [2, 3, 5]
    // set8.insert(7) // Error: set8 is a let constant

    // Creating a set with initial values
    var primeNumbers: Set = [2, 3, 5, 7]

    // Adding a new element
    primeNumbers.insert(11)

    // Remove an element
    primeNumbers.remove(11) // 11 is removed from the set

    // checking membership
    print(primeNumbers.contains(7)) // Outputs true
    
    // intersection
    let number1: Set = [2, 3, 5, 7]
    let number2: Set = [4, 6, 7, 8]
    let commonNumbers = number1.intersection(number2) // Output: 7
    
    // union
    let oddDigits: Set = [1, 3, 5, 7, 9]
    let evenDigits: Set = [0, 2, 4, 6, 8]
    let allDigits = oddDigits.union(evenDigits)
    print(allDigits)
    
    // subtracting
    let employees = Set(["Alice", "Bob", "Charlie", "David"])
    let retiredEmployees = Set(["Alice", "David"])
    let activeEmployees = employees.subtracting(retiredEmployees)
    print(activeEmployees)
    
    // symmetricDifference
    let students = Set(["Alice", "Charlie", "Diana"])
    let singers = Set(["Bob", "Charlie", "David"])
    let exclusive = students.symmetricDifference(singers)
    print(exclusive)
    
    // iterative
    for item in primeNumbers {
        print(item)
    }
}

func testDictionary() {
    // Declaration
    var dict: [String: Int] = [:] // <Key: Value>
    var dict1 = [String: Int]() // var dict1: [String: Int] = [String: Int]()

    // Creating a dictionary
    var capitals = ["France": "Paris", "Spain": "Madrid", "Japan": "Tokyo"]

    // Accessing a value by key safer way
    if let capitalOfFrance = capitals["France"] {
        print("The capital of France is \(capitalOfFrance).")
    } else {
        print("The capital of France is not in the dictionary.")
    }

    // Adding a new key-value pair
    capitals["Italy"] = "Rome"

    //["France": "Paris", "Spain": "Madrid", "Japan": "Tokyo", "Italy": "Rome"]
    // Removing key value pair
    capitals["Spain"] = nil //["France": "Paris", "Japan": "Tokyo", "Italy": "Rome"]

    // Iterating over a dictionary
    for (country, capital) in capitals {
        print("The capital of \(country) is \(capital)")
    }

    // Iterating over keys/values
    for country in capitals.keys {
        print("Country: \(country)")
    }
    for capital in capitals.values {
        print("Capital: \(capital)")
    }
}


func testDataType() {
    testBasicTypes()
    testArray()
    testSet()
    testDictionary()
}

