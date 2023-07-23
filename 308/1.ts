function answerQueries(nums: number[], queries: number[]): number[] {
  const n = nums.length;
  const m = queries.length;
  const res = Array(m).fill(0);


  nums.sort((a, b) => a - b);
  const preSum = Array(n).fill(0);
  preSum[0] = nums[0];
  for (let i = 1; i < n; i++)
    preSum[i] = preSum[i - 1] + nums[i];

  for (let i = 0; i < m; i++)
    res[i] = lowerBound(queries[i]);

  return res;


  function lowerBound(target: number, left: number = 0, right: number = preSum.length - 1): number {
    while (left <= right) {
      const mid = left + Math.trunc((right - left) / 2);

      if (preSum[mid] <= target)
        left = mid + 1;
      else
        right = mid - 1;
    }

    return left;
  }
}

console.log(answerQueries([4, 5, 2, 1], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 21]));
