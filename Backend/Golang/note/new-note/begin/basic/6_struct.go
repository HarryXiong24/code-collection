package basic

import (
	"fmt"

	"demo.com/user"
)

func StructDemo() {
	firstName := getUserData("Please enter your first name: ")
	lastName := getUserData("Please enter your last name: ")
	birthDate := getUserData("Please enter your birthdate (MM/DD/YYYY): ")

	// ... do something awesome with that gathered data!

	// var appUser *user
	appUser, err := user.New(firstName, lastName, birthDate)

	if err != nil {
		fmt.Println(err)
		return
	}

	appUser.OutputUserDetails()
	appUser.ClearUserName()
	appUser.OutputUserDetails()

	admin := user.NewAdmin("test@example.com", "test123", appUser)

	admin.User.OutputUserDetails()
	admin.User.ClearUserName()
	admin.User.OutputUserDetails()
}

func getUserData(promptText string) string {
	fmt.Print(promptText)
	var value string
	fmt.Scan(&value)
	return value
}
