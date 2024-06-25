//
//  Inheritance.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

class Animal {
    private var age: Int;
    private var weight: Double;
    
    var computedAge: Int  {
        get {
            return self.age
        }
        set {
            self.age = newValue
        }
    }
    
    var computedWeight: Double {
        get {
            return self.weight
        }
        set {
            self.weight = newValue
        }
    }
    
    init(age: Int, weight: Double) {
        self.age = age
        self.weight = weight
    }
    
    func description() {
        print("Age: \(self.age), Weight: \(self.weight).")
    }
}

class Fish: Animal {
    
    let fishCategory: String;
    
    init(age: Int, weight: Double, fishCategroy: String) {
        self.fishCategory = fishCategroy
        super.init(age: age, weight: weight);
    }

}

class Cat: Animal {
    
    let catCategory: String;
    
    init(age: Int, weight: Double, catCategory: String) {
        self.catCategory = catCategory
        super.init(age: age, weight: weight);
    }
}

func testInheritance() {
    let fish = Fish(age: 20, weight: 200, fishCategroy: "Fish A")
    let cat = Cat(age: 10, weight: 100, catCategory: "Cat A")
    
    print(fish.computedAge, cat.computedAge)
    
    fish.description()
    cat.description()
}

