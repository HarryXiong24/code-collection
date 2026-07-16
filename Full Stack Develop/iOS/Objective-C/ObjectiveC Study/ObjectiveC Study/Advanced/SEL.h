//
//  SEL.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#ifndef SEL_h
#define SEL_h

@interface SELTest : NSObject

+ (void)test;

- (void)test2;

- (void)test3:(NSString *)abc;

@end

void testSEL(void);

#endif /* SEL_h */
