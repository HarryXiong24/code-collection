//
//  Polymorphism.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#ifndef Polymorphism_h
#define Polymorphism_h

@interface PAnimal : NSObject

- (void)eat;

@end

@interface PDog : PAnimal

- (void)run;

@end

@interface PCat : PAnimal

@end

void testPolymorphism(void);


#endif /* Polymorphism_h */
