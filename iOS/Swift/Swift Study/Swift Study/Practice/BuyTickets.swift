//
//  BuyTickets.swift
//  Swift Study
//
//  Created by Harry Xiong on 2024/6/24.
//

import Foundation

// Aim: Create a ticket agent to help people buy tickets.

protocol HandleTicket {
    func buyTicket();
}

struct MyPerson {
    
    let agentDelegate: HandleTicket?;
    
    init(agent: HandleTicket? = nil) {
        self.agentDelegate = agent
    }
    
    func goToWatchMovie() {
        print("Called Ticket Agent to buy a ticket.")
        if let delegate = agentDelegate {
            delegate.buyTicket()
        }
        print("I have a ticket. I can go~")
    }
    
}

struct TicketAgent : HandleTicket {
    func buyTicket() {
        print("Already bought a ticket!")
    }
}

func testBuyTicket() {
    let agent = TicketAgent()
    let person = MyPerson(agent: agent);
    
    person.goToWatchMovie();
}
