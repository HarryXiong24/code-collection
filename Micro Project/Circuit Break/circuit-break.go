package main

import (
	"fmt"
	"sync"
	"time"
)

const (
	close    = 1
	open     = 2
	halfOpen = 3
)

type CircuitBreak struct {
	State           int
	FailureCount    int
	NextAttemptTime time.Time
	lock            sync.Mutex

	// config
	ResetTimeout   int
	MaxFailedCount int
}

func (c *CircuitBreak) NewCircuitBreak(resetTimeout int, maxFailedCount int) *CircuitBreak {
	return &CircuitBreak{
		State:           close,
		FailureCount:    0,
		NextAttemptTime: time.Now(),
		lock:            sync.Mutex{},
		ResetTimeout:    resetTimeout,
		MaxFailedCount:  maxFailedCount,
	}
}

func (c *CircuitBreak) Execute(action func() error) error {
	c.lock.Lock()

	// check state
	if c.State == open && time.Now().After(c.NextAttemptTime) {
		c.State = halfOpen
	}

	if c.State == open {
		c.lock.Unlock()
		return fmt.Errorf("circuit break is open.")
	}

	c.lock.Unlock() // before action, we must unlock, since action() might be too slow to block the whole system

	err := action()
	if err != nil {
		c.onFailure()
		return fmt.Errorf("action is failed.")
	}

	c.onSuccess()
	return nil
}

func (c *CircuitBreak) onSuccess() {
	c.lock.Lock()
	defer c.lock.Unlock()

	c.State = close
	c.FailureCount = 0
}

func (c *CircuitBreak) onFailure() {
	c.lock.Lock()
	defer c.lock.Unlock()

	c.FailureCount++
	if c.State == halfOpen || c.FailureCount >= c.MaxFailedCount {
		c.State = open
		c.NextAttemptTime = time.Now().Add(time.Duration(c.ResetTimeout) * time.Second)
	}
}
