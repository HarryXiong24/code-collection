//
//  Inheritance.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/21.
//

#import <Foundation/Foundation.h>
#import "Inheritance.h"

// 1. 重写：子类重新实现父类中的某个方法，覆盖父类以前的做法
// 2. 父类必须声明在子类的前面
// 3. 子类不能拥有和父类相同的成员变量
// 4. 调用某个对象的方法时，优先去当前类中找，如果找找不到，到父类去找

@implementation Animal

- (void)setAge:(int)age
{
    self->_age = age;
}

- (int)age
{
    return self->_age;
}

- (void)setWeight:(double)weight
{
    self->_weight = weight;
}

- (double)weight
{
    return self->_weight;
}

@end

@implementation Fish

@end

@implementation Cat

@end

void testInheritance(void) {
    Fish *f = [Fish new];
    [f setAge:10];
    NSLog(@"fish age=%d", [f age]);
    
    Cat *c = [Cat new];
    [c setWeight:12.0];
    NSLog(@"cat weight=%.2f", [c weight]);
}
