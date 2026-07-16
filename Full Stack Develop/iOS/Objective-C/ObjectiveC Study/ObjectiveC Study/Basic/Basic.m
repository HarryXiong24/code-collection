//
//  Basic.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/19.
//

#import <Foundation/Foundation.h>

void testBasic(void)
{

    int a = 0;
    
    // ternary operator
    a = a > 10 ? 5 : 8;
    
    // switch
    switch (a) {
        case 5:
            NSLog(@"Bad!");
            break;
        case 8:
            NSLog(@"Good!");
            break;
        default:
            NSLog(@"Error!");
            break;
    }
        
    int i = 0;
    
    // while
    while (i < 10) {
        i++;
        NSLog(@"%d",i);
    }
    
    
    // do while
    do{
        i++;
        NSLog(@"%d",i);
    } while (i < 10);
    
    // for-if
    for (i = 1; i < 10; i++){
        if (i >= 5) {
            NSLog(@"%d", i);
        }
        else if(i == 3){
            continue;
        }
        else if(i == 9){
            break;
        }
        else{
            NSLog(@"%d", i);
        }
    }
}
