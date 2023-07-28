/**
 * 2 <= nums.length <= 50
 * 1 <= nums[i] <= 106
 * @param nums
 */
function minOperations(nums: number[]): number {
  const n = nums.length
  const oneCount = nums.reduce((count, num) => count += (num === 1 ? 1 : 0), 0)
  if (oneCount > 0) return n - oneCount

  const gcdArr = Array(n - 1).fill(0)

  // 先处理额外情况
  for (let i = 0; i < n - 1; i++) {
    gcdArr[i] = gcd(nums[i], nums[i + 1])
  }
  let preGcdGcd = gcdArr[0]
  if (n === 2 && preGcdGcd > 1) return -1
  for (let i = 1; i < n - 1; i++) {
    preGcdGcd = gcd(preGcdGcd, gcdArr[i])
    if (preGcdGcd === 1) break
    if (i === n - 2) return -1
  }


  // 贪心，先找出 gcd 为 1的
  if (gcdArr.some(curGcd => curGcd === 1)) return n

  // 找到 gcdArr 数组里，gcd(gcdArr[i], gcdArr[j]) === 1 &&  j - i 最小
  // 如果没有 gcd 为 1 的，找 gcdgcd 为 1 的
  let min = 48

  for (let i = 0; i < n - 2; i++) {
    let preGcdGcd = gcdArr[i]
    let count = 1
    for (let j = i + 1; j < n - 1; j++) {
      preGcdGcd = gcd(preGcdGcd, gcdArr[j])
      if (preGcdGcd === 1) {
        break
      } else {
        count++
      }
    }

    if (preGcdGcd === 1) {
      min = Math.min(min, count)
    }
  }

  return n + min
}


function gcd(a: number, b: number): number {
  if (a % b === 0)
    return b
  else
    return gcd(b, a % b)
}

// minOperations([1_000_000, 1_000])
// console.log(minOperations([10, 5, 10, 30, 70, 4, 2, 6, 8, 4]))
// console.log(minOperations([
//   15, 10, 10, 10, 10, 10, 10, 10, 10, 10,
//   10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
//   10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
//   10, 10, 10, 10, 10, 10, 10, 10, 10, 10,
//   10, 10, 10, 10, 10, 10, 10, 10, 10, 12,
// ]))
