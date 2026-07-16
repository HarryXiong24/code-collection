//
//  Exception.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/24.
//

#import <Foundation/Foundation.h>
#import "Exception.h"

@implementation FileReader

- (void)readFileAtPath:(NSString *)filePath {
    @try {
        NSError *error = nil;
        NSString *content = [NSString stringWithContentsOfFile:filePath encoding:NSUTF8StringEncoding error:&error];
        
        if (error) {
            @throw [NSException exceptionWithName:@"FileReadException"
                                           reason:[error localizedDescription]
                                         userInfo:nil];
        }
        
        NSLog(@"File content: %@", content);
    } @catch (NSException *exception) {
        NSLog(@"Caught exception: %@", exception);
    } @finally {
        NSLog(@"Finished attempting to read file.");
    }
}

@end

void testException(void) {
    FileReader *fileReader = [[FileReader alloc] init];

    // Example of reading a valid file
    NSString *validFilePath = @"/path/to/valid/file.txt";
    [fileReader readFileAtPath:validFilePath];

    // Example of reading an invalid file
    NSString *invalidFilePath = @"/path/to/invalid/file.txt";
    [fileReader readFileAtPath:invalidFilePath];
}

