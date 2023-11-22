function findMinimumOperations(s1: string, s2: string, s3: string): number {
  if (s1[0] !== s2[0] || s1[0] !== s3[0] || s2[0] !== s3[0]) return -1

  let count = 0
  for (let i = 0; i < Math.min(s1.length, s2.length, s3.length); i++) {
    if (s1[i] === s2[i] && s1[i] === s3[i])
      count++
    else
      break
  }

  return (s1.length + s2.length + s3.length) - 3 * count
};