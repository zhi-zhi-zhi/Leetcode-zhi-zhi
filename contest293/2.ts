function maxConsecutive(bottom: number, top: number, special: number[]): number {
  special.sort((a, b) => a - b)
  special.unshift(bottom - 1)
  special.push(top + 1)

  let max = 0
  for (let i = 0; i < special.length - 1; i++)
    max = Math.max(max, special[i+1]-special[i]-1)

  return max
};

maxConsecutive(2, 9, [4,6])