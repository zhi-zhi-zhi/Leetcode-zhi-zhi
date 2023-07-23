function vowelStrings(words: string[], queries: number[][]): number[] {
  const n = words.length;
  const preSum = Array(n + 1).fill(0);
  const set = new Set(["a", "e", "i", "o", "u"]);

  for (let i = 0; i < n; i++) {
    const word = words[i];
    const isSatisfied = set.has(word[0]) && set.has(word[word.length - 1]);

    preSum[i + 1] = preSum[i] + (isSatisfied ? 1 : 0);
  }

  const m = queries.length;
  const res = Array(m).fill(0);

  for (let i = 0; i < m; i++) {
    const [left, right] = queries[i];

    res[i] = preSum[right + 1] - preSum[left];
  }

  return res;
};
