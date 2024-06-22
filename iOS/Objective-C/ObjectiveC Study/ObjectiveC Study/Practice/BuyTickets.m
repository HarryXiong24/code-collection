//
//  BuyTickets.m
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/21.
//

#import <Foundation/Foundation.h>
#import "BuyTickets.h"

// Aim: Create a ticket agent to help people buy ticket.


@implementation TicketAgent

- (void)buyTicket {
    NSLog(@"Already bought a ticket!");
}

@end

@implementation MyPerson

- (instancetype)initWithTickerAgent:(id<HandleTicket>)agent {
    self = [super init];
    if (self) {
        _delegate = agent;
    }
    return self;
}

- (void)goToWatchMovies {
    NSLog(@"Call TicketAgent to buy a ticket.");
    if ([self.delegate respondsToSelector:@selector(buyTicket)]) {
        [self.delegate buyTicket];
    }
    NSLog(@"I have a ticket. I can go~");
}


@end

void testBuyTick(void) {
    TicketAgent *agent = [TicketAgent new];
    
    MyPerson *person = [[MyPerson alloc] initWithTickerAgent:agent];
    
    [person goToWatchMovies];
}

