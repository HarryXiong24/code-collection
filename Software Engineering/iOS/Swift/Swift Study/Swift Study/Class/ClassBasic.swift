//
//  ClassBasic.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

enum Sex {
    case Man
    case Wowan
}

class Student {
    
    private var name: String
    private var age: Int
    private var sex: Sex
    var score1: Double
    var score2: Double
    
    var computedName: String  {
        get {
            return self.name
        }
        set {
            self.name = newValue
        }
    }
    
    var computedAge: Int  {
        get {
            return self.age
        }
        set {
            self.age = newValue
        }
    }
    
    var computedSex: Sex  {
        get {
            return self.sex
        }
        set {
            self.sex = newValue
        }
    }
    
    static let weight = 1
    
    static func description() {
        print("I am a student class!")
    }
    
    func description() {
        print("I am a student, name: \(self.name), age: \(self.age), sex: \(self.sex)")
    }
    
    
    init(name: String, age: Int, sex: Sex, score1: Double = 0, score2: Double = 0) {
        self.name = name
        self.age = age
        self.sex = sex
        self.score1 = score1
        self.score2 = score2
    }
    
    func getSum(_ grade1: Double, _ grade2: Double) -> Double {
        return grade1 + grade2
    }
    
    func getSum(_ grade1: Double, _ grade2: Double, _ grade3: Double) -> Double {
        return grade1 + grade2 + grade3
    }
    
    func getTotal() -> Double {
        return self.score1 + self.score2
    }
    
    func getMean() -> Double {
        return self.getTotal() / 2
    }
}

func testClassBasic() {
    // Test initialization
    let student = Student(name: "John", age: 20, sex: .Man, score1: 85, score2: 90)
    print(student.computedName)
    print(student.computedAge)
    print(student.computedSex)
    print(student.score1 == 85)
    print(student.score2 == 90)
    
    // Test computed properties
    student.computedName = "Jane"
    student.computedAge = 22
    print(student.computedName == "Jane")
    print(student.computedAge == 22)
    
    // Test static property and method
    print(Student.weight == 1)
    Student.description()
    
    // Test instance methods
    print(student.getSum(85, 90) == 175)
    print(student.getSum(85, 90, 95) == 270)
    print(student.getTotal() == 175)
    print(student.getMean() == 87.5)
    
    student.description()
    
    student.computedAge = 100
    student.description()
}


