# Arithmetic Operators
# These are the same arithmetic operators we have in maths we can add, substract, multiply, divide

# Operator Precedence
# It is the order of arithmetic operations
x = 10 + 3 * 2
print(x)

# Order of operator precedence
# Exponentiation 2 ** 3
# Multiplication or division
# Addition or Substraction

x = (10 + 5) * 20 - 3
print(x)

# Math Operations
# abs function returns a positive number, it changes the sign of a negative number
# Python math module contains usable functions to use for complex calculations

# Example
import math

print(math.floor)

# If Statements
# These statements are based on some conditions

# Price of the house if it has good credit cost is 1 million

price = 1000000
good_credit = True
if good_credit:
    down_payment = 0.1 * price
else:
    down_payment = 0.2 * price
print(f"Down Payment will be ${down_payment}")

# Check which is greater

a = input("Enter your first number - ")
b = input("Enter your Second Number - ")

if a > b:
    print(f"{a} is a greater number")
elif b > a:
    print(f"{b} is a greater number")
elif a == b:
    print("Neither is bigger")

# Logical Operators
# we use logical operators when we have multiple conditions
# with LOGICAL AND: operator both conditions should be true
# with LOGICAL OR: operator only of the condition should be true
# NOT: LOGICAL Operator inverses any boolean value given (It will convert true or false)

# Comparison Operators
# We use comparison operators when we need to compare a variable with a value

fill_name = input("Enter your Full name - ")
loc_name = input("Enter your location - ")

if len(fill_name) > 30 and len(loc_name) > 30:
    print("Your Name and location is too long")
elif len(fill_name) <= 2 and len(loc_name) <= 2:
    print("Your name and location is too small")
else:
    print("Your name and location is fine")

for i in range(5):
    print(i)