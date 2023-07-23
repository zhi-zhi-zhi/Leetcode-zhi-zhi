function findSubstring(s: string, words: string[]): number[] {
  const wL = words[0].length
  const wN = words.length
  const wM = new Map()

  words.forEach((word) => {
    wM.set(word, (wM.get(word) ?? 0) + 1)
  })

  const rM = new Map()
  let count = 0
  let res = []

  for (let i = 0, j = 0; i < s.length; i += wL) {
    const w = s.substring(i, i + wL)
    rM.set(w, (rM.get(w) ?? 0) + 1)
    count++

    while (rM.get(w) > (wM.get(w) ?? 0)) {
      const wD = s.substring(j, j + wL)
      rM.set(wD, rM.get(wD) - 1)
      j += wL
      count--
    }

    if (count === wN)
      res.push(i - (wN - 1) * wL)
  }

  return res
};

findSubstring("lingmindraboofooowingdingbarrwingmonkeypoundcake",["fooo","barr","wing","ding","wing"])
