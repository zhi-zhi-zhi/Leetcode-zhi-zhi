function maxSum(nums: number[]): number {
  let res = -1
  const help = nums.map((num, index) => [num, `${num}`, index])

  for (let i  = 0; i < 10; i++) {
    const arr = []
    for (const num of nums) {
      if (maxChar(num) === i) {
        arr.push(num)
      }
    }

    if (arr.length <= 1) continue
    arr.sort((a, b) => -(a - b))
    res = Math.max(res, arr[0] + arr[1])
  }

  return res
};

function maxChar(number: number): number {
  const res = 0
  const numStr = `${number}`

  for (let i = 9; i >= 0; i--) {
    if (numStr.includes(`${i}`)) return i
  }

  return 0
}