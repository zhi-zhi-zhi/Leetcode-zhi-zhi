function removeAnagrams(words: string[]): string[] {
  const n = words.length
  const hashArr = Array(n).fill(-1)

  words.forEach((word, i) => {
    let hash = 0
    Array.from(word, char => char.charCodeAt(0) - 96)
      .forEach((num,) => {
        hash += num * 27
      })

    hashArr[i] = hash
  })

  const res: string[] = [words[0]]
  let pre =  Array.from(words[0]).sort().join('')
  for (let i = 0; i < n; i++) {
    const str = Array.from(words[i]).sort().join('')
    if (str === pre)
      continue

    pre = str
    res.push(words[i])
  }

  return res
}

// removeAnagrams(["meh","iqfgmpec","qefigmpc","jawtcmf","fdkbqb"])