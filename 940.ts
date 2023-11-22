// s consists of lowercase English letters.

function distinctSubseqII(s: string): number {
  return distinctSubseqIIV2(s)
}

function distinctSubseqIIV1(s: string): number {
  const module = 1e9 + 7
  const n = s.length
  const dp = Array(n + 1).fill(0)
  dp[0] = 1
  const map = {}

  for (let i = 1; i <= n; i++) {
    const index = map[s[i - 1]]
    dp[i] = ((dp[i - 1] * 2) - (index ? dp[index - 1] : 0)) % module

    map[s[i - 1]] = i
  }

  // console.log(dp)
  return (dp[n] - 1 + module) % module
}

function distinctSubseqIIV2(s: string): number {
  const dp = Array(26).fill(0)
  const module = 1e9 + 7

  for (let i = 0; i < s.length; i++) {
    const num = s.charCodeAt(i) - 97

    let sum = 0
    for (let j = 0; j < 26; j++) {
      sum = (sum + dp[j]) % module
    }

    dp[num] = (sum + 1) % module
  }

  let res = 0
  for (let i = 0; i < 26; i++)
    res = (res + dp[i]) % module

  return res
}

console.log(distinctSubseqII('aba'))