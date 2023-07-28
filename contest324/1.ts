function similarPairs(words: string[]): number {
  const map = new Map<number, number>()

  for (const word of words) {
    let key = 0

    for (let i = 0; i < word.length; i++) {
      key = key | (1 << (word.charCodeAt(i) - 97))
    }

    map.set(key, (map.get(key) ?? 0) + 1)
  }

  let res = 0
  for (const [key, count] of Array.from(map.entries())) {
    res += count * (count - 1) / 2
  }

  return res
}