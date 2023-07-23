function minimumOperations(nums: number[]): number {
  let res = 0;
  const set = new Set(nums)
  set.delete(0)

  return set.size
}
