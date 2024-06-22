//
//  Super.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#ifndef Super_h
#define Super_h

@interface Zoombie : NSObject

- (void)walk;
+ (void)test;
- (void)test;

@end

@interface JumpZoombie : Zoombie

+ (void)haha;
- (void)haha;

@end

void testSuper(void);

#endif /* Super_h */
