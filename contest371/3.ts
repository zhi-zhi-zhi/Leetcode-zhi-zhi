function minOperations(nums1: number[], nums2: number[]): number {
  // 1. 结尾不换
  // 2. 结尾换

  let res = -1
  const n = nums1.length
  if (nums1[n-1] > nums2[n-1]) {
    const temp = nums1
    nums1 = nums2
    nums2 = temp
  }

  let ans1 = tryATry(nums1, nums2)
  const temp = nums1[n-1]
  nums1[n-1] = nums2[n-1]
  nums2[n-1]=temp
  let ans2 = tryATry(nums2, nums1)

  if (ans2 === -1) return ans1
  if (ans1 === -1) return ans2 + 1

  return Math.min(ans1, ans2 + 1)

  function tryATry(nums1: number[], nums2: number[]): number {
    let count = 0
    for (let i = 0; i < n - 1; i++) {
      if (nums1[i] <= nums1[n-1]) {
        if (nums2[i] <= nums2[n-1]) continue
        else return -1
      } else {
        if (nums1[i] <= nums2[n-1] && nums2[i] <= nums1[n-1]) count++
        else return -1
      }
    }
    return count
  }
};

