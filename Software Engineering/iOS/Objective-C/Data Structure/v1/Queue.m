//
//  Queue.m
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import "Queue.h"

@implementation Queue



-(void)addItem:(Item*)item{
    if(self.head == nil){
        self.head = item;
        return;
    }
    // set the new head, after setting new head next to the old
    Item* currentItem = self.head;
    while (currentItem.nextItem!=nil) {
        currentItem = currentItem.nextItem;
    }
    currentItem.nextItem = item;
    
}

-(Item*)pop{
    // pop the head, after setting the new head as old's next
    Item* popItem = self.head;
    self.head = popItem.nextItem;
    return popItem;
    
}






@end
