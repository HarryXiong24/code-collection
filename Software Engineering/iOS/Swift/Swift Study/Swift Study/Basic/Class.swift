//
//  Class.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

// initialiser inheritance
class Employee {
    let name: String
    let id: String
    
    init(name: String, id: String) {
        self.name = name
        self.id = id
    }
}

class CompanyEmployee: Employee {
    let department: String
    
    // This is correct
    init(name: String, id: String, department: String) {
        self.department = department
        super.init(name: name, id: id)
    }
    
    /* This is wrong - Property 'self.department' not initialized at super.init call*/
    //    init(name: String, id: String, department: String) {
    //        super.init(name: name, id: id)
    //        self.department = department
    //    }
}

