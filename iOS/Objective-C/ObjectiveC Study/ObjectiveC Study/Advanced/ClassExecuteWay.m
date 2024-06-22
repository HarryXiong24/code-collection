//
//  ClassExecuteWay.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#import <Foundation/Foundation.h>
#import "ClassExecuteWay.h"

@implementation Level1

+ (void)test{
    NSLog(@"Call Level1 Test");
}

// 当程序启动的时候，就会加载一次项目中所有的类。类加载完毕后就会调用 +load 方法
+ (void)load{
    NSLog(@"Call Level1 Load");
}

// 当第一次使用这个类的时候，就会调用一次 initialize 方法
+ (void)initialize{
    NSLog(@"Call Level1 Initialize");
}

@end


@implementation Level1 (Suppliment)

+ (void)load{
    NSLog(@"Call Level1(Suppliment) Load");
}

+ (void)initialize{
    NSLog(@"Call Level1(Suppliment) Initialize");
}

@end

@implementation Level2

+ (void)test{
    NSLog(@"Call Level2 Test");
}


// 当程序启动的时候，就会加载一次项目中所有的类。类加载完毕后就会调用 +load 方法
+ (void)load{
    NSLog(@"Call Level2 Load");
}

// 当第一次使用这个类的时候，就会调用一次 initialize 方法
+ (void)initialize{
    NSLog(@"Call Level2 Initialize");
}

@end

@implementation Level2 (Suppliment)


+ (void)load{
    NSLog(@"Call Level2(Suppliment) Load");
}

+ (void)initialize{
    NSLog(@"Call Level2(Suppliment) Initialize");
}

@end

@implementation Level3

+ (void)test{
    NSLog(@"Call Level3 Test");
}

// 当程序启动的时候，就会加载一次项目中所有的类。类加载完毕后就会调用 +load 方法
+ (void)load{
    NSLog(@"Call Level3 Load");
}

// 当第一次使用这个类的时候，就会调用一次 initialize 方法
+ (void)initialize{
    NSLog(@"Call Level3 Initialize");
}

@end

/*
    1. 当程序启动时，就会加载项目中所有的类和分类，而且加载后会调用每个类和分类的 +load 方法。只会调用一次。其中，先加载父类，再加载子类，再按照父子类的顺序加载 category 的 +load 方法（先调用父类的 +load 方法，再调用子类的 +load 方法）
    2. 当一次使用某个类时，就会调用当关类的 +initialize。其中，+initialize 方法在类第一次被使用时被调用。如果分类中也实现了 +initialize 方法，则会覆盖类中的实现。先调用分类的 +initialize 方法，再调用类的 +initialize 方法。
 */

void testClassExecuteWay(void) {
    Level3 *l3 = [[Level3 alloc] init];
    
    [Level3 test];
    
    /*
        Execution Order:
     
         Call Level1 Load
         Call Level2 Load
         Call Level3 Load
         Call Level1(Suppliment) Load
         Call Level2(Suppliment) Load
         
         Call Level1(Suppliment) Initialize
         Call Level2(Suppliment) Initialize
         Call Level3 Initialize
         Call Level3 Test
     */
}
