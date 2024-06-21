//
//  Item.m
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import "Item.h"

@implementation Item

-(id)initWithIdentification:(NSString*)identification Priority:(NSInteger)priority{
    self = [super init];
    if (self){
        self.identification = identification;
        self.priority = priority;
    }
    return self;
}





@end
