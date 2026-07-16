//
//  Properties.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#import <Foundation/Foundation.h>
#import "Properties.h"

@implementation PPerson
{
    // @implementation 中不能定义和 @interface 中同名的成员变量
    
    int _aaa; // 默认就是私有
}

- (void)test
{
    _age = 19;
    
    _height = 20;
    
    _weight = 50;
    
    _aaa = 10;
}

- (void)setHeight:(int)height
{
    _height = height;
}

- (int)height
{
    return _height;
}

@end

void testProperties(void) {

    PPerson *p = [PPerson new];

    [p setHeight: 24];
    
    // 点语法的本质还是方法调用
    p.sex = @"Man"; // [p setSex:@"Man"];
    
    NSLog(@"%@ %d", [p sex], [p height]);
       
}
