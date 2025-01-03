# Constructors in Python
# Constructors are generally used for istantiating an object
# Constructors is to initialize values to the data members of the class when an object of the class is created.
# _init_() method is called the constructors and is always called when an object is created

# Syntax of constructor

# def __init__(self)                        # Self is the reference to the current object
# Body of the constructor

# There are two types of constructors
# Default Constructor
# The default constructor is a simple constructor which does not accept any arguments
# Its definition has only one argument which is a reference to the instance being constructed

# Parameterized Constructor
# It is a constructor with parameters
# The parameterized constructor takes its first argument as a reference to the instance being constructed known as self
# and the rest of the arguments are provided

# Syntax example of constructor


class Point:

    def __init__(self, x, y):  # This is how you define a Constructor
        self.x = x
        self.y = y


# Example of Constructor
# Car Name Start and Move Turn and come back


class SigmaFour:  # SigmaFour is the class name

    def __init__(self, car):  # Car is the constructor
        self.car = car

    def start(self):
        print(f'{self.car}', "has started")  # Car Start Method

    def move(self):
        print(f'{self.car}', "has moved")  # Car Moved Method

    def turn(self):
        print(f'{self.car}', "has turned")  # Car Turned Method

    def back(self):
        print(f'{self.car}', "has returned")  # Car Returned Method


vehicle = SigmaFour(
    "Verna SX(O) A/T Crdi")  # Attribute for the methods (Positonal Arguments
vehicle.start()
vehicle.move()
vehicle.turn()
vehicle.back()

# Classes in Python
# A Class is like an object constructor or a blueprint for creating objects

# Example of Class


class PointBlank:  # This is how we define name of classes, we dont use underscore to define class

    def move(self):
        print("Move")

    def draw(self):
        print("Draw")


# Now we will define object

point1 = PointBlank()  # Class our class as a function to define the object
point1.x = 20  # You can define attributes and can print them
point1.y = 30
print(point1.x,
      point1.y)  # You can print with attaching function with attributes
point1.draw()  # You can call your defined methods execute

# We can create another object

point2 = PointBlank()
point2.x = 5  # We Need to define the attributes seperately for newly made object also
point2.y = 10
print(point2.x, point2.y)  # You can call your defined methods to execute
point2.move()