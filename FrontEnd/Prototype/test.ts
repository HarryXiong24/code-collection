function Person(this: any) {
  console.log(this);
}

let person = new (Person as any)();

console.log(Person());

console.log(Person.prototype.constructor);

console.log(person.constructor);
