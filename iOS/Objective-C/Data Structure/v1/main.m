//
//  main.m
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "SortedList.h"
#import "Queue.h"
#import "Stack.h"
#import "Heap.h"
int main(int argc, const char * argv[]) {
    @autoreleasepool {
        // insert code here...
        
        
        // sorted list
        SortedList *sortedList = [SortedList new];
        [sortedList addItemWithIdentification:@"id1" Priority:1];
        [sortedList addItemWithIdentification:@"id2" Priority:0];
        [sortedList addItemWithIdentification:@"id3" Priority:3];
      //  [sortedList print];
        
        [sortedList deleteItemWithIdentification:@"id1"];
     //   [sortedList print];
        
        // list
        List *list = [List new];
        [list addItemWithIdentification:@"id1" Priority:1];
        [list addItemWithIdentification:@"id2" Priority:0];
        [list addItemWithIdentification:@"id3" Priority:3];
    //    [list print];
        
        [list deleteItemWithIdentification:@"id1"];
    //    [list print];
        
        
        //Queue
        Queue *queue = [Queue new];
        [queue addItemWithIdentification:@"id1" Priority:1];
        [queue addItemWithIdentification:@"id2" Priority:0];
        [queue addItemWithIdentification:@"id3" Priority:3];
       // [queue print];
        [queue pop];
       // [queue print];
        
        
        // stack
        Stack *stack = [Stack new];
        
        [stack addItemWithIdentification:@"id1" Priority:1];
        [stack addItemWithIdentification:@"id2" Priority:0];
        [stack addItemWithIdentification:@"id3" Priority:3];
        
      //  [stack print];
        [stack pop];
      //  [stack print];
        
       
        
        Heap *heap = [Heap new];
        [heap addItemWithIdentification:@"1" Priority:1];
        
        
        [heap addItemWithIdentification:@"3" Priority:3];
        
        [heap addItemWithIdentification:@"4" Priority:4];
       
        
        [heap addItemWithIdentification:@"2" Priority:2];
        
        [heap addItemWithIdentification:@"6" Priority:6];
        [heap addItemWithIdentification:@"5" Priority:5];
        [heap addItemWithIdentification:@"7" Priority:7];
        [heap addItemWithIdentification:@"9" Priority:9];
        [heap addItemWithIdentification:@"8" Priority:8];
        
        //[heap BFSQueue];
        //[heap DFSStack];
        [heap DFSRecursive];
       
        

      //
        
        
    }
    
    
    
    
    
    
    
    return 0;
}
