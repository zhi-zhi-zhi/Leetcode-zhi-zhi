function calculateTax(brackets: number[][], income: number): number {
  const n = brackets.length
  let res = 0
  let preUpper = 0

  for (let i = 0; i < n && income > 0; i++) {
    const [upper, percent] = brackets[i]

    if (income < upper) {
      res += (income - preUpper) * percent
      break
    } else {
      res += (upper - preUpper) * percent
    }

    preUpper = upper
  }

  return res
}