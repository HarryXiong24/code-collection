//
//  Circle.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#import <Foundation/Foundation.h>
#import<math.h>
#import "Circle.h"

@implementation Point2D

// 同时设置 x 和 y 实现
- (void)setX:(double)x andY:(double)y {
    [self setX:x];
    [self setY:y];
}

// 计算跟其他点的距离实现
- (double)distanceWithOther:(Point2D *)other {
    return [Point2D distanceBetweenPoint1:self andPonint2:other];
}

// 计算两个点的距离实现
+ (double)distanceBetweenPoint1:(Point2D *)p1 andPonint2:(Point2D *)p2 {
    // x1-x2
    double delta_x = p1.x - p2.x;
    
    // (x1-x2)的平方
    double squra_delta_x = pow(delta_x, 2);
    
    // y1-y2
    double delta_y = p1.x - p2.y;
    
    // (y1-y2) 的平方
    double squra_delta_y = pow(delta_y, 2);
    
    // 返回距离
    return sqrt(squra_delta_x + squra_delta_y);
}

@end

@implementation Circle

// 判断跟其他圆是否重叠(重叠返回 Yes，否则返回 NO),返回值是 BOOL 类型的
- (BOOL)isInteractWithOther:(Circle *)c {
    return [Circle isInteractBetweenCircle1:self andCircle2:c];
}

// 判断两个圆是否重叠（重叠返回Yes，否则返回NO）
+ (BOOL)isInteractBetweenCircle1:(Circle *)c1 andCircle2:(Circle *)c2 {
    // 如果两个圆心的距离 < 两个圆的半径和, 重叠
    // 如果两个圆心的距离 >= 两个圆的半径和, 不重叠
    Point2D *p1 = c1.point;
    Point2D *p2 = c2.point;
    
    // 圆心之间的距离
    double distance = [Point2D distanceBetweenPoint1:p1 andPonint2:p2];
    
    double radiusSum = c1.radius + c2.radius;
    
    return distance < radiusSum;
}

@end

void testCircle(void) {
    // 圆对象1
    Circle *c1 = [Circle new];
    // 设置半径
    [c1 setRadius:5];
    // 创建圆心对象
    Point2D *p1 = [Point2D new];
    [p1 setX:10 andY:15];
    
    // 先设置圆心
    [c1 setPoint:p1];
    [[c1 point] setX:15];
    
    // c1 半径：5 圆心：（15，15）
    
    // 圆对象2
    Circle *c2 = [Circle new];
    // 设置圆的半径
    [c2 setRadius:2];
    // 创建圆心对象
    Point2D *p2 = [Point2D new];
    [p2 setX:12 andY:19];
    // 设置圆心
    [c2 setPoint:p2];
    
    //c2 半径：2 圆心：（12，19）
    
    
    BOOL b1 = [Circle isInteractBetweenCircle1:c1 andCircle2:c2];
    
    NSLog(@"%d", b1);
}
