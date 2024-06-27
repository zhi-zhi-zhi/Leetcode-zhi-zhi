function minimumPushes(word: string): number {
  const arr = Array.from(word).map(char => char.charCodeAt(0) - 97)
  const countArr = Array(26).fill(0)
  for (const code of arr)
    countArr[code]++
  countArr.sort((a, b) =>  b - a)

  let res = 0
  for (let i = 0; i < 8; i++)
    res += countArr[i]
  for (let i = 8; i < 16; i++)
    res += countArr[i] * 2
  for (let i = 16; i < 24; i++)
    res += countArr[i] * 3
  for (let i = 24; i < 26; i++)
    res += countArr[i] * 4

  return res
};