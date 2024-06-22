//
//  Self.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#ifndef Self_h
#define Self_h

@interface PersonSelf : NSObject
{
    int _age;
}

- (void)setAge:(int)age;
- (int)age;
- (void)test;
+ (double)getTotal:(double)num1 :(double)num2;
+ (double)getAverage:(double)num1 :(double)num2;

@end

@interface Dog : NSObject

- (void)bark;
- (void)run;

@end

void testSelf(void);



#endif /* Self_h */
