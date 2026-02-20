export function canIWin(n: number): boolean {
  const memo: (boolean | null)[] = new Array(n + 1).fill(null);

  const dfs = (n: number, memo: (boolean | null)[]): boolean => {
    if (n < 0) {
      return false; // check boundary
    }

    if (memo[n] !== null) {
      return memo[n] as boolean;
    }

    let res: boolean = false;
    for (let i = 1; i < 4; i++) {
      if (n >= i) {
        res = res || !dfs(n - i, memo);
        if (res) {
          break;
        }
      }
    }

    memo[n] = res;
    return res;
  };

  return dfs(n, memo);
}
