//
//  Method.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#ifndef Method_h
#define Method_h

@interface Calculator : NSObject

-(double)getPI;

// 方法中，一个参数对应一个冒号
// 方法名：sqaure:(冒号也是方法名的一部分)
-(double)sqaure:(double)num;

// 方法名：sumWitchNum1:Num2:
-(double)sumWithNum1:(double)num1 Num2:(double)num2;

-(double)sumWithNum1:(double)num1 Num2:(double)num2 Num3:(double)num3;

@end

void testMethod(void);

#endif /* Method_h */
