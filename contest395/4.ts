function medianOfUniquenessArray(nums: number[]): number {
  const n = nums.length
  if (n === 1) return 1

  const allSubArraySize = n * (n + 1) / 2
  if (allSubArraySize % 2) {
    return findKthElementInAllDistinctSubArrayCount(Math.floor(allSubArraySize / 2))
  } else {
    return Math.min(findKthElementInAllDistinctSubArrayCount(Math.floor((allSubArraySize - 1) / 2)), findKthElementInAllDistinctSubArrayCount(allSubArraySize / 2))
  }

  // distinct[nums(i...j)] = distinctArr[j+1] - distinctArr[i]


  /**
   * k: [0, ... n-1]
   * @param k
   */
  function findKthElementInAllDistinctSubArrayCount(k: number): number {
    let left = 1, right = nums.length

    while (left <= right) {
      const mid = left + Math.floor((right - left) / 2)
      const count = countDistinctCountLessOrEqualThanK(mid)

      if ((count - 1) === k) {
        return mid
      } else if ((count - 1) > k) {
        right = mid - 1
      } else {
        left = mid + 1
      }
    }

    return left
  }

  function countDistinctCountLessOrEqualThanK(distinctCount: number): number {
    let count = 0
    const map = new Map<number, number>()
    let left = 0, right = 0

    while (right < nums.length) {
      const num = nums[right]

      if (map.has(num)) {
        // size 没有增加
        map.set(num, right)
      } else {
        // size 增加，缩小 left
        map.set(num, right)

        while (map.size > distinctCount) {
          const leftNum = nums[left]
          if (map.get(leftNum) === left) {
            map.delete(leftNum)
          }
          left++
        }
      }

      count += right - left + 1
      right++
    }

    return count
  }
};


// console.log(medianOfUniquenessArray([1, 2, 3]))
// console.log(medianOfUniquenessArray([3, 4, 3, 4, 5]))
// console.log(medianOfUniquenessArray([46,73,46,46,46]))