//
//  Stack.m
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import "Stack.h"

@implementation Stack



-(void)addItem:(Item*)item{
    if(self.head == nil){
        self.head = item;
        return;
    }
    // set the new head, after setting new head next to the old
    
    item.nextItem = self.head;
    self.head = item;
}

-(Item*)pop{
    // pop the head, after setting the new head as old's next
    if(self.head == nil){
       
        return nil;
    }
    Item * popItem = self.head;
    self.head = self.head.nextItem;
    return popItem;
}


@end
