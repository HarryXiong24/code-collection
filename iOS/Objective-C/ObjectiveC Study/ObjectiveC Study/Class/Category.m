//
//  Category.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#import <Foundation/Foundation.h>
#import "Category.h"


@implementation CategoryDemo

- (void)test
{
    NSLog(@"调用了 test 方法");
}

@end


@implementation CategoryDemo (Suppliment)

- (void)play
{
    NSLog(@"调用了 play 方法");
}

@end


/*
    给NSString增加一个类方法：计算某个字符串中阿拉伯数字的个数
    给NSString增加一个对象方法：计算某个字符串中阿拉伯数字的个数
 */
@implementation NSString (CountNumbers)

+ (int)numberCountOfString:(NSString *)str
{
    return [str numberCount];
  
}

- (int)numberCount
{
    int count = 0;
    
    for (int i = 0; i < self.length; i++) {
        // 取出 i 这个位置对应的字符
        unichar shortchar = [self characterAtIndex:i];
        //如果这个字符是阿拉伯数字，则count++
        if (shortchar>='0' && shortchar<='9') {
            count++;
        }
    }
    return count;
}

@end


/*
 分类：可以给某个类扩充一些方法（不修改原来类的代码）
 
 1. 分类只能增加方法，不能增加成员变量
 2. 分类方法实现中可以访问原来类中声明的成员变量
 3. 分类可以重新实现类中的方法，但是会覆盖掉原来的方法，会导致原来的方法没法再使用
 4. 方法调用的优先级：分类（最后参与编译的分类优先）——> 原来类 ——> 父类
 
 声明
  @interface Name (Category Name)
  @end
 
 实现
  @implementation Name (Category Name)
  @end
 
*/

void testCategory(void) {
    CategoryDemo *demo = [[CategoryDemo alloc] init];
    [demo test];
    [demo play];
    
    int count = [@"1q2wdw3ff4gg12g34" numberCount];
    NSLog(@"%d", count);
}
