//
//  Heap.m
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import "Heap.h"
#import "Stack.h"
@implementation Heap

-(id)init{
    self = [super init];
    if (self){
        self.size = 0;
    }
    return self;
}

-(void)addItem:(Item*)item{
    self.size += 1;
    if(self.head == nil){
        self.head = item;
        return;
    }
    
    
    Stack *path = [Stack new]; // this path indicates how to reach the destination of the insertion
   
    unsigned int n = self.size;
    while(n > 1){
        // get the path of insertion // the path depends on the size
        Item* pathItem = [[Item alloc]initWithIdentification:nil Priority:n%2];
        [path addItem: pathItem];
        n = n/2;
        // use stack to record each result
    }
    
    
    Item* currentItem = self.head;
    
    if(self.head.priority < item.priority){
        // replace the head if necessary, to replace head, set the new head's children
        
        item.leftChild = self.head.leftChild;
        item.rightChild = self.head.rightChild;
        currentItem = item;
        item = self.head;
        self.head = currentItem;

    }
    
    while (path.head!= nil) {
        Item* temp;
        
        if(path.head.priority == 1){ // should go to left branch
            temp = currentItem.rightChild;
            
        }
        else if (path.head.priority == 0){ // should go to right branch
            temp = currentItem.leftChild;
            
        }
        
        if(temp.priority < item.priority || temp == nil){ // replace the child if necessary and go to next node
            
            // set the new node's child
            item.leftChild = temp.leftChild;
            item.rightChild = temp.rightChild;
            // replace the corresponding child
            if(path.head.priority == 1){
                currentItem.rightChild = item;
            }
            
            else if (path.head.priority == 0){
                currentItem.leftChild = item;
            }
            currentItem = item;
            item = temp;
            
        }
        else{
            // go to next node
            currentItem = temp;
        }
        
        [path pop];
    }
    
}





@end
