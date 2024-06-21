//
//  main.m
//  DataStructures
//
//  Created by Harshad Kale on 8/17/14.
//  Copyright (c) 2014 Harshad Kale. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DSPrinter.h"
#import "DSNode.h"
#import "DSLinkedList.h"

void RunProgram()
{
    DSNode *n1 = [[DSNode alloc] initNodeWithData:[NSNumber numberWithInt:1]];
    DSNode *n2 = [[DSNode alloc] initNodeWithData:[NSNumber numberWithInt:2]];
    DSNode *n3 = [[DSNode alloc] initNodeWithData:[NSNumber numberWithInt:3]];
    
    DSLinkedList *list = [[DSLinkedList alloc] init];
    [list push:n2];
    [list addAtEndNode:n3];
    [list insert:n1 atIndex:0];
    
    [DSPrinter printLinkedList:list];
}

int main(int argc, const char * argv[])
{
    @autoreleasepool
    {
        RunProgram();
    }
    return 0;
}


