//
//  LinkedList.h
//  DataStructures
//
//  Created by Harshad Kale on 8/17/14.
//  Copyright (c) 2014 Harshad Kale. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DSSingleListNode.h"

@interface DSLinkedList : NSObject

/************************/
-(NSString *)description;
/************************/

- (instancetype)initLinkedListWithNode:(DSSingleListNode *)node;

- (instancetype)initLinkedListWithNodeData:(id)data;

- (NSUInteger)length;

- (void)push:(DSSingleListNode *)node;

- (DSSingleListNode *)pop;

- (void)addAtEndNode:(DSSingleListNode *)node;

- (DSSingleListNode *)nodeAtIndex:(NSUInteger)index;

- (void)insert:(DSSingleListNode *)node atIndex:(NSUInteger)index;

- (void)removeNodeAtIndex:(NSUInteger)index;

- (void)insertSorted:(DSSingleListNode *)node;

/*
- (void)appendList:(LinkedList *)list;

- (LinkedList *)secondListAfterSplitAtMid;

- (void)removeDuplicates;

- (LinkedList *)listAfterMovingNodeFromList:(LinkedList *)list;

- (LinkedList *)listAfterAlternativelySplittingList:(LinkedList *)list;

- (LinkedList *)listAfterShuffleMergingList:(LinkedList *)listOne withList:(LinkedList *)listTwo;

- (LinkedList *)listAfterSortedMergingList:(LinkedList *)listOne withList:(LinkedList *)listTwo;
*/

@end
