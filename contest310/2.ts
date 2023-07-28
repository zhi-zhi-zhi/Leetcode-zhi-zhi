function partitionString(s: string): number {
  let res = 0

  for (let i = 0; i < s.length;) {
    const cur = Array(26).fill(false)

    let j = i
    for (; j < s.length; j++) {
      const code = s.charCodeAt(j) - 97

      if (cur[code]) {
        break
      }

      cur[code] = true
    }

    if (j < s.length) {
      res++
      i = j
    } else {
      res++
      break
    }
  }

  return res
}

console.log(partitionString('abacaba'))