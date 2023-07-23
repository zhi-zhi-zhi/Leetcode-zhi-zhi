function squareFreeSubsets(nums: number[]): number {
  const squareNums = [4, 8, 9, 12, 16, 18, 20, 24, 25, 27, 28]
  const squareSet = new Set(squareNums)
  const arr: number[] = []
  const module = 1e9 + 7

  for (const num of nums) {
    if (squareSet.has(num)) continue
    arr.push(num)
  }

  const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29]

  const n = arr.length
  // dp[i][state]: 使用前 i 个数，组合成状态 state 的组合的个数
  // dp[0][0]: 1 ，初始值
  // dp[i][state]:
  //   1. if nums[i] = 1: dp[i][state] = dp[i-1][state] * 2
  //   2. else if (state(nums[i]) & state) = state(nums[i]): dp[i][state] = dp[i-1][state] + dp[i - 1][state - state(nums[i])]
  //   3. else dp[i][state] = dp[i-1][state]
  const dp = Array.from(Array(n+1), () => Array(2 ** 10).fill(0))
  dp[0][0] = 1

  for (let i = 1; i<= n; i++) {
    const numState = getState(arr[i-1])
    for (let state = 0; state < (1 << 10); state++) {
      if (arr[i-1] === 1) dp[i][state] = (dp[i-1][state] * 2) % module
      else if ((numState & state) === numState) dp[i][state] = (dp[i-1][state] + dp[i-1][state - numState]) % module
      else dp[i][state] = dp[i-1][state]
    }
  }

  return dp[n].reduce((res, count) => (res + count) % module, 0)


  function getState(num: number): number {
    let res = 0;

    for (let i = 0; i < primes.length; i++) {
      if (num % primes[i] === 0) {
        res |= (1 << i)
      }
    }

    return res
  }
};

console.log(squareFreeSubsets([3,4,4,5]));
