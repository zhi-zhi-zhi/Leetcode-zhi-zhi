function digitSum(s: string, k: number): string {
  let newStr = s

  while (newStr.length > k) {
    let tempStr = ''
    let temp = 0

    for (let i = 0; i < newStr.length; i += k) {
      temp = 0
      for (let j = i; j < i + k && j < newStr.length; j++)
        temp += parseInt(newStr[j])

      tempStr += `${temp}`
    }

    newStr = tempStr
  }

  return newStr
}

// digitSum('11111222223', 3)