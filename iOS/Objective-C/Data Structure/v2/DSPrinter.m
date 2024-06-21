//
//  Printer.m
//  DataStructures
//
//  Created by Harshad Kale on 8/21/14.
//  Copyright (c) 2014 Harshad Kale. All rights reserved.
//

#import "DSPrinter.h"

@implementation DSPrinter

+ (void)printLinkedList:(DSLinkedList *)list
{
    NSLog(@"%@", [list description]);
}

@end
