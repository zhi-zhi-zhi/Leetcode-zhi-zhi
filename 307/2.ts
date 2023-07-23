function largestPalindromic(num: string): string {
  let map = new Map()
  const numStr = String(num)


  Array.from(numStr, char => parseInt(char))
    .forEach(digit => {
      map.set(digit, (map.get(digit) ?? 0) + 1)
  })

  let res = Array(numStr.length).fill(-1)
  for (let i = 0; i < (numStr.length / 2); i++) {
    let digit = -1
    for (const entry of Array.from(map.entries())) {
      if (entry[1] > 1 && entry[0] > digit)
        digit = entry[0]
    }


    if (digit !== -1) {
      // 回文
      res[i] = res[numStr.length-1-i] = digit
      map.set(digit, (map.get(digit)!) - 2)
    } else {
      // 单个
      for (const entry of Array.from(map.entries())) {
        if (entry[1] > 0 && entry[0] > digit)
          digit = entry[0]
      }
      res[i] = digit
      map.set(digit, (map.get(digit)!) - 1)
      break
    }
  }

  let xx = res.filter(value => value !== -1)

  // 去除前导0
  while (xx.length > 1 && xx[0] === 0 && xx[xx.length-1] === 0) {
    xx.shift()
    xx.pop()
  }

  return xx.join('') || '0'
}
