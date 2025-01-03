# Inheritance in python
# It is a mechanism for reusing code
# Code which supports classes also supports inheritance

# 'pass' statement can tell the interpreter to pass the empty class and head on to the next line of code

# Example code for inheritance


class carShopping:  # This is the class which we will inherit in other classes and it's methods

    def four_by_four(self):
        print(self.name, "Offroading Yes")

    def sedan(self):
        print(self.name, "No Offroading, street monster!!")

    def hatchback(self):
        print(self.name, "Crazy Hothatch")


class bikeShopping:

    def cruiser(self):
        print(self.name, "Full Tourer Cruise")

    def sportBike(self):
        print(self.name, "Track Beast")


class cars(carShopping):  # This class is inheriting 'carShopping' class
    pass  # Using 'pass' since no specific methods are created in this class


class bikes(bikeShopping):  # This class is inheriting 'bikeShopping' class
    pass  # using 'pass' since no specific methods are created in this class


fortuner = cars()
fortuner.name = "Toyota Fortuner Sigma 4"  # Define the objects and select the method from the inherited class
verna = cars()
verna.name = "Hyundai Verna"
polo = cars()
polo.name = "Volkswagen Polo"

fortuner.four_by_four()  # Call the method from the inherited class
verna.sedan()
polo.hatchback()

ninja = bikes()
ninja.name = "Kawasaki Ninja"
streetBoy = bikes()
streetBoy.name = "Harley Davidson Street Boy"

ninja.sportBike()
streetBoy.cruiser()
