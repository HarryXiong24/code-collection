class ByteTokenizer {
  tokenAlphabet: string[];
  tokenToId: Map<string, number>;

  constructor() {
    this.tokenAlphabet = [];
    this.tokenToId = new Map();

    // 0–255: single-byte tokens
    for (let i = 0; i < 256; i++) {
      this.tokenAlphabet.push(String.fromCharCode(i));
    }

    for (let i = 0; i < this.tokenAlphabet.length; i++) {
      this.tokenToId.set(this.tokenAlphabet[i], i);
    }
  }

  // NOTE: DO NOT CHANGE ANY CODE IN slow_tokenize.
  slowTokenize(text: string): number[] {
    // STEP 1: each character is a token
    let tokenIds: number[] = [];

    for (let i = 0; i < text.length; i++) {
      tokenIds.push(text.charCodeAt(i));
    }

    console.log('tokenIds', tokenIds);

    // STEP 2: merge multi-byte tokens
    for (let curTokenId = 256; curTokenId < this.tokenAlphabet.length; curTokenId++) {
      const curToken: string = this.tokenAlphabet[curTokenId];

      const pairsToMerge = new Set<string>();

      console.log('curToken.length', curToken.length);

      for (let split = 1; split < curToken.length; split++) {
        const left = curToken.slice(0, split);
        const right = curToken.slice(split);

        const leftId = this.tokenToId.get(left);
        const rightId = this.tokenToId.get(right);

        if (leftId !== undefined && rightId !== undefined) {
          pairsToMerge.add(`${leftId},${rightId}`);
        }
      }

      const newTokenIds: number[] = [];
      let i = 0;

      while (i < tokenIds.length) {
        if (i < tokenIds.length - 1 && pairsToMerge.has(`${tokenIds[i]},${tokenIds[i + 1]}`)) {
          newTokenIds.push(curTokenId);
          i += 2;
        } else {
          newTokenIds.push(tokenIds[i]);
          i += 1;
        }
      }

      tokenIds = newTokenIds;
    }

    return tokenIds;
  }
}

// test
const byteTokenizer = new ByteTokenizer();
console.log(byteTokenizer.tokenAlphabet);
console.log(byteTokenizer.tokenToId);

const res = byteTokenizer.slowTokenize('hello');
console.log(res);
