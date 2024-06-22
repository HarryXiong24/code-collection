//
//  IDPointer.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#import <Foundation/Foundation.h>
#import "IDPointer.h"

@implementation IDTest

@end

void testIDPointer(void) {
    // Create an IDTest object
    IDTest *t = [IDTest new];
    
    // Set the testNumber property
    [t setTestNumber:66];
    
    // Assign the IDTest object to an id type
    id anyObject = t;
    
    // Cast the id type back to IDTest to access its properties
    IDTest *castedObject = (IDTest *)anyObject;
    
    // Print the testNumber property
    NSLog(@"CastedObject Value: %d", castedObject.testNumber);
}
