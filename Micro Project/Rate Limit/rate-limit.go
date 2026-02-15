package main

import (
	"sync"
	"time"
)

type TokenBucket struct {
	capacity      int
	tokens        float64
	lastTime      time.Time
	ratePerSecond float64
	lock          sync.Mutex
}

func NewTokenBucket(capacity int, ratePerSecond int) *TokenBucket {
	return &TokenBucket{
		capacity:      capacity,
		tokens:        float64(capacity),
		lastTime:      time.Now(),
		ratePerSecond: float64(ratePerSecond),
		lock:          sync.Mutex{},
	}
}

func (r *TokenBucket) Allow() bool {
	r.lock.Lock()
	defer r.lock.Unlock()

	now := time.Now()
	duration := now.Sub(r.lastTime).Seconds()

	// update tokens
	r.tokens += duration * r.ratePerSecond
	if r.tokens > float64(r.capacity) {
		r.tokens = float64(r.capacity)
	}

	// update time
	r.lastTime = now

	if r.tokens >= 1 {
		r.tokens -= 1
		return true
	}
	return false
}
