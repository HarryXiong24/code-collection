//
//  NSLog.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#import <Foundation/Foundation.h>
#import "NSLog.h"

@implementation NSLogDemo

@end

void testNSLog(void) {
    NSLogDemo *demo = [NSLogDemo new];
    NSLog(@"%d", __LINE__); // 输出当前行号
    //NSLog(@"%s", __FILE__); // NSLog输出C语言字符串的时候，不能有中文
    printf("%s\n", __FILE__); // 输出文件所在目录和名称
    NSLog(@"%p", &demo); // 输出指针的地址
    NSLog(@"%p", demo); // 输出对象的地址
    NSLog(@"%@", demo); // 输出<类名：对象地址>
    NSLog(@"%s", __func__); // 输出当前函数名
}
