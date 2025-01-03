# print ("Rahul Chandra")

# Exercise to print Name of the person and which colour he likes

name = input('State your name - ')
colour_name = input('State your favourite colour - ')
print('Your name is ' + name, 'And', 'Your favourite colour is ' + colour_name)

birth_year = input('Birth Year: ')
print(type(birth_year))  # this is used as type conversion
age = 2022 - int(birth_year)  # type will show whether it is string or integer
print(type(age))
print(age)

# type conversion

# Program to ask user his weight in pounds and show it in kilogram

weight_in_pounds = input('Tell us your weight (lbs) - ')
weight_in_kgs = int(weight_in_pounds) * 0.453
result = f'{weight_in_kgs:.2f}'  # use this function to print float values in print()
print('Your Weight is ' + result)

# Program to make a currency converter Dollar to Euro

enter_base_currency = input('State Your Base Currency (INR) - ')
convert_currency = int(enter_base_currency) / 86.93
result = f'{convert_currency:.2f}'
print('Currency in Euro is ' + result)

# Formatted Strings Through formatted strings we will dynamically generate some texts from variables

name1 = 'Rahul'
name2 = 'Chandra'
display = f'{name1} {name2} is here'  # syntax of formatted string
print(display)

# string methods
name = 'Hello how are you there'
print(len(name))  # len function shows how much characters are present
print(name.upper())  # upper method converts in characters in capital letters

# Find Method

name = 'AMG is LIT!!!!!'
print(
    name.find('A')
)  # Here find method will print the location of the character which is passed
print(name.find('M'))
print(name.find('G'))
result1 = f'{name.find("A")}'
result2 = f'{name.find("M")}'
result3 = f'{name.find("G")}'
display = f'{name.find("A")} {name.find("M")} {name.find("G")}'
print('Location of the passed characters are ' + display)

# Strings Summary
# len() this function shows how much characters are present
# upper () converts strings into upper case
# lower () converts strings into lower case
# title method returns a string where the first character in every word is upper case
# find method finds the location of the character
# replace method this replaces the characters
# in operator is a boolean operator which has true or false value
