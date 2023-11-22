function sumIndicesWithKSetBits(nums: number[], k: number): number {
  return nums.reduce((res, num, index) => res + (bitCount(index) === k ? num : 0) , 0)
};

function bitCount(n: number): number {
  let res = 0

  while (n > 0) {
    res++
    n = n & (n - 1)
  }

  return res
}
