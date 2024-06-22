//
//  String.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#import <Foundation/Foundation.h>

void testString(void) {
    // 最简单的创建字符串的方式
    NSString *str = @"itcast";
    
    char *name = "itcast";
    
    NSLog(@"我在%@上课", str);
    NSLog(@"%s",name);
    
    
    NSString *name1 = @"jack";
    // length 方法算的是字数
    unsigned long size = [name1 length];
    
    NSLog(@"%lu", size);
}
