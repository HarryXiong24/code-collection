package main

import (
	"sync"
)

type SafeMap struct {
	dict map[string]string
	lock sync.RWMutex
}

func NewSafeMap() *SafeMap {
	return &SafeMap{
		dict: make(map[string]string),
		lock: sync.RWMutex{},
	}
}

func (m *SafeMap) Get(key string) string {

	m.lock.RLock()
	defer m.lock.RUnlock()

	value := m.dict[key]

	return value
}

func (m *SafeMap) Set(key string, value string) {

	m.lock.Lock()
	defer m.lock.Unlock()
	m.dict[key] = value
}
