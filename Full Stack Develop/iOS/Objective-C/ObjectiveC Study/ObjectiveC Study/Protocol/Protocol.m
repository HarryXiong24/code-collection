//
//  Protocol.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/21.
//

#import <Foundation/Foundation.h>
#import "Protocol.h"

@implementation MyClassDemo

- (void)requiredMethod {
    NSLog(@"I am requiredMethod based on Protocol.");
}

@end

void testProtocol(void) {
    MyClassDemo *demo = [MyClassDemo new];
    
    [demo requiredMethod];
}
