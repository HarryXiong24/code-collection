//
//  DataStructure.h
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "Item.h"
@interface DataStructure : NSObject

// the super class for the data structure in the project

@property (nonatomic,strong) Item* head;
-(void)print; // show the memebers of a data structure. Not available for tree and heap;
-(void)addItemWithIdentification:(NSString*)identification Priority:(NSInteger)priority; // add item for the data structure, will call addItem
-(void)addItem:(Item*)item;   // realized by sub class
@end
