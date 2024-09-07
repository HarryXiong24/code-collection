export function ques3(message: string, n: number) {
  const template: string[] = [
    'b',
    'c',
    'd',
    'f',
    'g',
    'h',
    'j',
    'k',
    'l',
    'm',
    'n',
    'p',
    'q',
    'r',
    's',
    't',
    'v',
    'w',
    'x',
    'y',
    'z',
  ];

  const str = message.split('');
  const consonants: number[] = [];
  str.forEach((item, index) => {
    if (template.includes(item.toLowerCase())) {
      consonants.push(index);
    }
  });

  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (consonants.includes(i)) {
      count++;
    }

    if (count === 3) {
      const isLower = template.indexOf(str[i]) !== -1;
      const pre_index = template.indexOf(str[i].toLowerCase());
      const cur_index = (pre_index + 1) % template.length;

      if (isLower) {
        str[i] = template[cur_index];
      } else {
        str[i] = template[cur_index].toUpperCase();
      }

      count = 0;
    }
  }

  return str.join('');
}

// test
const res = ques3('CodeSignal', 3);
console.log(res); // CodeTignam
