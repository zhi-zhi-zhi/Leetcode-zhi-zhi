function largestCombination(candidates: number[]): number {
  const arr = Array(33).fill(0)

  candidates.forEach(num => {
    for (let i = 0; i < 30; i++) {
      if ((num & (1 << i)) > 0)
        arr[i]++
    }
  })

  return Math.max(...arr)
};