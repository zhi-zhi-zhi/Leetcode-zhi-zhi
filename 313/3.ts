function minimizeXor(num1: number, num2: number): number {
  let num1BitCount = bitCount(num1)
  let num2BitCount = bitCount(num2)
  const num1BinaryArr = binaryArr(num1)
  const resBinaryArr = [...num1BinaryArr]

  if (num1BitCount === num2BitCount)
    return num1
  else if (num1BitCount > num2BitCount) {
    let count = num1BitCount - num2BitCount
    for (let i = 0; i < 32; i++) {
      if (resBinaryArr[i] === 1) {
        count--
        resBinaryArr[i] = 0

        if (count === 0)
          break
      }
    }
  } else {
    let count = num2BitCount - num1BitCount
    for (let i = 0; i < 32; i++) {
      if (resBinaryArr[i] === 0) {
        count--
        resBinaryArr[i] = 1

        if (count === 0)
          break
      }
    }
  }


  let res = 0
  for (let i = 0; i < 32; i++)
    if (resBinaryArr[i] === 1)
      res += (1 << i)

  return res
}

function bitCount(n: number): number {
  let res = 0

  while (n > 0) {
    res++
    n = n & (n - 1)
  }

  return res
}

function binaryArr(n: number): number[] {
  const res = Array(32).fill(0)

  for (let i = 0; i < 32; i++)
    if ((n & (1 << i)) !== 0)
      res[i] = 1

  return res
}

minimizeXor(1, 12)
