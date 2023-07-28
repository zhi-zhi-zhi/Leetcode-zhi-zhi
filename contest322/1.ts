function isCircularSentence(sentence: string): boolean {
  const arr = sentence.split(' ')

  let res = true
  for (let i = 0; i < arr.length; i++) {
    const str1 = arr[i]
    const str2 = arr[(i+1) % arr.length]

    res = res && str1[str1.length - 1] === str2[0]
  }

  return res
}