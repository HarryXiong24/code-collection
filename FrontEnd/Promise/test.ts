let a = 5;

let promise = new Promise((resolve: any, reject: any) => {
  if (a > 0) {
    resolve('success');
  } else {
    reject('error');
  }
})
  .then((value: any) => {
    console.log(value);
    return value;
  })
  .then((value: any) => {
    console.log(value);
  });

console.log(promise);
