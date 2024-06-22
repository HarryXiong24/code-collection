//
//  ClassExecuteWay.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#ifndef ClassExecuteWay_h
#define ClassExecuteWay_h

@interface Level1 : NSObject

+ (void)test;

@end

@interface Level1 (Suppliment)

@end

@interface Level2 : Level1

@end

@interface Level2 (Suppliment)

@end

@interface Level3 : Level2

@end

void testClassExecuteWay(void);

#endif /* ClassExecuteWay_h */

