//
//  Enumerations.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

enum GiftTrayType: CaseIterable {
    case normal
    case short
    case long
    
}

enum Week: Int, CaseIterable {
    case sunday = 1
    case monday
    case tuesday
    case wednesday
    case thursday
    case friday
    case saturday
}

enum TrafficLight {
    case red
    case yellow
    case green

    func next() -> TrafficLight {
        switch self {
        case .red:
            return .green
        case .yellow:
            return .red
        case .green:
            return .yellow
        }
    }

    var state: String {
        switch self {
        case .red:
            return "stop"
        case .yellow:
            return "slow"
        case .green:
            return "go"
        }
    }
}


func testEnum() {
    let giftTrayVariant: GiftTrayType  = GiftTrayType.normal;
    
    print(giftTrayVariant)
    
    print(GiftTrayType.allCases.count)
    for item in GiftTrayType.allCases {
        print(item)
    }
    
    // rawValue
    let today: Week = Week.monday;
    print(today.rawValue)
    
    let trafficLight: TrafficLight = TrafficLight.green;
    print(trafficLight.next())
    print(trafficLight.state)
}

