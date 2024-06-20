//
//  List.m
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import "List.h"

@implementation List


-(void)addItem:(Item*)item{
    if (self.head == nil) {
        self.head = item;
        return;
    }
    
    else if (self.head.priority < item.priority){
        item.nextItem = self.head;
        self.head = item;
        return;
    }
    
    
    Item *currentItem = self.head;
    while (currentItem.nextItem!= nil){
        
        item.nextItem = currentItem.nextItem;
        currentItem.nextItem = item;
        return;
        
    }
    
    currentItem.nextItem = item; // insert on the tail
}

-(void)deleteItemWithIdentification:(NSString*)identification{
    
    
    if (self.head == nil) {
        return;
    }
    
    else if ([self.head.identification isEqualToString:identification]){
        // try head
        self.head = self.head.nextItem;
        return;
    }
    
    
    Item *currentItem = self.head;
    while (currentItem.nextItem!= nil){
        // try other node
        if([currentItem.nextItem.identification isEqualToString:identification]){
            // skip the deleted item
            currentItem.nextItem = currentItem.nextItem.nextItem;
            break;
        }
    }
}



@end
