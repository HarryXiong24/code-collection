package io_manager

type IOManager interface {
	ReadLines() ([]string, error)
	WriteResult(data interface{}) error
}
