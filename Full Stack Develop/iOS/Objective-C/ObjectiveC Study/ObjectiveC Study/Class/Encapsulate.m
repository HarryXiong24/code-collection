//
//  Encapsulate.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#import <Foundation/Foundation.h>
#import "Encapsulate.h"

@implementation Grade

- (void)setGrade1:(double)score {
    _grade1 = score;
}

- (double)grade1 {
    return _grade1;
}

- (void)setGrade2:(double)score {
    _grade2 = score;
}


- (double)grade2 {
    return _grade2;
}


- (double)getMeanGrade {
    return (_grade1 + _grade2) / 2;
}


- (double)getTotalGrade {
    return _grade1 + _grade2;
}

@end


void testEncapsulate(void) {
    Grade *demo = [Grade new];
    
    
    [demo setGrade1:90];
    [demo setGrade2:100];
    
    double mean = [demo getMeanGrade];
    double total = [demo getTotalGrade];
    
    NSLog(@"平均分: %.2f", mean);
    NSLog(@"总分: %.2f", total);
}
