//
//  DataStructure.m
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import "DataStructure.h"

@implementation DataStructure


-(void)print{
    Item *currentItem = self.head;
    while (currentItem != nil) {
        NSLog(@"%@,%ld",currentItem.identification, currentItem.priority);
        currentItem = currentItem.nextItem;
    }
}

-(void)addItemWithIdentification:(NSString*)identification Priority:(NSInteger)priority{
    Item *item = [[Item alloc]initWithIdentification:identification Priority:priority];

    
    [self addItem:item];
}
-(void)addItem:(Item*)item{
    
    
}
@end
