//
//  BuyTickets.h
//  ObjectiveC Study
//
//  Created by Harry Xiong on 2024/6/21.
//

#ifndef BuyTickets_h
#define BuyTickets_h

@protocol HandleTicket <NSObject>

@required
- (void)buyTicket;

@end

@interface MyPerson : NSObject

@property (nonatomic, weak) id<HandleTicket> delegate;

- (instancetype)initWithTickerAgent:(id<HandleTicket>)agent;
- (void)goToWatchMovies;

@end

@interface TicketAgent : NSObject <HandleTicket>

@end

void testBuyTick(void);

#endif /* BuyTickets_h */
