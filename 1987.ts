function numberOfUniqueGoodSubsequences(binary: string): number {
  return numberOfUniqueGoodSubsequencesV1(binary)
}

function numberOfUniqueGoodSubsequencesV1(binary: string): number {
  const module = 1e9 + 7

  const n = binary.length
  const dp = Array(n + 1).fill(0)

  let start = 0
  while (start < n && binary[start] === '0') start++

  if (start === n) return 1
  dp[start + 1] = 1
  let last0 = 0, last1 = 0

  for (let i = start + 2; i <= n; i++) {
    let j = binary[i - 1] === '0' ? last0 : last1
    dp[i] = (dp[i - 1] * 2 - (j > 0 ? dp[j - 1] : 0) + module) % module

    if (binary[i-1] === '0') last0 = i
    else last1 = i
  }

  return (dp[n] + (binary.includes('0') ? 1 : 0)) % module
}

function numberOfUniqueGoodSubsequencesV2(binary: string): number {
  const module = 1e9 + 7
  let one = 0, zero = 0

  for (const char of binary) {
    if (char === '0') zero = (one + zero) % module
    else one = (one + zero + 1) % module
  }

  return (one + zero + (binary.includes('0') ? 1 : 0)) % module
}
