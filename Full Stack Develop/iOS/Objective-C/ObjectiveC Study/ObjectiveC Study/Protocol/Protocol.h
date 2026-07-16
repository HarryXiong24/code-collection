//
//  Protocol.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/21.
//

#ifndef Protocol_h
#define Protocol_h

// When you declare a protocol that conforms to the <NSObject> protocol, like @protocol MyProtocolDemo <NSObject>, it means that any class that adopts your protocol must also implement the methods declared in the <NSObject> protocol.
@protocol MyProtocolDemo <NSObject>

@property (nonatomic, strong) NSString *no;
@property (nonatomic, strong) NSString *name;

@optional @property (nonatomic, strong) NSString *sex;

- (void)requiredMethod;

@optional
- (void)optionalMethod;

@end


@interface MyClassDemo : NSObject <MyProtocolDemo>

@property (nonatomic, strong) NSString *no;
@property (nonatomic, strong) NSString *name;
@property (nonatomic, strong) NSString *sex;

@end


void testProtocol(void);

#endif /* Protocol_h */
