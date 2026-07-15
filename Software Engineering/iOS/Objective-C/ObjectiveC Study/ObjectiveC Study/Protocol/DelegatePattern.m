//
//  DelegatePattern.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/21.
//

#import <Foundation/Foundation.h>
#import "DelegatePattern.h"

@implementation DCar

- (void)startMoving {
    NSLog(@"Car is starting to move.");
    if ([self.delegate respondsToSelector:@selector(carDidStartMoving)]) {
        [self.delegate carDidStartMoving];
    }
}

@end

@implementation Driver

- (void)carDidStartMoving {
    NSLog(@"Driver has been notified that the car is starting to move.");
}

@end

void testDelegate(void) {
    DCar *myCar = [[DCar alloc] init];
    Driver *myDriver = [[Driver alloc] init];

    myCar.delegate = myDriver;
    [myCar startMoving];
}


/*
  Real UI Example
 */

@protocol CustomViewDelegate <NSObject>

@required
- (void)customViewButtonWasPressed;

@end

/*
 
// Your customize components, and your want to encapsulate it, but the effect of button pressed will let user customize by himself.
#import <UIKit/UIKit.h>
#import "CustomViewDelegate.h"

@interface CustomView : UIView

@property (nonatomic, weak) id<CustomViewDelegate> delegate;

@end

@implementation CustomView

- (instancetype)initWithFrame:(CGRect)frame {
    self = [super initWithFrame:frame];
    if (self) {
        UIButton *button = [UIButton buttonWithType:UIButtonTypeSystem];
        [button setTitle:@"Press me" forState:UIControlStateNormal];
        button.frame = CGRectMake(50, 50, 100, 50);
        [button addTarget:self action:@selector(buttonPressed) forControlEvents:UIControlEventTouchUpInside];
        [self addSubview:button];
    }
    return self;
}

- (void)buttonPressed {
    if ([self.delegate respondsToSelector:@selector(customViewButtonWasPressed)]) {
        [self.delegate customViewButtonWasPressed];
    }
}

@end

// Use can implement the effect of button pressed.
#import "ViewController.h"
#import "CustomView.h"

@interface ViewController () <CustomViewDelegate>
@end

@implementation ViewController

- (void)viewDidLoad {
    [super viewDidLoad];

    CustomView *customView = [[CustomView alloc] initWithFrame:self.view.bounds];
    customView.delegate = self;
    [self.view addSubview:customView];
}

- (void)customViewButtonWasPressed {
    NSLog(@"Button was pressed in custom view");
    // Handle the button press event here
}

@end
 
*/
