//
//  Array.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#import <Foundation/Foundation.h>

void testArray(void) {
    // create an empty NSMutableArray
    NSMutableArray *mutableArray = [NSMutableArray array];
    
    // create an NSMutableArray with initial value
    NSMutableArray *initialArray = [NSMutableArray arrayWithObjects:@"apple", @"banana", @"cherry", nil]; 
    // 使用 arrayWithObjects: 方法时，必须以 nil 结尾。这是因为 nil 在这里作为数组元素的结束标志，告诉编译器数组的结束位置。没有 nil，编译器将无法确定数组的结束，可能会导致访问越界或其他错误
    
    // simple way：NSMutableArray *initialArray = [@[@"grape", @"kiwi"] mutableCopy];
    NSLog(@"Initial array: %@", initialArray);

    // add an element to the end
    [initialArray addObject:@"date"];
    NSLog(@"After adding date: %@", initialArray);

    // insert an element at the specified position
    [initialArray insertObject:@"apricot" atIndex:1];
    NSLog(@"After inserting apricot at index 1: %@", initialArray);

    // remove a specific element by index
    [initialArray removeObjectAtIndex:2];
    NSLog(@"After removing object at index 2: %@", initialArray);

    // remove a specific element
    [initialArray removeObject:@"banana"];
    NSLog(@"After removing banana: %@", initialArray);

    // remove last element
    [initialArray removeLastObject];
    NSLog(@"After removing last object: %@", initialArray);

    // replace a specific element by index
    [initialArray replaceObjectAtIndex:1 withObject:@"blueberry"];
    NSLog(@"After replacing object at index 1 with blueberry: %@", initialArray);

    // accessing elements by index
    NSString *firstFruit = [initialArray objectAtIndex:0];
    NSLog(@"First fruit: %@", firstFruit);

    // simple way to access elements by index
    NSString *secondFruit = initialArray[1];
    NSLog(@"Second fruit: %@", secondFruit);

    // iterating over an array
    NSLog(@"Traversing array using for-in loop:");
    for (NSString *fruit in initialArray) {
        NSLog(@"Fruit: %@", fruit);
    }

    // determine whether a specific element exists in an array
    if ([initialArray containsObject:@"apple"]) {
        NSLog(@"The array contains apple");
    }

    // get the index of the specified element
    NSUInteger index = [initialArray indexOfObject:@"cherry"];
    if (index != NSNotFound) {
        NSLog(@"Cherry is at index %lu", (unsigned long)index);
    }

    // get element count in array
    NSUInteger count = [initialArray count];
    NSLog(@"The array has %lu elements", (unsigned long)count);

    // concat
    [initialArray addObjectsFromArray:@[@"apple", @"banana", @"cherry", @"date"]];
    NSLog(@"Repopulated array: %@", initialArray);
    NSArray *moreFruits = @[@"grape", @"kiwi"];
    [initialArray addObjectsFromArray:moreFruits];
    NSLog(@"After adding more fruits: %@", initialArray);

    // sort
    [initialArray sortUsingSelector:@selector(localizedCaseInsensitiveCompare:)];
    NSLog(@"After sorting: %@", initialArray);
    
    // clear all elements in array
    [initialArray removeAllObjects];
    NSLog(@"After removing all objects: %@", initialArray);
}

