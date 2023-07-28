function largestGoodInteger(num: string): string {
  const set = new Set()
  let char = undefined
  let count = 0

  for (const digit of num) {
    if (char === undefined) {
      char = digit
      count = 1
    } else {
      if (char === digit) {
        count++

        if (count >= 3)
          set.add(parseInt(char))
      } else {
        count = 1
        char = digit
      }
    }
  }

  if (set.size > 0) {
    return String(Math.max(...Array.from(set.keys()) as number[])).repeat(3)
  } else {
    return ""
  }
};
