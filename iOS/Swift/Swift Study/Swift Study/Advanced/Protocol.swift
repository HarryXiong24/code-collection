//
//  Protocol.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

protocol MyProtocolDemo {
    
    var no: String { get set }
    var name: String { get set }
    var sex: String? { get set }
    
    func requiredMethod();
}

extension MyProtocolDemo {
    
    // this way can define optional method
    func optionalMethod() {}
}

class MyProtocolClass : MyProtocolDemo {
    
    var no: String
    
    var name: String
    
    var sex: String?
    
    init(no: String, name: String, sex: String? = nil) {
        self.no = no
        self.name = name
        self.sex = sex
    }
    
    func requiredMethod() {
        print("I am required method!")
    }
    
}

func testProtocol() {
    let demo = MyProtocolClass(no: "12123123", name: "H", sex: "Man");
    
    demo.requiredMethod()
    demo.optionalMethod()
}
