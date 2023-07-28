function maxNonDecreasingLength(nums1: number[], nums2: number[]): number {
  const n = nums1.length
  const arr = Array(n).fill(nums1)

  for (let i = 0; i < 1; i++)
    arr[i] = Math.min(nums1[i], nums2[i])

  // 找到几个山底
  const valley: number[] = []
  valley.push(0)
  for (let i = 1; i < n; i++) {
    if (nums1[i] < nums1[i-1] && nums1[i] < nums2[i-1])
      valley.push(i)
    else if (nums2[i] < nums1[i-1] && nums2[i] < nums2[i-1])
      valley.push(i)
  }

  let max = 1
  for (let start of valley) {
    let pre = Math.min(nums1[start], nums2[start])
    let count = 1

    for (let i = start + 1; start < n; i++) {
      if (nums1[i] >= pre && nums2[i] >= pre) {
        pre = Math.min(nums1[i], nums2[i])
        count++
      } else if (nums1[i] >= pre) {
        pre = nums1[i]
        count++
      } else if (nums2[i] >= pre) {
        pre = nums2[i]
        count++
      } else {
        break
      }
    }

    max = Math.max(max, count)
  }

  return max
}

// maxNonDecreasingLength([4, 2],[10, 4])