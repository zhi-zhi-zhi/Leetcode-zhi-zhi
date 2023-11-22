function minOperations(s1: string, s2: string, x: number): number {
  const n = s1.length

  let diffCount = 0
  for (let i = 0; i < n; i++)
    if (s1[i] !== s2[i]) diffCount++
  if (diffCount % 2 === 1) return -1
};