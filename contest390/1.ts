function maximumLengthSubstring(s: string): number {
  let res = 1, start = 0
  const map = {}, map2 = {}

  for (let i = 0; i < s.length; i++) {

    Math.max()
    const newStart = Math.max(start, map2[s[i]] !== undefined ?  (map[s[i]]) + 1 : 0)
    res = Math.max(res, i - newStart + 1)
    if (map2[s[i]] !== undefined) {
      map[i] = map2[s[i]]
      map2[s[i]] = i
    } else if (map[s[i]] !== undefined) {
      map2[s[i]] = i
    } else {
      map[s[i]] = i
    }
    start = newStart
  }

  return res
};