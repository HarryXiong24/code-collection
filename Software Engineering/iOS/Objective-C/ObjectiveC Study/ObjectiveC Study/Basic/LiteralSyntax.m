//
//  LiteralSyntax.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#import <Foundation/Foundation.h>

void testLiteralSyntax(void) {
    // 使用字面量语法创建不可变数组
    NSArray *fruits = @[@"apple", @"banana", @"cherry"];
    NSLog(@"Fruits: %@", fruits);

    // 使用字面量语法创建可变数组
    NSMutableArray *mutableFruits = [@[@"grape", @"kiwi"] mutableCopy];
    [mutableFruits addObject:@"mango"];
    NSLog(@"Mutable Fruits: %@", mutableFruits);

    // 使用字面量语法创建不可变字典
    NSDictionary *fruitColors = @{@"apple": @"red", @"banana": @"yellow", @"cherry": @"red"};
    NSLog(@"Fruit Colors: %@", fruitColors);

    // 使用字面量语法创建可变字典
    NSMutableDictionary *mutableFruitColors = [@{@"apple": @"red", @"banana": @"yellow"} mutableCopy];
    [mutableFruitColors setObject:@"green" forKey:@"grape"];
    NSLog(@"Mutable Fruit Colors: %@", mutableFruitColors);

    // 使用字面量语法创建数值对象
    NSNumber *number = @42;
    NSNumber *floatNumber = @3.14;
    NSNumber *boolNumber = @YES;
    NSLog(@"Number: %@", number);
    NSLog(@"Float Number: %@", floatNumber);
    NSLog(@"Bool Number: %@", boolNumber);
}

