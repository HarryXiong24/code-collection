//
//  SEL.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#import <Foundation/Foundation.h>
#import "SEL.h"

@implementation SELTest

+ (void)test{
    NSLog(@"test");
}

- (void)test2;{
    
    // _cmd代表着当前方法
    // _cmd == @selector(test2);
    // 会引发死循环[self performSelector:_cmd];
    NSString *str = NSStringFromSelector(_cmd);
    NSLog(@"test2____%@",str);
}

- (void)test3:(NSString *)abc{
    NSLog(@"test3%@",abc);
}

@end

void testSEL(void) {
    SELTest *test =  [[SELTest alloc] init];
    
    [test test2];
    
    
    // 1. 把test2包装成SEL类型的数据
    // 2. 根据SEL数据找到对应的方法地址
    // 3. 根据方法地址调用对应的方法
    SEL selector = @selector(test2);
    
    // 间接调用 test2 方法
    [test performSelector:selector];
    
    [test test3:@"123"];
    
    [test performSelector:@selector(test3:) withObject:@"456"];
}
