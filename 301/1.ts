function fillCups(amount: number[]): number {
  let res = 0

  amount.sort((a, b) => a - b)
  let max = amount[2], mid = amount[1], min = amount[0]

  if (max >= mid + min)
    return max

  while (amount[2] > 0) {
    if (amount[1] > 0) {
      amount[2]--
      amount[1]--
    } else {
      amount[2] --
    }

    res++
    amount.sort((a, b) => a - b)
  }

  return res
}
