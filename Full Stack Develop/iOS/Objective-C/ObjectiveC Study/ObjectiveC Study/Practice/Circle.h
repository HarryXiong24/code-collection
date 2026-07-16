//
//  Circle.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#ifndef Circle_h
#define Circle_h

@interface Point2D : NSObject

@property double x;
@property double y;

// 同时设置 x 和 y 声明
- (void)setX:(double)x andY:(double)y;

// 计算跟其他点的距离声明
- (double)distanceWithOther:(Point2D *)other;

// 计算两个点的距离声明
+ (double)distanceBetweenPoint1:(Point2D *)p1 andPonint2:(Point2D *)p2;

@end

@interface Circle : NSObject

@property double radius;
@property Point2D *point;

// 判断跟其他圆是否重叠(重叠返回 Yes，否则返回 NO),返回值是 BOOL 类型的
- (BOOL)isInteractWithOther:(Circle *)c;

//判断两个圆是否重叠(重叠返回 Yes，否则返回 NO)
+ (BOOL)isInteractBetweenCircle1:(Circle *)c1 andCircle2:(Circle *)c2;

@end

void testCircle(void);

#endif /* Circle_h */
