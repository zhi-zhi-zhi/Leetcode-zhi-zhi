function numberOfSpecialChars(word: string): number {
  let num = 0
  // 记录小写的最后一个位置
  const occur = Array(26).fill(-1)
  // 记录大写的第一个位置
  const never = Array(26).fill(-1)

  for (let i = 0; i < word.length; i++) {
    const char = word[i]
    // 大写
    if ('A' <= char && char <= "Z") {
      if (never[char.charCodeAt(0) - 65] === -1) {
        never[char.charCodeAt(0) - 65] = i
      }
    } else {
      //
      occur[char.charCodeAt(0) - 97] = i
    }
  }

  for (let i = 0; i < 26; i++) {
    if (occur[i] !== -1 && never[i] !== -1 && occur[i] < never[i])
      num++
  }

  return num
};