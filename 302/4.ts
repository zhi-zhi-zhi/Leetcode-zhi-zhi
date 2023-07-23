function minOperations(nums: number[], numsDivide: number[]): number {
  nums.sort((a, b) => a - b);
  const xx = ngcd(numsDivide.length - 1);

  if (nums[0] > xx)
    return -1

  let res = -1

  for (let i = 0; i < nums.length; i++) {
    if (xx % nums[i] === 0)
      return i 
  }

  return res

  function ngcd(index: number): number {
    if (index === 0)
      return numsDivide[0];
    else
      return gcd(numsDivide[index], ngcd(index - 1));
  }

  /**
   *
   * @param {number} a a > 0
   * @param {number} b b > 0
   * @returns {number} gcd(a, b)
   */
  function gcd(a: number, b: number): number {
    if (a % b === 0)
      return b;
    return gcd(b, a % b);
  }
}
//
// //
// console.log(minOperations([2,3,2,4,3],[9,6,9,3,15]));
console.log(minOperations([3,2,6,2,35,5,35,2,5,8,7,3,4]
  ,[105,70,70,175,105,105,105]));
