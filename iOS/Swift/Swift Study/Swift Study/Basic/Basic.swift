
import Foundation

func testBasic() {
    var a: Int = 0;
    
    // ternary operator
    a = a > 10 ? 5 : 8;
    
    // switch
    switch a {
        
    case 5:
        print("Bad!");
        break;
    case 8:
        print("Good!");
        break;
    default:
        print("Error!");
        break;
    }
    
    // while
    var i: Int = 0;
    
    while i < 10 {
        i += 1;
        print(i)
    }
    
    // no do-while grammar

    // for - if
    for index in 1..<10 {
        if index >= 5 {
            print(i)
        } else if index == 3 {
            continue;
        } else if index == 9 {
            break;
        } else {
            print(i)
        }
    }
    
    // stride
    
    // Closed Range - Starting from 1 to 5
    for index in 1...5 {
        print("Index: \(index)")
    }
    
    // Half Range - 5 is not included - Starting from 1 to 4
    for index in 1..<5 {
        print("Index: \(index)")
    }
    
    // Dictionaries
    let capitalCities = ["Japan": "Tokyo", "France": "Paris", "India": "New Delhi"]

    for (key, value) in capitalCities {
        print("The capital city of \(key) is \(value).")
    }
    // Output may vary in order as dictionaries are unordered collections.

    //#if key or value is not required, you can ignore with _
    for (_, value) in capitalCities {
        print("The capitals are \(value).")
    }

    for (key, _) in capitalCities {
        print("The Countries are \(key).")
    }
    
    // Filtering with where Clause
    let scores = [75, 43, 103, 87, 12]
    
    for score in scores where score > 60 {
        print("Passing score: \(score)")
    }
    
    // For-In to Enumerate Indices and Elements
    let numbers = [10, 20, 30, 40]

    for (index, number) in numbers.enumerated() {
        print("Number \(number) at index \(index)")
    }
    
    // Stride
    for number in stride(from: 0, to: 10, by: 2) {
        print(number)
    }
    
    print("------")
    
    for number in stride(from: 0, through: 10, by: 2) {
        print(number)
    }
    
    print("------")
    
    for number in stride(from: 10, to: 0, by: -2) {
        print(number)
    }
}

