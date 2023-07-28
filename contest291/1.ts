function removeDigit(number: string, digit: string): string {
  const res = Array.from(number)

  let index = -1, next = -1
  for (let i = 0; i < number.length - 1; i++) {
    if (number[i] === digit) {
      if (number[i + 1] === digit)
        continue

      if (number[i+1] > digit) {
        return number.substring(0, i) + number.substring(i + 1)
      }

      if (next === -1) {
        index = i
        next = i + 1
      } else if (number[i + 1] > number[next]) {
        index = i
        next = i + 1
      }
    }
  }

  if (number[number.length - 1] === digit) {
    if (next === -1) {
      index = number.length - 1
    } else if (digit > number[next]) {
      index = number.length - 1
    }
  }


  if (next === -1) {
    res.splice(index, 1)
  } else {
    if (number[next] < digit) {
      res.splice(number.lastIndexOf(digit), 1)
    } else {
      res.splice(index, 1)
    }
  }
  return res.join('')
}

console.log(removeDigit('3619552534', '5'))
console.log(removeDigit('5653545', '5'))
console.log(removeDigit('868784', '8'))
console.log(removeDigit('83818584', '8'))
console.log(removeDigit("9245464322", "4"))