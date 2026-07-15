//
//  Tree.m
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import "Tree.h"

@implementation Tree


-(void)DFSRecursive{ //recursive DFS
    if(self.head != nil){
        [self DFSFromNode:self.head];
    }
}


-(void)DFSFromNode:(Item*)node{
    NSLog(@"%@",node.identification);
    
    if (node.leftChild){
        // sacn left sub-tree
        [self DFSFromNode:node.leftChild];
        
    }
    
    if(node.rightChild){
        // sacn right sub-tree
        [self DFSFromNode:node.rightChild];
    }
}

-(void)DFSStack{
    // non-recursive DFS with stack
    if (self.head != nil){
        self.stack = [Stack new];  // empty the stack
        [self.stack addItem:self.head]; // add head
        while(self.stack.head != nil){
            Item* temp = self.stack.head;
            NSLog(@"%@",[self.stack pop].identification); // pop the stack and add the pop item's right and left child if exist
            if(temp.rightChild != nil){
                [self.stack addItem:temp.rightChild];
            }
            if(temp.leftChild != nil){
                
                [self.stack addItem:temp.leftChild];
            }
        }
        
        
        
    }
    
}


-(void)BFSQueue{
    // BFS with queue
    if (self.head != nil){
        self.queue = [Queue new];  // empty the queue
        [self.queue addItem:self.head];  // push head to the queue
        
        while(self.queue.head != nil){  // before pop, add the pop item left child and right child
            if (self.queue.head.leftChild != nil){
                [self.queue addItem:self.queue.head.leftChild];
            }
                if(self.queue.head.rightChild != nil){
                [self.queue addItem:self.queue.head.rightChild];
            }
            
            NSLog(@"%ld", [self.queue pop].priority);
        }
    }
}






@end
