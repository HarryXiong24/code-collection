//
//  Node.h
//  DataStructures
//
//  Created by Harshad Kale on 8/17/14.
//  Copyright (c) 2014 Harshad Kale. All rights reserved.
//

#import <Foundation/Foundation.h>

@interface DSNode : NSObject

@property (nonatomic) NSNumber *data;

- (instancetype)initNodeWithData:(NSNumber *)data;

@end
