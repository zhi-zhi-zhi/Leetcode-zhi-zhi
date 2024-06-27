class Trie {
  sons: Record<string, Trie>
  // 这里将 (长度, 下标) 对用一个整数表示，
  val: number


  constructor() {
    this.sons = {}
    // 由于长度不超过 5000，索引不超过 10^4，
    // 因此不会发生碰撞，也不会超过 10^9
    this.val = 10 ** 9
  }

  insert(word: string, val: number): void {
    let node: any = this
    for (let i = 0; i < word.length; i++) {
      const char = word[i]
      if (val < node.val)
        node.val = val
      if (!node.sons[char]) {
        node.sons[char] = new Trie()
      }

      node = node.sons[char]
    }
    if (val < node.val)
      node.val = val
  }

  search(word: string): number {
    let node: any = this
    for (let i = 0; i < word.length; i++) {
      const char = word[i]

      if (!node.sons[char]) break

      node = node.sons[char]
    }

    return node.val % 100000
  }

  startsWith(prefix: string): boolean {
    let node: any = this

    for (const char of prefix) {
      if (!node.sons[char]) return false

      node = node.sons[char]
    }

    return true
  }
}


function stringIndices(wordsContainer: string[], wordsQuery: string[]): number[] {
  const t = new Trie()

  for (let i = 0; i < wordsContainer.length; i++) {
    const w = wordsContainer[i]
    t.insert(w.split('').reverse().join(''), w.length * 100000 + i)
  }

  const res = []
  for (const w of wordsQuery) {
    res.push(t.search(w.split('').reverse().join('')))
  }

  return res
};