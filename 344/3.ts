function colorTheArray(n: number, queries: number[][]): number[] {
  const m = queries.length;
  const res = Array(m).fill(0);
  const nums = Array(n).fill(0);

  for (let i = 0; i < m; i++) {
    const [index, color] = queries[i];

    // 之前有几个相同
    const preSameCount =
      nums[index] !== 0
        ? (index > 0 ? (nums[index] === nums[index - 1] ? 1 : 0) : 0)
        +
        (index + 1 < n ? (nums[index] === nums[index + 1] ? 1 : 0) : 0)
        : 0;

    // 现在有几个相同
    nums[index] = color;
    const curSameCount =
      (index > 0 ? (nums[index] === nums[index - 1] ? 1 : 0) : 0)
      +
      (index + 1 < n ? (nums[index] === nums[index + 1] ? 1 : 0) : 0);


    res[i] = (i > 0 ? res[i-1] : 0) + (curSameCount - preSameCount)
  }

  return res;
};
