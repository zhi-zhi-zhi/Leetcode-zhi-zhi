function sumOfTheDigitsOfHarshadNumber(x: number): number {
  let sum = 0
  let y = x
  while (y) {
    sum += y % 10
    y = Math.floor(y / 10)
  }

  return x % sum === 0 ? sum : -1
};