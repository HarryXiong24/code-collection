# Lists in Python

# Lists store values and we can access it

# 2D Lists
# These are extremely powerful and they have a lot of applications in data science and machine learning
# Prime example is mathematical matrix

matrix = [[1, 2, 3], [4, 5, 6], [
    7, 8, 9
]]  # This is a 2D List, each item in the outer list is in an inner list

print(
    matrix[2][0]
)  # Here 2 is a outer list and 0 is the index position of the number in the inner list

for row in matrix:
    for item in row:
        print(
            item
        )  # Here we can use for loop to get the rows of the matrix in an 'item' variable

# List Methods/List Functions
# these are the operations we can perform on the list

# Example Define list of numbers

numbers = [5, 2, 1, 7, 4]
numbers.append(14)  # Append function adds the object at the end
print(numbers)

numbers.insert(
    3, 6
)  # insert function inserts the object, we need to add the index where we need to add the object then the object
print(numbers)

# pop function removes the object from the list
# index function tells the position of the object
# count function tells the occurence of the object
# copy function copies the list

# Exercise - delete a duplicate value from the list

numbers = [1, 2, 3, 4, 5, 5, 6, 6, 7, 8, 9, 10]
unique = []  # We will make a seperate empty list
for number in numbers:  # apply for loop
    if number not in unique:  # this if condition states that if do not have the value in unique then # # we will need to add it
        unique.append(number)
print(unique)

# Exercise to delete inserted duplicate value from the list

digits = [int(input("Enter the numbers - "))]
print(digits)
digits_2 = []
for number in digits:
    if number not in digits_2:
        digits_2.append(digits)
print(digits_2)

# Tuples in Python
# Tuples are like lists, but they cannot be modified
# Since lists are defined by '[]' , tuples are defined by '()'
# Items in tuples can also be accessed just like lists with 'Square Brackets'
# Example

numbers = (1, 2, 3)
print(numbers[10])

# Unpacking in Python
# Unpacking stores values so that it can use elsewhere easily with less amount of code
# Example

coordinates = (1, 4, 7)
x, y, z = coordinates  # Here values of coordinates are stored in x,y and z so if we want to pick the values in coordinates
# we just need to pick x,y,z
print('Coordinates are '
      f"{x}, {y}, {z}")

# Unpacking can also be used with lists and tuples

# Dictionaries in python
# In Dictionaries we store information which comes in key value pairs
# Example
# Name: Rahul       # Name is key, rahul is value
# Email: rahul@email.com    # Email is key, email id is value

# How to define a dictionary in python

customer = {
    "name": "Rahul Chandra",  # Assign keys and their values in this format
    "Location": "Rajasthan",
    "is_legit": True  # You can also add a boolean in the dictionary
}
customer[
    "name"] = "Nunu Chandra"  # This is how we can update the value in the key / same to add new key and it's value
print(
    customer["name"]
)  # To Print a key and it's value wirte the dictionary name and the key which you need

# .get method doesn't throw an error when a key is not found
# example - print(customer.get("Place"))

# Dictionary Program to convert entered phone number into text

phone = input("Enter the phone number: ")
Number_digit = {
    "0": "Zero",
    "1": "One",
    "2":
    "Two",  # This will be our dictionary to convert the digits into letters
    "3": "Three",
    "4": "Four",
    "5": "Five",
    "6": "Six",
    "7": "Seven",
    "8": "Eight",
    "9": "Nine",
    "10": "Ten"
}

output = ""
for dg in phone:
    output += Number_digit.get(dg)
print("Entered Digits in words are " + f"{output}")
