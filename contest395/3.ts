function minEnd(n: number, x: number): number {
  const len = 53
  const binary = x.toString(2)
  const arr = Array(len).fill(false)

  for (let i = 0; i < binary.length; i++) {
    if (binary[i] === '1') {
      arr[(len - 1) - (binary.length - 1 - i)] = true
    }
  }

  const flag = []
  for (let i = len - 1; i >= 0; i--) {
    if (arr[i] === false) {
      flag.push(i)
    }
  }

  const chooseFlag = []
  const nBinary = (n-1).toString(2)
  for (let i = nBinary.length - 1; i >= 0; i--) {
    if (nBinary[i] === '1') {
      chooseFlag.push(flag[(nBinary.length -1 - i)])
    }
  }
  // 55012476815

  for (const digit of chooseFlag) {
    arr[digit] = true
  }

  let res = 0
  for (let i = len - 1; i >= 0; i--) {
    if (arr[i] === true) {
      res = res + (2 ** ((len - 1) - i))
    }
  }

  return res
};


