//
//  List.m
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import "SortedList.h"

@implementation SortedList



-(void)addItem:(Item*)item{
    if (self.head == nil) {
        self.head = item;
        return;
    }
    
    else if (self.head.priority < item.priority){
        // try head
        item.nextItem = self.head;
        self.head = item;
        return;
    }
    
    
    Item *currentItem = self.head;
    while (currentItem.nextItem!= nil){
        // try other node
        if(item.priority < currentItem.nextItem.priority){
            
            item.nextItem = currentItem.nextItem;
            currentItem.nextItem = item;
            return;
        }
    }
    
    currentItem.nextItem = item; // it indicates the item should be on the tail
}






@end
