// /**
//  * 学习自灵神：https://leetcode.cn/problems/sum-of-total-strength-of-wizards/solution/dan-diao-zhan-qian-zhui-he-de-qian-zhui-d9nki/
//  * @param strength
//  */
// function totalStrength(strength: number[]): number {
//   // 单调栈 + 前缀和的前缀和
//   // 单调栈：记录下标
//   // 前缀和的前缀和：O(1) 时间得出 [L, R] 区间内的子数组的和
//   // 单调栈：一个严格递增，一个递增
//   const n = strength.length
//   const leftStack: number[] = [],
//     rightStack: number[] = [],
//     leftHelper: number[] = Array(n).fill(0),
//     rightHelper: number[] = Array(n).fill(0),
//     preSum: number[] = Array(n+1).fill(0)
//
//   // 前缀和
//   for (let i = 0; i < n; i++)
//     preSum[i+1] = preSum[i] + strength[i]
//
//   // [1, 3, 1, 2]
//   // 单调栈
//   // leftStack[i] 为 [0, i] 中小于 strength[i] 的个数
//   for (let i = 0; i < n; i++) {
//     while (leftCheck(i))
//       leftStack.pop()
//
//     leftHelper[i] = i - (leftStack.length > 0 ? leftStack[leftStack.length - 1] : -1)
//     leftStack.push(i)
//   }
//   // rightStack[i] 为 [i, n - 1] 中小于等于 strength[i] 的个数
//   for (let i = n - 1; i >= 0; i--) {
//     while (rightCheck(i))
//       rightStack.pop()
//
//     rightHelper[i] = (n - i) - (rightStack.length > 0 ? rightStack[rightStack.length - 1] : 0)
//     rightStack.push(i)
//   }
//
//   let res = 0
//   const modulo = 1e9 + 7
//   // 前缀和的前缀和：当前元素作为最小值时，计算 [L, R] 区间的字数组的和
//   for (let i = 0; i < n; i++) {
//     // // 暴力
//     // // left
//     // for (let j = (i + 1) - leftHelper[i]; j <= i; j++) {
//     //   // right
//     //   for (let k = i; k < i + rightHelper[i]; k++) {
//     //     res = (res + (strength[i] * (preSum[k+1] - preSum[j])) % modulo) % modulo
//     //   }
//     // }
//
//     // 前缀和的前缀和
//     res = (res + 1 ) % modulo
//   }
//
//   return res
//
//   function leftCheck(i: number): boolean {
//     return leftStack.length > 0 && strength[i] < strength[leftStack[leftStack.length - 1]]
//   }
//
//   function rightCheck(i: number): boolean {
//     return rightStack.length > 0 && strength[i] <= strength[rightStack[rightStack.length - 1]]
//   }
// }
//
// totalStrength([1, 3, 1, 2])

const BI = BigInt

/**
 * 学习自：https://mp.weixin.qq.com/s/OepSQwrrpegbeODuWi_9kA
 * @param strengths
 */
function totalStrength(strengths: number[]): number {
  // ----------------- 声明 ----------------------
  const strength: bigint[] = strengths.map(num => BigInt(num))
  const module = BigInt(1e9 + 7)
  const n = strength.length
  // preSum[i] 为 strength[0, i-1] 内所有元素的和, i >= 1
  // preSum[0] 为 0
  const preSum: bigint[] = Array(n + 1).fill(BigInt(0))
  // leftTriangle[i] 为以 strength[i] 为结尾的所有子数组的和
  const leftTriangle: bigint[] = Array(n + 2).fill(BigInt(0))
  // rightTriangle[i] 为以 strength[i] 为开头的所有子数组的和
  const rightTriangle: bigint[] = Array(n + 2).fill(BigInt(0))

  // leftStack 为单调递增栈
  // leftHelper[i] 为 strength[i] 左边最前一个**小于等于**该元素的值的位置，左边没有时为 -1
  const leftStack: number[] = []
  const leftHelper: number[] = Array(n).fill(BigInt(0))
  // rightStack 为严格单调递增单调栈
  // rightHelper[i] 为 strength[i] 右边最后一个**小于**该元素的值的位置，右边没有时为 n
  const rightStack: number[] = []
  const rightHelper: number[] = Array(n).fill(BigInt(0))
  let res = BigInt(0)

  // ------------------- 维护：前缀和、前缀和的前缀和、单调栈 --------------
  // 维护 preSum
  for (let i = 0; i < n; i++)
    preSum[i + 1] = (preSum[i] + strength[i]) % module
  preSum.push(preSum[preSum.length - 1])
  // 维护 leftTriangle
  leftTriangle[0] = strength[0]
  for (let i = 1; i < n; i++)
    leftTriangle[i] = (leftTriangle[i - 1] + (strength[i] * BI((i + 1)))) % module
  // 维护 rightTriangle
  rightTriangle[n - 1] = strength[strength.length - 1]
  for (let i = n - 2; i >= 0; i--)
    rightTriangle[i] = (rightTriangle[i + 1] + (strength[i] * BI(n - i))) % module

  // 维护 leftStack
  for (let i = 0; i < n; i++) {
    while (leftStack.length > 0 && strength[i] < strength[Number(leftStack[leftStack.length - 1])])
      leftStack.pop()

    // 维护 leftHelper
    leftHelper[i] = leftStack.length > 0 ? leftStack[leftStack.length - 1] : -1
    leftStack.push(i)
  }

  // 维护 rightStack
  for (let i = n - 1; i >= 0; i--) {
    while (rightStack.length > 0 && strength[i] <= strength[Number(rightStack[rightStack.length - 1])])
      rightStack.pop()

    // 维护 rightHelper
    rightHelper[i] = rightStack.length > 0 ? rightStack[rightStack.length - 1] : n
    rightStack.push(i)
  }

  // ----------------------- 计算 ------------------------
  // 计算当前值作为子数组的最小值时，所有子数组的和
  for (let i = 0; i < n; i++) {
    // 子数组左边所有元素（包括自己）在所有子数组中的和：大三角形 - 小三角形 - 高度 * 前缀和之差
    const leftSubArrSum = (leftTriangle[i]
      - (leftHelper[i] === -1 ? BI(0) : leftTriangle[Number(leftHelper[i])])
      - (BI((leftHelper[i] + 1)) * (preSum[i + 1] - preSum[Number(leftHelper[i]) + 1])) % module) % module


    // 子数组右边所有子数组（包括自己）在所有子数组的和：大三角形 - 小三角形 - 高度 * 前缀和之差
    const rightSubArrSum = (rightTriangle[i]
      - (rightHelper[i] === n ? BI(0) : rightTriangle[rightHelper[i]])
      - (BI((n - rightHelper[i])) * (preSum[rightHelper[i]] - preSum[i])) % module) % module


    // 当前值重复计算值：当前值 * 左边三角形行数 * 右边三角形行数
    const repeatSum = (strength[i] * BI(i - leftHelper[i]) * BI(rightHelper[i] - i)) % module


    // 左三角形 * 右行数 + 右三角形 * 左行数 - 重复计算值
    const totalSubArrSum = ((leftSubArrSum * BI(rightHelper[i] - i) % module)
      + (rightSubArrSum * BI(i - leftHelper[i]) % module)
      - repeatSum + module) % module


    // 所有子数组之和 * 当前值
    res = (res + (strength[i] * totalSubArrSum) % module) % module
  }

  return Number(res)
}

// totalStrength([1, 3, 1, 2])