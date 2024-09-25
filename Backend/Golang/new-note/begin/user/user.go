package user

import (
	"errors"
	"fmt"
	"time"
)

// struct
type User struct {
	firstName string
	lastName  string
	birthDate string
	createdAt time.Time
}

// constructor
func New(firstName string, lastName string, birthDate string) (*User, error) {

	if firstName == "" || lastName == "" || birthDate == "" {
		return nil, errors.New("first name, last name and birthdate are required.")
	}

	return &User{
		firstName: firstName,
		lastName:  lastName,
		birthDate: birthDate,
		createdAt: time.Now(),
	}, nil
}

// struct method
func (u *User) OutputUserDetails() {
	fmt.Println(u.firstName, u.lastName, u.birthDate)
}

// struct method
func (u *User) ClearUserName() {
	u.firstName = ""
	u.lastName = ""
}
