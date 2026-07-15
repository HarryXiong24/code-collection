//
//  Block.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/21.
//

#ifndef Block_h
#define Block_h

typedef void (^handleData)(void);

@interface FetchDemo : NSObject

- (void)fetchHandleData:(handleData)handler;

@end

void testBlock(void);

#endif /* Block_h */
