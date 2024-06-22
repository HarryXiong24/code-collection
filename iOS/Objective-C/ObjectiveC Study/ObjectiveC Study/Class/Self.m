//
//  Self.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#import <Foundation/Foundation.h>
#import "Self.h"

/*
    self的用途：
        1. 概念：谁调用发当前方法，self就代表谁
            self出现在对象方法中，self就代表对象
            self出现在类方法中，，self就代表类
 
        2. 在对象方法利用『self->成员变更名』访问当前对象内部的成员变量
 
        3. [self 方法名] 可以调用其他对象方法\类方法;
 */

@implementation PersonSelf

- (void)setAge:(int)age
{
    // _age = age;
    self->_age = age;
}

- (int)age
{
    return self->_age;
}

- (void)test
{
    // self : 指向了方向调用者，代表着当前对象
    int _age = 20; // 临时变量和类变量的区分
    NSLog(@"Pesrio 的年龄是 %d 岁", self->_age);
}

+ (double)getTotal:(double)num1 :(double)num2 {
    return num1 + num2;
}

+ (double)getAverage:(double)num1 :(double)num2 {
    // 在这种情况下，self 代表类本身
    double mean = [self getTotal:(num1) :(num2)] / 2;
    NSLog(@"Mean is %.2f", mean);
    return mean;
}

@end

@implementation Dog

- (void)bark
{
    NSLog(@"汪汪汪");
}

- (void)run
{
    [self bark];
    NSLog(@"GOGOGO");
}

@end


void testSelf(void)
{
    PersonSelf *p = [PersonSelf new];
    [p setAge:10];
    [p test];
    [PersonSelf getAverage:10 :20];
    
    Dog *d = [Dog new];
    [d run];
}


