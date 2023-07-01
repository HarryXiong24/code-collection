  const map: Map<string, string> = new Map([
    [')', '('],
    [']', '['],
    ['}', '{'],
  ]);
  const stack: string[] = [];

  if (s.length % 2 !== 0) {
    return false;
  }

  for (let i = 0; i < s.length; i++) {
    const current = s[i];
    if (map.has(current)) {
      const value = map.get(current);
      if (value !== stack.pop()!) {
        return false;
      }
    } else {
      stack.push(s[i]);
    }
  }

  return stack.length ? false : true;