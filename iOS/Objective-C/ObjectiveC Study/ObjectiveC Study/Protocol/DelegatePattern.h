//
//  DelegatePattern.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/21.
//

#ifndef DelegatePattern_h
#define DelegatePattern_h


@protocol CarDelegate <NSObject>

@required
- (void)carDidStartMoving;

@end

/*
    Delegating Object
 
    1. An object that delegates responsibilities to another object (the delegate).
    2. Holds a reference to the delegate and calls its methods at appropriate times.

 */
@interface DCar : NSObject

@property (nonatomic, weak) id<CarDelegate> delegate;

- (void)startMoving;

@end


/*
     1. An object that implements the methods defined in the protocol.
     2. Performs specific actions when called by the delegating object.
 */
@interface Driver : NSObject <CarDelegate>

@end

void testDelegate(void);

#endif /* DelegatePattern_h */
