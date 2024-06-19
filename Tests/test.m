#import <Foundation/Foundation.h>

@interface Person : NSObject
@property NSString *firstName;
@property NSString *lastName;
@end

@implementation Person
@end

int main(int argc, const char * argv[]) {
    @autoreleasepool {
        Person *person = [Person new];
        person.firstName = @"John";
        person.lastName = @"Doe";
        NSLog(@"Hello, %@ %@", person.firstName, person.lastName);
    }
    return 0;
}
