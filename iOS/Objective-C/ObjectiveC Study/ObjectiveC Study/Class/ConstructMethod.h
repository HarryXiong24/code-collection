//
//  ConstructMethod.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//


#ifndef ConstructMethod_h
#define ConstructMethod_h

@interface Student : NSObject

@property int no;
@property NSString *name;
@property int age;

- (instancetype)init;
- (instancetype)initWithNO:(int)no;
- (instancetype)initWithNO:(int)no Name:(NSString *)name;
- (instancetype)initWithNO:(int)no Name:(NSString *)name Age:(int)age;

@end

void testConstructMethod(void);

#endif /* ConstructMethod_h */
