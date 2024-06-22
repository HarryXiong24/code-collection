//
//  Category.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/20.
//

#ifndef Category_h
#define Category_h

@interface CategoryDemo : NSObject

- (void)test;

@end


@interface CategoryDemo (Suppliment)

- (void)play;

@end

@interface NSString (CountNumbers)

+ (int)numberCountOfString:(NSString *)str;

- (int)numberCount;

@end

void testCategory(void);

#endif /* Category_h */
