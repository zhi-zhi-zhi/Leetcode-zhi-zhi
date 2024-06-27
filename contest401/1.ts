function minimumChairs(s: string): number {
  let max = 0
  let count = 0

  for (const char of s) {
    if (char === 'E') {
      count++
    } else {
      count--
    }

    max = Math.max(max, count)
  }

  return max
};