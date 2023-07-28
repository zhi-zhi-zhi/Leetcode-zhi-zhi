function percentageLetter(s: string, letter: string): number {
  let count = 0
  Array.from(s).forEach(char => {
    if (char === letter)
      count++
  })

  return Math.trunc(count / s.length * 100)
};