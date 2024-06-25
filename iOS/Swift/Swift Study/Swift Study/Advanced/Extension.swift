//
//  Extension.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

struct ExtensionDemo {
    func test() {
        print("Called test method!")
    }
}

extension ExtensionDemo {
    func play() {
        print("Called play method!")
    }
}

extension String {
    static func numberCountOfString(_ str: String) -> Int {
        return str.numberCount()
    }
    
    func numberCount() -> Int {
        var count: Int = 0;
        for char in self {
            if char.isNumber {
                count += 1
            }
        }
        return count;
    }
}

func testExtension() {
    let demo = ExtensionDemo()
    demo.play()
    demo.test()
    
    let count = String.numberCountOfString("1h2h3");
    print(count)
}
