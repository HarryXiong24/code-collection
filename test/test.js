function Animal(name) {
  this.name = name;
}

Animal.prototype.walk = function () {
  console.log(this);
  console.log(this.name + " is walking");
};

let monkey = new Animal("monkey");
console.log(monkey);
monkey.walk();