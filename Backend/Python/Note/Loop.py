# Nested Loops
# Nested Loops means adding one loop inside another loop

# Syntax example of nested Loops

print("Here are your coordinates")
for x in range(4):  # Outer Loop
    for y in range(5):  # First Inner loop
        for z in range(6):  # Second Inner Loop
            print(f'({x}, {y}, {z})')

# Loops will work from outer loop to inner loops
# it will occur iteration wise

# Code to write letter 'R'

print('xxxx')
print('x  x')
print('xxxx')
print('x')
print('x x')
print('x  x')

# Write letter 'R' using Nested Loop

numbers = [4, 4, 4, 1, 3, 4]
for x_count in numbers:
    output = ''
    for count in range(x_count):
        for count2 in range(x_count, 2):
            for count3 in range(x_count):
                for count4 in range(x_count):
                    for count5 in range(x_count, 1):
                        for count6 in range(x_count, 2):
                            output += 'x'
    print(output)

str = ""
for Row in range(0, 7):
    for Col in range(0, 7):
        if (Col == 1 or ((Row == 0 or Row == 3) and Col > 1 and Col < 5)
                or (Col == 5 and Row != 0 and Row < 3)
                or (Col == Row - 1 and Row > 2)):
            str = str + "*"
        else:
            str = str + " "
    str = str + "\n"
print(str)

# Example of Dominos number using nested for loop
for left in range(8):
    for right in range(left, 7):
        print("[" + str(left) + "|" + str(right) + "]", end=" ")
    print()

# Example of team match fixtures
teams = ['Dragons', 'Wolves', 'Pandas', 'Unicorns']
for home_team in teams:
    for away_team in teams:
        if home_team != away_team:
            print(home_team + " vs " + away_team)
