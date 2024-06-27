function findPermutationDifference(s: string, t: string): number {
  const array = Array(26).fill(0)

  for (let i = 0; i < s.length; i++) {
    array[s.charCodeAt(i) - 97] = i
  }

  let res = 0
  for (let i = 0; i < t.length; i++) {
    const code = t.charCodeAt(i) - 97
    res += Math.abs(i - array[code])
  }

  return res
};