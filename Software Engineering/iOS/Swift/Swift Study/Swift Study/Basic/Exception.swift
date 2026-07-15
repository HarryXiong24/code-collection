//
//  Exception.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

struct FileReader {
    func readFile(atPath filePath: String) {
        do {
            let content = try String(contentsOfFile: filePath, encoding: .utf8)
            print("File content: \(content)")
        } catch let error as NSError {
            let reason = error.localizedDescription
            let exception = NSException(name: NSExceptionName(rawValue: "FileReadException"), reason: reason, userInfo: nil)
            print("Caught exception: \(exception)")
        }
    }
}

func testException() {
    let fileReader = FileReader()

    // Example of reading a valid file
    let validFilePath = "/path/to/valid/file.txt"
    fileReader.readFile(atPath: validFilePath)

    // Example of reading an invalid file
    let invalidFilePath = "/path/to/invalid/file.txt"
    fileReader.readFile(atPath: invalidFilePath)
}

