function rearrangeCharacters(s: string, target: string): number {
  const map = new Map<string, number>()

  Array.from(s).forEach(char => {
    map.set(char, (map.get(char) ?? 0) + 1)
  })

  const map2 = new Map<string, number>()
  Array.from(target).forEach(char => {
    map2.set(char, (map2.get(char) ?? 0) + 1)
  })

  let res = 1e10
  Array.from(map2.keys()).forEach(char => {
    res = Math.min(res, Math.trunc(((map.get(char) ?? 0) / map2.get(char))))
  })

  return res === 1e10 ? 0 : res
}