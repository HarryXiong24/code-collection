//
//  Block.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/21.
//

#import <Foundation/Foundation.h>
#import "Block.h"

@implementation FetchDemo

- (void)fetchHandleData:(handleData)handler {
    NSLog(@"I am loading data!");
    handler();
}

@end


void testBlock(void) {
    
    // 特别注意，void (^simpleBlock)(void) 是一个变量，不是一个函数
    void (^simpleBlock)(void) = ^{
        NSLog(@"Hello, World!");
    };

    int (^sumBlock)(int, int) = ^(int a, int b) {
        return a + b;
    };
    
    simpleBlock();
    int result = sumBlock(1, 1);
    NSLog(@"SumBlock: %d", result);
    
    FetchDemo *demo = [[FetchDemo alloc] init];
    
    [demo fetchHandleData: ^(void) {
        NSLog(@"I am the callback!");
    }];
}
