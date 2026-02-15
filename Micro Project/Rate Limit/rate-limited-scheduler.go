package main

import (
	"sync"
	"time"
)

type RateLimitScheduler struct {
	capacity      int
	tokens        float64
	ratePerSecond float64
	lock          sync.Mutex
	cond          *sync.Cond
}

func NewRateLimitScheduler(capacity int, ratePerSecond float64) *RateLimitScheduler {
	rateLimitScheduler := &RateLimitScheduler{
		capacity:      capacity,
		tokens:        float64(capacity),
		ratePerSecond: ratePerSecond,
		lock:          sync.Mutex{},
	}
	rateLimitScheduler.cond = sync.NewCond(&rateLimitScheduler.lock)

	go rateLimitScheduler.Refill()

	return rateLimitScheduler
}

func (r *RateLimitScheduler) Wait() {

	r.lock.Lock()
	defer r.lock.Unlock()

	for r.tokens < 1 {
		r.cond.Wait()
	}

	r.tokens--
}

func (r *RateLimitScheduler) Refill() {
	interval := time.Second / time.Duration(r.ratePerSecond)

	ticker := time.NewTicker(interval)
	defer ticker.Stop()

	for range ticker.C {
		r.lock.Lock()
		if r.tokens < float64(r.capacity) {
			r.tokens++
			r.cond.Signal()
		}
		r.lock.Unlock()
	}
}
