# Modules in Python
# Modules contains deifinitions and statements for python
# A module can define functions, classes and variables
# Modules also include runnable code

# Example of Modules of Python

import calculatorModule  # We are importing calculatorModule
from calculatorModule import add

x = int(input("Enter First Number - "))
y = int(input("Enter Second Number - "))

answer = add(x, y)
print(answer)

# Generating Random values in Python using built in modules

import random  # random is a built in module

for i in range(6):  # Random value between 0 to 6
    print(
        random.random()
    )  # Using random function will print a random times given range in for loop

# random.randint method will give random values with the range of two gives integers

# random.choice method will give random value picking a value from a list

# Roll the dice program

import random


class Dice:

    def roll(self):
        number1 = random.randint(1, 6)
        number2 = random.randint(1, 6)
        return number1, number2


dice = Dice()
print(dice.roll())
