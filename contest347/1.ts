function removeTrailingZeros(num: string): string {
  const arr = Array.from(num)

  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] !== '0') break
    arr.pop()
  }

  return arr.join('')
}

// console.log(removeTrailingZeros("51230100"))
// console.log(removeTrailingZeros("123"))