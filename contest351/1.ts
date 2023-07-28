function countBeautifulPairs(nums: number[]): number {
  const helpNums = nums.map(num => {
    const b = num % 10
    return [getFirstNum(num), b]
  })

  let count = 0

  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (gcd(helpNums[i][0], helpNums[j][1]) === 1) count++
    }
  }

  return count
};

function getFirstNum(num: number) {
  if (num < 10) return num
  return getFirstNum(Math.floor(num / 10))
}

function gcd(a: number, b: number): number {
  if (a % b === 0)
    return b
  else
    return gcd(b, a % b)
}

// console.log(countBeautifulPairs([11,21,12]))