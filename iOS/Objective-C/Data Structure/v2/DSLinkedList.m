//
//  LinkedList.m
//  DataStructures
//
//  Created by Harshad Kale on 8/17/14.
//  Copyright (c) 2014 Harshad Kale. All rights reserved.
//

#import "DSLinkedList.h"

@interface DSLinkedList ()
@property (nonatomic, strong) DSSingleListNode *head;
@end

@implementation DSLinkedList

#pragma mark - <public> Overriden methods

-(NSString *)description
{
    DSSingleListNode *node = _head;
    NSMutableString *description = [NSMutableString stringWithString:@""];
    
    while (node)
    {
        [description appendFormat:@"%@ -> ", node.data];
        node = node.next;
    }
    
    [description appendFormat:@"Nil"];
    
    return description;
}

#pragma mark - <private> methods

- (DSSingleListNode *)tail
{
    DSSingleListNode *indexer = _head;
    
    if (!_head)
    {
        return nil;
    }
    
    while (indexer.next)
    {
        indexer = indexer.next;
    }
    
    return indexer;
}

#pragma mark - <public> methods
- (instancetype)initLinkedListWithNode:(DSSingleListNode *)node
{
    if (self = [super init])
    {
        _head = node;
    }
    
    return self;
}

- (instancetype)initLinkedListWithNodeData:(id)data
{
    if (self = [super init])
    {
        _head = [[DSSingleListNode alloc] init];
        _head.data = data;
        _head.next = nil;
    }
    
    return [self initLinkedListWithNode:_head];
}

- (NSUInteger)length
{
    NSUInteger count = 0;
    DSSingleListNode *indexer = _head;
    
    if (!_head)
    {
        return 0;
    }
    
    do
    {
        count++;
        indexer = indexer.next;
    } while (indexer.next);
    
    return count;
}

- (void)push:(DSSingleListNode *)node
{
    node.next = _head;
    _head = node;
}

- (DSSingleListNode *)pop
{
    DSSingleListNode *popped = _head;
    _head = _head.next;
    
    return popped;
}

- (void)addAtEndNode:(DSSingleListNode *)node
{
    if (node)
    {
        DSSingleListNode *tail = [self tail];
        tail.next = node;
    }
}

- (DSSingleListNode *)nodeAtIndex:(NSUInteger)index
{
    DSSingleListNode *indexer = _head;
    for (NSUInteger i = 0; i < index; i++)
    {
        if (indexer.next)
        {
            indexer = indexer.next;
        }
        else
        {
            return nil;
        }
    }
    return indexer;
}

- (void)insert:(DSSingleListNode *)node atIndex:(NSUInteger)index
{
    if (node)
    {
        if (index == 0)
        {
            [self push:node];
            return;
        }
        
        DSSingleListNode *nodeAtIndexLessOne = [self nodeAtIndex:(index - 1)];
        if (nodeAtIndexLessOne)
        {
            node.next = nodeAtIndexLessOne.next.next;
            nodeAtIndexLessOne.next = node;
        }
    }
}

- (void)removeNodeAtIndex:(NSUInteger)index
{
    if (index == 0)
    {
        [self pop];
        return;
    }
    
    DSSingleListNode *nodeAtIndexLessOne = [self nodeAtIndex:(index - 1)];
    if (nodeAtIndexLessOne)
    {
        nodeAtIndexLessOne.next = nodeAtIndexLessOne.next.next;
    }
}

#pragma mark - <public> derived methods

- (void)insertSorted:(DSSingleListNode *)node
{
    
}

@end
