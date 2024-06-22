//
//  ClassMethod.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#import <Foundation/Foundation.h>
#import "ClassMethod.h"

/*
    对象方法
    1. 减号 - 开头
    2. 只能由对象来调用
    3. 对象方法能访问实例变量（成员变量）

    类方法
    1. 加号 + 开头
    2. 只能由类（名）来调用
    3. 类方法不能访问实例变量（成员变量）

    类方法的好处和使用场合
    1. 不依赖于对象，执行效率高
    2. 能用类方法尽量用类名
    3. 场合：当方法内部不需要使用到成员变量时，就可以改为类方法

    可以允许类方法和对象方法同名
 */


@implementation Person

+ (void)printClassName
{
    NSLog(@"这个类叫做 Person");
}

- (void)test
{
    NSLog(@"I am method, age: %d", age);
    
    [Person test]; // 对象方法中能调用类方法

}

+ (void)test
{
    NSLog(@"I am Class Method");
}

@end

void testClassMethod(void)
{
    [Person printClassName];
    [Person test];
    
    Person *p = [Person new];
    p->age = 24;
    
    [p test];
    
    // 对象实例不能调用来方法，系统会认为现在调用的 printClassName 是个对象方法
    // [p printClassName];
    
    // 类本身也是一个对象，我们可以用 Class 来创建一个类对象
    Class personClass = [Person class];
    [personClass printClassName];
}
