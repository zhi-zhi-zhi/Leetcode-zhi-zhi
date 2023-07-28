function maximumBags(capacity: number[], rocks: number[], additionalRocks: number): number {
  const n = capacity.length
  for (let i = 0; i < n; i++)
    capacity[i] -= rocks[i]

  capacity.sort((a, b) => a - b)

  let res = 0
  let leftRocks = additionalRocks
  for (let i = 0; i < n && leftRocks >= capacity[i]; i++) {
    res++
    leftRocks -= capacity[i]
  }

  return res
}