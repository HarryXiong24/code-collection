//
//  Inheritance.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#ifndef Inheritance_h
#define Inheritance_h

@interface Animal : NSObject
{
    int _age;
    double _weight;
}

- (void)setAge:(int)age;
- (int)age;

- (void)setWeight:(double)weight;
- (double)weight;

@end

// Fish 继承了 Animal，相当于拥有了 Animal 里面的所有成员变更和方法
@interface Fish : Animal

@end

@interface Cat : Animal

@end

void testInheritance(void);

#endif /* Inheritance_h */
