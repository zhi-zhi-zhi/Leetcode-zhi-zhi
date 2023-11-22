/**
 * 1 <= num.length <= 100
 * num 仅由数字 '0' 到 '9' 组成
 * num 不含任何前导零
 *
 * @param num
 */
function minimumOperations(num: string): number {
  const n = num.length
  const zeroCount = Array.from(num).filter(char => char === '0').length
  let res = n - zeroCount

  // 找 25、50、75、00
  // 找到第一个 5，从前面找 2、7
  // 找到第一个 0，从前面找 5、0

  let fiveIndex = num.lastIndexOf('5')
  if (fiveIndex !== -1) {
    const twoIndex = num.lastIndexOf('2', fiveIndex)
    if (twoIndex!== -1)
      res = Math.min(res, n - 2 - twoIndex)

    const sevenIndex = num.lastIndexOf('7', fiveIndex)
    if (sevenIndex !== -1)
      res = Math.min(res, n - 2 - sevenIndex)
  }

  let zeroIndex = num.lastIndexOf('0')
  if (zeroIndex !== -1) {
    const fiveIndex = num.lastIndexOf('5', zeroIndex)
    if (fiveIndex!== -1)
      res = Math.min(res, n - 2 - fiveIndex)

    const preZeroIndex = num.lastIndexOf('0', zeroIndex - 1)
    if (preZeroIndex !== -1)
      res = Math.min(res, n - 2 - preZeroIndex)
  }

  return res
};

// console.log(minimumOperations('2245047'))