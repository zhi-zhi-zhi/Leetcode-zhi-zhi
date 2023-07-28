function numberOfCuts(n: number): number {
  if (n === 1) return 0

  let res = 0
  const angle = 360 / n
  const arr = []
  for (let i = 0; i < n; i++) {
    arr.push(i * angle)
  }

  const set = new Set()
  arr.forEach(item => {
    // console.log(item, (item % 180).toFixed(5))
    set.add(Number((item % 180).toFixed(2)) % 180)
  })
  return set.size
}

// numberOfCuts(78)