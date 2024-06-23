//
//  String.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#import <Foundation/Foundation.h>

void testString(void) {
    // create string using NSString
    NSString *str = @"itcast";
    
    char *name = "itcast";
    
    NSLog(@"我在%@上课", str);
    NSLog(@"%s",name);
    
    
    NSString *name1 = @"jack";
    // length is used to get string length
    unsigned long size = [name1 length];
    
    NSLog(@"%lu", size);
}
