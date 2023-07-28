function beautifulPartitions(s: string, k: number, minLength: number): number {
  const M = 1e9 + 7
  // 找到子数组满足：每个子字符串的第一个字符都是一个 质数 数字，最后一个字符都是一个 非质数 数字。质数数字为 '2' ，'3' ，'5' 和 '7' ，剩下的都是非质数数字。
  // 的个数
  // 然后排列组合
};


/*
Using n numbers to construct a permutations
A(n, m) = n!/(n-m)!

Using n numbers to construct m permutations
dp[i][j]: the number of ways that we can use i numbers to construct j permutations

1. if i-th element is for a new permutation
  dp[i][j] = dp[i-1][j-1]
2. if i-th element to previous j permutations
  dp[i][j] = dp[i-1][j] * (i-1 + j)
 */