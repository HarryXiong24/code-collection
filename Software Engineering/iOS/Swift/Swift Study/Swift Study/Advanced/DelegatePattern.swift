//
//  DelegatePattern.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

protocol CarDelegate {
    func carDidStartMoving();
}

class MyCar {
    
    var delegate: CarDelegate?;
    
    func startMoving() {
        print("The Car is starting to move.")
        
        if let delegate = self.delegate {
            delegate.carDidStartMoving();
        }
        
    }
}

class Driver : CarDelegate {
    func carDidStartMoving() {
        print("Driver has been notified that the car is starting to move.")
    }
}

func testDelegate() {
    let driver = Driver()
    let mycar = MyCar();
    
    mycar.delegate = driver;
    mycar.startMoving();
}


