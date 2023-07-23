function commonFactors(a: number, b: number): number {
  let res = 0

  const ceil = gcd(a, b)
  for (let i = 1; i <= ceil; i++)
    if (a % i === 0 && b % i === 0)
      res++

  return res
};



/**
 *
 * @param {number} a a > 0
 * @param {number} b b > 0
 * @returns {number} gcd(a, b)
 */
function gcd(a: number, b: number): number {
  if (a % b === 0)
    return b
  return gcd(b, a % b)
}
