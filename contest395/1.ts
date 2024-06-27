function addedInteger(nums1: number[], nums2: number[]): number {
  nums1.sort((a, b) => a - b)
  nums2.sort((a, b) => a - b)

  return nums2[0] - nums1[0]
};