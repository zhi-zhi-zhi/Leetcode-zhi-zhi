function subarrayLCM(nums: number[], k: number): number {
  let res = 0

  for (let i = 0; i < nums.length; i++) {
    let mcm = nums[i]
    for (let j = i; j < nums.length && k % nums[j] === 0; j++) {
      mcm = mcm * nums[j] / gcd(mcm, nums[j])

      if (mcm === k)
        res++
    }
  }

  return res
}

function gcd(a: number, b: number): number {
  if (a % b === 0)
    return b
  else
    return gcd(b, a % b)
}
