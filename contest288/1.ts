function largestInteger(num: number): number {
  const numStr = Array.from(String(num), (char) => parseInt(char))
  const odd = []
  const even = []
  const isOdd = Array(numStr.length).fill(false)
  const res = []

  numStr.forEach((digit, index) => {
    if (digit % 2 === 1) {
      odd.push(digit)
      isOdd[index] = true
    } else {
      even.push(digit)
    }
  })

  odd.sort((a, b) => b - a)
  even.sort((a, b) => b - a)
  for (let i = 0, j = 0, k = 0; i < odd.length || j < even.length; k++) {
    if (isOdd[k]) {
      res.push(odd[i])
      i++
    } else {
      res.push(even[j])
      j++
    }
  }

  return parseInt(res.join(''))
}