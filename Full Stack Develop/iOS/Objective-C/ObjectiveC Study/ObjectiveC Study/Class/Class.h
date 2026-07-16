//
//  Class.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/18.
//

#ifndef Class_h
#define Class_h


// 类的声明: 声明对象的属性，行为
// NSObject 目地是：让Car这个类具备创建对象的能力
@interface Car : NSObject
{
    // 用来声明对象属性（实例变量＼成员变量 ，默认会初始化为0）
    // @public 可以让外部的指针间接访问对象内部的成员变量
    @public
        int wheels; // 轮胎个数
        int speed; // 时速(xxkm/h)
}

// 方法（行为）：方法名，参数，返回值（声明，实现）
// 要是 OC 对象的方法，必须以减号 －
//  OC 方法中的小括号（）：括住数据类型, OC 方法中任何数据类型都必须用小括号（）括住
- (void)run;
- (void)fly;

@end

void testClass(void);


#endif /* Class_h */
