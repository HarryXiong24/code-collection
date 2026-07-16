export function KMPSearch(text: string, pattern: string): number {
  if (pattern.length === 0) {
    return 0;
  }

  const findLSP = (pattern: string) => {
    const lsp = new Array(pattern.length).fill(0);
    let j = 0;
    lsp[0] = 0;

    for (let i = 1; i < pattern.length; i++) {
      while (j > 0 && pattern[i] !== pattern[j]) {
        j = lsp[j - 1];
      }
      if (pattern[i] === pattern[j]) {
        j++;
      }
      lsp[i] = j;
    }

    return lsp;
  };

  const lsp = findLSP(pattern);
  let j = 0;

  for (let i = 0; i < text.length; i++) {
    while (j > 0 && text[i] !== pattern[j]) {
      j = lsp[j - 1];
    }
    if (text[i] === pattern[j]) {
      if (j === pattern.length - 1) {
        return i - j;
      }
      j++;
    }
  }

  return -1;
}

// test
const res = KMPSearch('AABABABABC', 'ABABC');
console.log(res);
