package main

import "fmt"

// AdvancedMap represents the map
type AdvancedMap[K comparable, V any] struct {
	items map[K]V
}

// NewAdvancedMap initializes a new AdvancedMap
func NewAdvancedMap[K comparable, V any]() *AdvancedMap[K, V] {
	return &AdvancedMap[K, V]{items: make(map[K]V)}
}

// Set adds a key-value pair to the map
func (m *AdvancedMap[K, V]) Set(key K, value V) {
	m.items[key] = value
}

// Get returns the value associated with the key
func (m *AdvancedMap[K, V]) Get(key K) (V, bool) {
	value, ok := m.items[key]
	return value, ok
}

// Has returns whether the key exists in the map
func (m *AdvancedMap[K, V]) Has(key K) bool {
	_, ok := m.items[key]
	return ok
}

// Delete removes the key-value pair from the map
func (m *AdvancedMap[K, V]) Delete(key K) {
	delete(m.items, key)
}

// Clear removes all key-value pairs from the map
func (m *AdvancedMap[K, V]) Clear() {
	m.items = make(map[K]V)
}

// Size returns the number of key-value pairs in the map
func (m *AdvancedMap[K, V]) Size() int {
	return len(m.items)
}

// IsEmpty returns whether the map is empty
func (m *AdvancedMap[K, V]) IsEmpty() bool {
	return len(m.items) == 0
}

// Keys returns a slice of all keys in the map
func (m *AdvancedMap[K, V]) Keys() []K {
	keys := make([]K, 0, len(m.items))
	for key := range m.items {
		keys = append(keys, key)
	}
	return keys
}

// Values returns a slice of all values in the map
func (m *AdvancedMap[K, V]) Values() []V {
	values := make([]V, 0, len(m.items))
	for _, value := range m.items {
		values = append(values, value)
	}
	return values
}

// Entries returns a slice of all key-value pairs in the map
func (m *AdvancedMap[K, V]) Entries() [][2]any {
	entries := make([][2]any, 0, len(m.items))
	for key, value := range m.items {
		entries = append(entries, [2]any{key, value})
	}
	return entries
}

// ForEach iterates over all key-value pairs in the map and applies the callback function
func (m *AdvancedMap[K, V]) ForEach(callback func(key K, value V) bool) {
	for key, value := range m.items {
		if !callback(key, value) {
			break
		}
	}
}

func main() {
	mapInstance := NewAdvancedMap[int, int]()
	mapInstance.Set(0, 4)
	mapInstance.Set(1, 10)
	fmt.Println("Entries:", mapInstance.Entries())

	value, exists := mapInstance.Get(1)
	if exists {
		fmt.Println("Value for key 1:", value)
	}

	fmt.Println("Map has key 2:", mapInstance.Has(2))

	mapInstance.Delete(1)
	fmt.Println("Entries after deleting key 1:", mapInstance.Entries())

	mapInstance.Clear()
	fmt.Println("Entries after clearing map:", mapInstance.Entries())

	fmt.Println("Map size:", mapInstance.Size())
	fmt.Println("Is map empty:", mapInstance.IsEmpty())

	mapInstance.Set(2, 20)
	mapInstance.Set(3, 30)
	fmt.Println("Keys:", mapInstance.Keys())
	fmt.Println("Values:", mapInstance.Values())

	mapInstance.ForEach(func(key int, value int) bool {
		fmt.Printf("Key: %d, Value: %d\n", key, value)
		return true
	})
}