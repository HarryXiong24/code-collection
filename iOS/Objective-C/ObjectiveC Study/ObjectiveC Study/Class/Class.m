//
//  OCClass.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/18.
//

#import <Foundation/Foundation.h>
#import "Class.h"

// 完整地写了一个函数：函数的声明和定义（实现）
// 完整地写一个类：类的声明和实现

// 类的实现, 用来实现 @inteface 中声明的方法
@implementation Car

- (void)run
{
    test();
    NSLog(@"车子跑起来了");
}

- (void)fly
{

}

// 方法和函数的区别：
// 1. 对象方法都是以减号 －
// 2. 对象方法的声明必须写在 @interface 和 @end 之间, 对象方法的实现必须写在 @implementation 和 end 之间
// 3. 对象方法只能由对象来调用
//
// 函数
// 1.函数能写在文件中的任意位置(包括 @interface 和 end 之间)，函数归文件所有
// 2.函数调用不依赖于对象
// 3.函数内部不能直接通过成员变量名访问某个对象的成员变量
void test(void)
{
    NSLog(@"调用了Test函数");
}

@end

// test
void testClass(void)
{
    // 在oc中，想执行一些行为，就写上一个中括号[行为执行者 行为名称]
    
    // 定义了一个指针变量 Car1,Car1 将来指向的是 Car 类型的对象
    // [Car new] 会创建一个新对象，并且会返回对象本身（新对象地址 ）
    Car *car1 = [Car new];
    Car *car2 = [Car new];
    
    car2->wheels = 5;
    car2->speed = 300;
    
    // 给Car1所指向对象的wheels属性赋值
    car1->wheels = 4;
    car1->speed = 250;
    
    // 给Car1所指向对象发送一条run消息
    [car1 run];
    
    NSLog(@"车子有%d个轮子，时速位：%dkm/h", car1->wheels, car2->speed);
    
    // 匿名对象
    [Car new]->speed = 300;
    [[Car new] run];
}
