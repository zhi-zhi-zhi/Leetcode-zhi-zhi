function closetTarget(words: string[], target: string, startIndex: number): number {
  let res = 1e10;
  const n = words.length;

  for (let i = 0; i < n; i++) {
    if (words[(startIndex + i) % n] === target) {
      res = Math.min(res, i);
    }

    if (words[(startIndex - i + n) % n] === target) {
      res = Math.min(res, i);
    }
  }

  return res === 1e10 ? -1 : res;
};
