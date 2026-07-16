//
//  Node.m
//  DataStructures
//
//  Created by Harshad Kale on 8/17/14.
//  Copyright (c) 2014 Harshad Kale. All rights reserved.
//

#import "DSNode.h"

@implementation DSNode

- (instancetype)initNodeWithData:(NSNumber *)data
{
    if (self = [super init])
    {
        _data = data;
    }
    
    return self;
}

@end
