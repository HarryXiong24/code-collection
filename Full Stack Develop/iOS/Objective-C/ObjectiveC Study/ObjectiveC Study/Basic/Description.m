//
//  Description.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//


#import <Foundation/Foundation.h>
#import "Description.h"

@implementation DescriptionDemo

// 决定了实例对象的给出结果
- (NSString *)description {
    return [NSString stringWithFormat:@"name=%@, age=%d", self.name, self.age];
}

// 决定了类对象的输出结果
+ (NSString *)description{
    return @"111";
}

@end

void testDesciption(void) {
    Class demo = [DescriptionDemo class];
    DescriptionDemo *demo1 = [DescriptionDemo new];
    
    NSLog(@"%@", [demo description]);
    NSLog(@"%@", [demo1 description]);
}
