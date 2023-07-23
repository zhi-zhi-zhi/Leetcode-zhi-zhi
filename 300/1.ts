function decodeMessage(key: string, message: string): string {
  const set = new Set<string>()
  const map = new Map<string, string>()

  let i = 0
  for (const char of key) {
    if (char === ' ')
      continue
    if (map.has(char))
      continue
    map.set(char, String.fromCharCode(97 + i))
    i++
  }
  map.set(" ", " ")

  return Array.from(message, char => map.get(char)).join('')
};

console.log(decodeMessage("the quick brown fox jumps over the lazy dog"
  ,"vkbs bs t suepuv"));
