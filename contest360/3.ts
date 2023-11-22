/**
 * 1 <= nums.length <= 1000
 * 1 <= nums[i] <= 2^30
 * nums 只包含非负整数，且均为 2 的幂。
 * 1 <= target < 2^31
 *
 * ex: [2, 32] 7
 * [1, 1, 32]
 * [1, 1, 16 16]
 * [1, 1, 16, 8, 8]
 * [1, 1, 16, 8, 4, 4]
 * [1, 1, 16, 8, 4, 2, 2]
 *
 * @param nums
 * @param target
 */
function minOperations(nums: number[], target: number): number {
  const sum = nums.reduce((res, num) => res + num, 0)

  if (sum < target) return -1
  if (sum === target) return 0

  // 贪心：从低位往高位，把第 i 个 1 搞定
  const targetArr = Array.from(target.toString(2)).map(item => Number(item))
  while (targetArr.length < 31) targetArr.unshift(0)

  const curBinaryArr = Array(31).fill(0)

  for (const num of nums) {
    for (let i = 0; i < 31; i++) {
      if ((num & (1 << i)) !== 0)
        curBinaryArr[30 - i]++
    }
  }

  // 开贪
  let res = 0

  for (let i = 30; i >= 0; i--) {
    if (targetArr[i] > 0) wo_tan(30 - i)
  }


  return res


  function wo_tan(exponent: number) {
    if (curBinaryArr[30 - exponent] > 0) {
      // 把这一个用了，不再管
      curBinaryArr[30 - exponent]--
      return
    }

    // 从小的往大的凑，如果能凑到，就很好
    const temp = [...curBinaryArr]
    let need = 2
    for (let i = exponent - 1; i >= 0; i--) {
      if (curBinaryArr[30 -i] >= need) {
        curBinaryArr[30 -i] -= need
        // 凑到了
        return
      } else {
        need -= curBinaryArr[30 -i]
        curBinaryArr[30 -i] = 0
        need = need << 1
      }
    }
    // 复原
    curBinaryArr.splice(0, curBinaryArr.length, ...temp)

    // 找到对应的位置
    let index = -1
    for (let i = exponent + 1; i < 31; i++) {
      if (curBinaryArr[30 - i] > 0) {
        index = i
        break
      }
    }

    // 从大的往小的干
    // res += index - exponent
    // curBinaryArr[30 - exponent] += 2
    // for (let i = exponent + 1; i < index; i++) {
    //   curBinaryArr[30 - i]++
    // }

    if (index === -1) {
      // 从小的往大的凑
    } else {
      // 从大的往小的干
      res += index - exponent
      curBinaryArr[30 - index]--
      for (let i = exponent; i < index; i++) {
        curBinaryArr[30 - i]++
      }
    }
  }
}
