//
//  Polymorphism.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#import <Foundation/Foundation.h>
#import "Polymorphism.h"

/*
    多态
        1. 没有继承就没有多态
        2. 代码的体现：父类类型的指针指向子类对象
        3. 好处：如果函数\方法参数中使用的是是父类类型，可以传入父类、子类对象
        4. 局限性：父类类型的变量不能直接调用子类特有的方法。必须强转为子类类型变量后，才能直接调用子类特有的方法
*/

@implementation PAnimal

- (void)eat
{
    NSLog(@"Animal_吃东西-----");
}

@end

@implementation PDog

- (void)run
{
    NSLog(@"Dog-----跑起来");
}

- (void)eat
{
    NSLog(@"Dog_吃东西-----");
}

@end

@implementation PCat

- (void)eat
{
    NSLog(@"Cat_吃东西-----");
}

@end

// 这个函数是专门用来喂动物
void feedDog(PDog *d)
{
    [d eat];
}

void feedCat(PCat *d)
{
    [d eat];
}

// 如果参数中使用的是父类类型，可以传入父类、子类对象
void feed(PAnimal *d)
{
    [d eat];
}

void testPolymorphism(void)
{
    PDog *d =[PDog new];
    [d eat];
    
    PAnimal *a = [PDog new];
    // 多态的局限性：父类类型的变更不能用来调用子类的方法
    // [a run];
    
    // 将 a 转为Dog *类型的变量
    PDog *dd = (PDog *)a;
    [dd run];
    
    
    PAnimal *aa = [PAnimal new];
    feed(aa);
    
    PCat *cc = [PCat new];
    feed(cc);
}
