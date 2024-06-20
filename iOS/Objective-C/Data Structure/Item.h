//
//  Item.h
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface Item : NSObject
// the item as the node of any data structure
@property (nonatomic, strong) NSString* identification;
@property (nonatomic, assign) NSInteger priority;
@property (nonatomic, strong) Item* nextItem;  // next item for queue, stack, list and sorted list
@property (nonatomic, strong) Item* leftChild; // left child and right child for tree and heap
@property (nonatomic, strong) Item* rightChild;

-(id)initWithIdentification:(NSString*)identification Priority:(NSInteger)priority;
@end
