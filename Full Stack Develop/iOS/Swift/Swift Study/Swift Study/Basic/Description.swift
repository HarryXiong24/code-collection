//
//  Description.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

class MyDescription {
    var name: String;
    var age: Int;
    
    init(_ name: String, _ age: Int) {
        self.name = name
        self.age = age
    }
    
    func description() {
        print("name=\(self.name), age=\(self.age)")
    }
    
    static func description() {
        print("111")
    }
}

func testDescription() {
    let description = MyDescription("Harry", 24);
    description.description()
    MyDescription.description()
}

