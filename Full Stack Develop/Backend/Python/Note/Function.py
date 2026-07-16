# Functions in Python
# It is a container that for a few lines of codes that perform a specific task
# Syntax for function - 'def' it stands for define, whenever 'def' is used interpreter will understand that we are defining a function
# By Default Function will return a 'None' Value
# Example for funtions

# Greeting Hello Function


def namaste_function():  # Function Name
    print("Hey There")
    print("Hi There")  # Function Block
    print("Namaste Dude")


# Need to give two line breaks (Recommended)
# namaste_function()                  # Call this function and it will print you the data in it as output

# Parameters in python
# A parameter is the variable listed inside the parenthesis in the function definition
# example of Parameter


def Hello_basic(param1, param2):
    print(f'Hi {param1} {param2}')


Hello_basic(
    "Rahul", "Chandra"
)  # fill the values which needs to be passed in those two parameters

# Keyword Arguments
# Values that, when passed into a function, are identifiable by a specific parameter names.
# keyword argument is preceded by a parameter and the assignment operator, =. Keyword arguments can be likened to dictionaries in that they map a value to keyword
# Keyword arguments are mostly used for numerical values reccomended to use positional arguments for characters

# Return Statement
# this is used to return the result to whoever using the function
# this is used in complex calculations


# Example
def square(number):
    return number * number  # Add return to get tne calculation of this statement


result = square(3)
print(result)
