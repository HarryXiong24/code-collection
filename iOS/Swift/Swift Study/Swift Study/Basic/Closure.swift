//
//  Closure.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

class Person {
    let name: String
    var completionTask: (() -> Void)?

    init(name: String) {
        self.name = name
    }

    // Using a strong capture (can cause retain cycles)
    func performTaskWithStrongCapture() {
        completionTask = {
            print("\(self.name) is completing the task.")
        }
    }

    // Using a weak capture (prevents retain cycles)
    func performTaskWithWeakCapture() {
        completionTask = { [weak self] in
            guard let strongSelf = self else {
                print("The person has been deallocated.")
                return
            }
            print("\(strongSelf.name) is completing the task.")
        }
    }

    // Using an unowned capture (prevents retain cycles but assumes self is not nil)
    func performTaskWithUnownedCapture() {
        completionTask = { [unowned self] in
            print("\(self.name) is completing the task.")
        }
    }

    deinit {
        print("\(name) is being deinitialized")
    }
}

func testStrongCapture() {
    print("Testing Strong Capture")
    var person: Person? = Person(name: "John")
    person?.performTaskWithStrongCapture()
    person?.completionTask?()
    person = nil // 检查 Person 是否被释放
}

func testWeakCapture() {
    print("Testing Weak Capture")
    var person: Person? = Person(name: "John")
    person?.performTaskWithWeakCapture()
    person?.completionTask?()
    person = nil // 检查 Person 是否被释放
}

func testUnownedCapture() {
    print("Testing Unowned Capture")
    var person: Person? = Person(name: "John")
    person?.performTaskWithUnownedCapture()
    person?.completionTask?()
    person = nil // 检查 Person 是否被释放
}

func testClosure() {
    testStrongCapture()
    testWeakCapture()
    testUnownedCapture()
}


