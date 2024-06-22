//
//  ConstructMethod.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#import <Foundation/Foundation.h>
#import "ConstructMethod.h"

@implementation Student

- (instancetype)init {
    self = [super init];
    return self;
}

- (instancetype)initWithNO:(int)no {
    self = [super init];
    if (self) {
        _no = no;
    }
    return self;
    
}

- (instancetype)initWithNO:(int)no Name:(NSString *)name {
    self = [super init];
    if (self) {
        _no = no;
        _name = name;
    }
    return self;
}

- (instancetype)initWithNO:(int)no Name:(NSString *)name Age:(int)age {
    self = [super init];
    if (self) {
        _no = no;
        _name = name;
        _age = age;
    }
    return self;
}

@end

void testConstructMethod(void) {
    Student *student1 = [[Student alloc] init];
    NSLog(@"ID: %d, Name: %@, Age: %d", student1.no, student1.name, student1.age);
    
    Student *student2 = [[Student alloc] initWithNO:002];
    NSLog(@"ID: %d, Name: %@, Age: %d", student2.no, student2.name, student2.age);
    
    Student *student3 = [[Student alloc] initWithNO:003 Name:@"Peter"];
    NSLog(@"ID: %d, Name: %@, Age: %d", student3.no, student3.name, student3.age);
    
    Student *student4 = [[Student alloc] initWithNO:004 Name:@"Harry" Age:24];
    NSLog(@"ID: %d, Name: %@, Age: %d", student4.no, student4.name, student4.age);
}
