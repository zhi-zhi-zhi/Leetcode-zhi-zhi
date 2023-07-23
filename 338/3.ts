function minOperations(nums: number[], queries: number[]): number[] {
  nums.sort((a, b) => a - b);

  const preSum = Array(nums.length + 1).fill(0);

  for (let i = 0; i < nums.length; i++) {
    preSum[i + 1] = preSum[i] + nums[i];
  }

  let res = Array(queries.length).fill(0);

  let i = 0;
  const xx: number[][] = queries
    .map((query, index) => [query, index])
    .sort((a, b) => a[0] - b[0]);
  for (const item of xx) {
    const [query, index] = item;
    while (i < nums.length && query > nums[i])
      i++;

    const largeOrEqual = nums.length - i;
    const less = i;
    res[index] = (preSum[nums.length] - preSum[i] - query * largeOrEqual)
      + (query * less - preSum[i]);
  }


  return res;
};


// minOperations([3, 1, 6, 8], [0,1, 5]);
