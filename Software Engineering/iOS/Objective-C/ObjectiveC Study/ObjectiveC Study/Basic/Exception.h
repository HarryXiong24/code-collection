//
//  Exception.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/24.
//

#ifndef Exception_h
#define Exception_h

@interface FileReader : NSObject

- (void)readFileAtPath:(NSString *)filePath;

@end

void testException(void);

#endif /* Exception_h */
