const arr = [1, 2, 3, 4];

for (let item of arr) {
  if (item === 3) {
    console.log('Break');
    break;
  }
  console.log(item);
}
