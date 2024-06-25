//
//  Circle.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

struct Point2D {
    let x: Double
    let y: Double
    
    func distanceWithOther(_ other: Point2D) -> Double {
        return Point2D.distanceBetweenTwoPoints(self, other)
    }
    
    static func distanceBetweenTwoPoints(_ point1: Point2D, _ point2: Point2D) -> Double {
        let delta_x = point1.x - point2.x
        let square_delta_x = pow(delta_x, 2)
        let delta_y = point1.y - point2.y
        let square_delta_y = pow(delta_y, 2)
        return sqrt(square_delta_x + square_delta_y)
    }
}

struct Circle {
    var radius: Double
    var point: Point2D
    
    func isInteractWithOther(_ circle: Circle) -> Bool {
        return Circle.isInteractBetweenTwoCircle(self, circle)
    }
    
    static func isInteractBetweenTwoCircle(_ circle1: Circle, _ circle2: Circle) -> Bool {
        
        let p1 = circle1.point
        let p2 = circle2.point
        
        let distance: Double = Point2D.distanceBetweenTwoPoints(p1, p2)
        
        let radiusSum: Double = circle1.radius + circle2.radius;
        
        return distance < radiusSum
        
    }
}

func testCircle() {
    let c1: Circle = Circle(radius: 5, point: Point2D(x: 10, y: 15))
    let c2: Circle = Circle(radius: 2, point: Point2D(x: 12, y: 19))
    
    let b1: Bool = Circle.isInteractBetweenTwoCircle(c1, c2)
    
    print(b1)
}
