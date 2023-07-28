function minimumCost(s: string): number {
  const n = s.length

  const leftDp = Array(n).fill(0)
  const rightDp = Array(n).fill(0)

  for (let i = 1; i < n; i++)
    leftDp[i] = leftDp[i - 1] + (s[i] === s[i - 1] ? 0 : i)
  for (let i = n - 2; i >= 0; i--)
    rightDp[i] = rightDp[i + 1] + (s[i] === s[i + 1] ? 0 : (n - i - 1))

  let res = Infinity
  for (let i = 0 ; i < n; i++)
    res = Math.min(res, leftDp[i] + rightDp[i])

  return res
}

// console.log(minimumCost("010101"))
// console.log(minimumCost("0011"))