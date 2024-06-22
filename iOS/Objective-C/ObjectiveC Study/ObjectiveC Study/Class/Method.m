//
//  Method.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#import <Foundation/Foundation.h>

/*
 计算器类
 方法：
 1. 返回 Pi
 2. 计算两个整数的平方
 3. 计算两个整数的和
*/

#import "Method.h"

@implementation Calculator

-(double)getPI
{
    return 3.1415926;
}

-(double)sqaure:(double)num
{
    return num * num;
}

-(double)sumWithNum1:(double)num1 Num2:(double)num2

{
    return num1 + num2;
}

-(double)sumWithNum1:(double)num1 Num2:(double)num2 Num3:(double)num3 {
    return num1 + num2 + num3;
}
@end

// test
void testMethod(void) {
    
    Calculator *calculator = [Calculator new];
    
    double pi = [calculator getPI];
    
    double res1 = [calculator sqaure:10.0];

    double res2 = [calculator sumWithNum1:10.0 Num2:5.0];
    
    double res3 = [calculator sumWithNum1:10.0 Num2:5.0 Num3:5.0];
    

    NSLog(@"PI: %.2f, res1: %.2f, res2: %.2f, res3: %.2f", pi, res1, res2, res3);
}

