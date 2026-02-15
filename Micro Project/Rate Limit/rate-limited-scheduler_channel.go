package main

import (
	"time"
)

type RateLimit struct {
	capacity      int
	tokens        chan int
	ratePerSecond float64
}

func NewRateLimit(capacity int, ratePerSecond float64) *RateLimit {
	rateLimit := &RateLimit{
		capacity:      capacity,
		tokens:        make(chan int, capacity),
		ratePerSecond: ratePerSecond,
	}

	// fill out
	for i := 0; i < rateLimit.capacity; i++ {
		rateLimit.tokens <- 1
	}

	go rateLimit.Refill()

	return rateLimit
}

func (r *RateLimit) Wait() {
	<-r.tokens
}

func (r *RateLimit) Refill() {
	interval := time.Second / time.Duration(r.ratePerSecond)

	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for range ticker.C {
		select {
		case r.tokens <- 1:
		default:
		}
	}
}
