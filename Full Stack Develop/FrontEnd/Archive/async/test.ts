export function* generate() {
  let a = 1;
  console.log(a);
  yield (a = 2);
  console.log(a);
  yield (a = 3);
  console.log(a);
}

let gen = generate();
let res1 = gen.next();
console.log(res1);
let res2 = gen.next();
console.log(res2);
