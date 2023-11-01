export function KMPSearch(text: string, pattern: string) {
  /* find Long String Prefix */
  const findLSP = (pattern: string): number[] => {
    const lsp = new Array(pattern.length).fill(0);
    let length = 0;
    let i = 1;

    while (i < pattern.length) {
      if (pattern[i] === pattern[length]) {
        length++;
        lsp[i] = length;
        i++;
      } else {
        if (length != 0) {
          length = lsp[length - 1];
        } else {
          length = 0;
          i++;
        }
      }
    }

    return lsp;
  };

  const lsp = findLSP(pattern);
  let i = 0;
  let j = 0;

  /* applying the Long String Prefix to find the pattern one */
  while (i < text.length) {
    if (text[i] === pattern[j]) {
      i++;
      j++;
    } else if (j > 0) {
      j = lsp[j - 1];
    } else {
      i++;
    }

    if (j === pattern.length) {
      return i - j;
    }
  }

  return -1;
}

// test
const res = KMPSearch('AABABABABC', 'ABABC');
console.log(res);
