//
//  ProtocolBasic.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

protocol Vehicle {
    func start()
    func stop() // This function is compulsory to implement for conforming types
}

extension Vehicle {
    func start() {} // This function becomes optional for conforming types
}

class Car: Vehicle {
    
    func stop() {
        print("Stop!")
    }
}


