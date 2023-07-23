function isItPossible(word1: string, word2: string): boolean {
  const count1 = Array(26).fill(0)
  const count2 = Array(26).fill(0)

  for (let i = 0; i < word1.length; i++)
    count1[word1.charCodeAt(i)-97]++
  for (let i = 0; i < word2.length; i++)
    count2[word2.charCodeAt(i)-97]++

  // 两两交换
  for (let i = 0; i < 26; i++) {
    if (count1[i] === 0) continue

    for (let j = 0; j < 26; j++) {
      if (count2[j] === 0) continue

      count1[i]--
      count1[j]++
      count2[i]++
      count2[j]--

      let same = 0

      for (let k = 0; k < 26; k++) {
        if (count1[k] > 0) same++
        if (count2[k] > 0) same--
      }

      if (same === 0)
        return true


      count1[i]++
      count1[j]--
      count2[i]--
      count2[j]++
    }
  }


  return false
};
