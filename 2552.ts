function countQuadruplets(nums: number[]): number {
  const n = nums.length
  let res = 0

  const preLow = Array.from(Array(n + 2), () => Array(n + 1).fill(0))
  for (let i = 1; i <= n; i++) {
    for (let val = 1; val <= n; val++) {
      if (nums[i-1] < val) {
        preLow[i][val] = preLow[i-1][val] + 1
      } else {
        preLow[i][val] = preLow[i-1][val]
      }
    }
  }

  const postGreat = Array.from(Array(n + 2), () => Array(n + 1).fill(0))
  for (let i = n; i > 0; i--) {
    for (let val = 1; val <= n; val++) {
      if (nums[i-1] > val) {
        postGreat[i][val] = postGreat[i+1][val] + 1
      } else {
        postGreat[i][val] = postGreat[i+1][val]
      }
    }
  }

  for (let i = 1; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (nums[i] > nums[j]) {
        res += (preLow[i][nums[j]]) * postGreat[j+1][nums[i]]
      }
    }
  }

  return res
};

