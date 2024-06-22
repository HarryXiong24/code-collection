//
//  ClassMethod.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#ifndef ClassMethod_h
#define ClassMethod_h

@interface Person : NSObject
{
    @public
        int age;
}

// 类方法者是以 + 开头
+ (void) printClassName;
- (void) test;
+ (void) test;

@end

void testClassMethod(void);

#endif /* ClassMethod_h */
