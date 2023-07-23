interface Trie {
  node: string;
  count: number;
  next: Record<string, Trie>
}

function sumPrefixScores(words: string[]): number[] {
  const map = new Map();
  const n = words.length
  const res = Array(n).fill(0)

  for (let i = 0; i < words.length; i++) {
    dfs(i, 0, undefined)
  }

  for (let i = 0; i < words.length; i++) {
    const word = words[i]
    res[i] = countDfs(word, 0, map.get(word[0]))
  }

  return res


  function dfs(wordI: number, i: number, trie: Trie | undefined) {
    if (i >= words[wordI].length)
      return;

    if (trie === undefined) {
      const curTrie = map.get(words[wordI][i]) ?? {
        node: words[wordI][i],
        count: 0,
        next: {}
      };
      curTrie.count++
      map.set(words[wordI][i], curTrie);
      dfs(wordI, i + 1, curTrie)
    } else {
      // @ts-ignore
      const curTrie = trie.next[words[wordI][i]] ?? {
        node: words[wordI][i],
        count: 0,
        next: {}
      }
      curTrie.count++
      // @ts-ignore
      trie.next[words[wordI][i]] = curTrie
      dfs(wordI, i + 1, curTrie)
    }
  }

  function countDfs(word: string, i: number, trie: Trie): number {
    if (i >= word.length)
      return 0
    return trie.count + countDfs(word, i + 1, trie.next[word[i+1]])
  }
}


// console.log(sumPrefixScores(["abc","ab","bc","b"]));
