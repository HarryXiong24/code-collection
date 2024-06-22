//
//  Array.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#import <Foundation/Foundation.h>

void testArray(void) {
    // 创建空的 NSMutableArray
    NSMutableArray *mutableArray = [NSMutableArray array];
    
    // 使用初始值创建 NSMutableArray
    NSMutableArray *initialArray = [NSMutableArray arrayWithObjects:@"apple", @"banana", @"cherry", nil]; // 使用 arrayWithObjects: 方法时，必须以 nil 结尾。这是因为 nil 在这里作为数组元素的结束标志，告诉编译器数组的结束位置。没有 nil，编译器将无法确定数组的结束，可能会导致访问越界或其他错误
    // 简化语法：NSMutableArray *initialArray = [@[@"grape", @"kiwi"] mutableCopy];
    NSLog(@"Initial array: %@", initialArray);

    // 添加元素
    [initialArray addObject:@"date"];
    NSLog(@"After adding date: %@", initialArray);

    // 在指定位置插入元素
    [initialArray insertObject:@"apricot" atIndex:1];
    NSLog(@"After inserting apricot at index 1: %@", initialArray);

    // 移除指定位置的元素
    [initialArray removeObjectAtIndex:2];
    NSLog(@"After removing object at index 2: %@", initialArray);

    // 移除特定的元素
    [initialArray removeObject:@"banana"];
    NSLog(@"After removing banana: %@", initialArray);

    // 移除最后一个元素
    [initialArray removeLastObject];
    NSLog(@"After removing last object: %@", initialArray);

    // 移除所有元素
    [initialArray removeAllObjects];
    NSLog(@"After removing all objects: %@", initialArray);

    // 重新添加一些元素
    [initialArray addObjectsFromArray:@[@"apple", @"banana", @"cherry", @"date"]];
    NSLog(@"Repopulated array: %@", initialArray);

    // 替换指定位置的元素
    [initialArray replaceObjectAtIndex:1 withObject:@"blueberry"];
    NSLog(@"After replacing object at index 1 with blueberry: %@", initialArray);

    // 通过索引访问元素
    NSString *firstFruit = [initialArray objectAtIndex:0];
    NSLog(@"First fruit: %@", firstFruit);

    NSString *secondFruit = initialArray[1]; // 使用简化语法
    NSLog(@"Second fruit: %@", secondFruit);

    // 遍历数组
    NSLog(@"Traversing array using for-in loop:");
    for (NSString *fruit in initialArray) {
        NSLog(@"Fruit: %@", fruit);
    }

    // 判断数组是否包含特定元素
    if ([initialArray containsObject:@"apple"]) {
        NSLog(@"The array contains apple");
    }

    // 获取元素索引
    NSUInteger index = [initialArray indexOfObject:@"cherry"];
    if (index != NSNotFound) {
        NSLog(@"Cherry is at index %lu", (unsigned long)index);
    }

    // 获取数组的元素个数
    NSUInteger count = [initialArray count];
    NSLog(@"The array has %lu elements", (unsigned long)count);

    // 拼接两个数组
    NSArray *moreFruits = @[@"grape", @"kiwi"];
    [initialArray addObjectsFromArray:moreFruits];
    NSLog(@"After adding more fruits: %@", initialArray);

    // 排序数组
    [initialArray sortUsingSelector:@selector(localizedCaseInsensitiveCompare:)];
    NSLog(@"After sorting: %@", initialArray);
}

