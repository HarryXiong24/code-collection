//
//  Tree.h
//  DataStructure
//
//  Created by YANGSHENG ZOU on 2016-08-30.
//  Copyright © 2016 YANGSHENG ZOU. All rights reserved.
//

#import <Foundation/Foundation.h>
#import "DataStructure.h"
#import "Queue.h"
#import "Stack.h"
// implement tree

@interface Tree :DataStructure
@property (strong,nonatomic) Queue* queue;  //queue needed for BFS
@property (strong,nonatomic) Stack* stack;  // stack needed for DFS
-(void)BFSQueue;
-(void)DFSStack;
-(void)DFSRecursive;

- (void)print __attribute__((unavailable("use BFS or DFS instead")));
@end
