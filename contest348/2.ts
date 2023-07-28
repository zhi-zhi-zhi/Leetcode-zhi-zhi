function semiOrderedPermutation(nums: number[]): number {
  const n = nums.length
  const oneIndex = nums.findIndex(num => num === 1)
  const nIndex = nums.findIndex(num => num === n)

  return (oneIndex - 0) + ((n - 1) - nIndex) - (nIndex > oneIndex ? 0 : 1)
};