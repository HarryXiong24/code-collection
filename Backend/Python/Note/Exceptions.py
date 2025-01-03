# Exceptions in Python
# An Exception is an event, which occurs during the execution of a program that disrupts the normal flow of the program's instructions.
# In General, when a python script encounters a sitaution that it cannot cope with,it raises an exception
# An Exception is a python object that represents an error

# Example

try:
    age = input(('Age: '))  # with 'try' the code wont be end abruptly
    income = 25000
    risk = income / age
    print('Printed age is '
          f'{age}')
    print('Risk is '
          f'{risk}')
except ZeroDivisionError:  # 'ZeroDivisionError' is a type which comes if you enter zero in value in a division operation
    print("Age cannot be zero!!!")
except ValueError:
    print("Wrong value!!!")
