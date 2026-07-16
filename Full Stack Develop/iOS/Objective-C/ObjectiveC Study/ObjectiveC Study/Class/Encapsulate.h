//
//  Encapsulate.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#ifndef Encapsulate_h
#define Encapsulate_h

@interface Grade : NSObject

{
    int _grade1; // Ｃ语言成绩
    int _grade2; // OC成绩
    int _totalGrade; // 总分
    int _meanGrade; // 平均分
}

- (void)setGrade1:(double)score;
- (double)grade1;

- (void)setGrade2:(double)score;
- (double)grade2;

- (double)getTotalGrade;

- (double)getMeanGrade;

@end

void testEncapsulate(void);

#endif /* Encapsulate_h */
