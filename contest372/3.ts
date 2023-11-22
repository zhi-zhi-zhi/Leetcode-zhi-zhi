/**
 * 0x 0000 1100
 * 0x 0000 0101
 * 0x 0000 1111
 *
 * (5 + 8) * (12 - 8)
 * 60 + 8 *(5 - 8)
 * 13 * 4
 * @param a
 * @param b
 * @param n
 */
function maximumXorProduct(c: number, d: number, n: number): number {
  /**
   * 1. a < b
   * (a + 2 ** x) * (b - 2 ** x)
   * ==> a * b + (2**x)*(b-a) - (2**(x*2))
   * ==> a * b + (2**x)*((b-a) - (2**x))
   */
  const module = 1e9 + 7

  let a = BigInt(c)
  let b = BigInt(d)
  // make 'a' is less than b
  if (a > b) {
    const temp = a
    a = b
    b = temp
  }

  /**
   * 0x 0001
   * 0x 0110
   * 0x 0111
   *
   */

  let x = 0
  for (let i = n - 1; i >= 0; i--) {
    const theDigit = BigInt(2 ** i)
    if (
      (a & theDigit) > BigInt(0)
      && ((b & theDigit) > BigInt(0))
    ) {
      continue
    } else if ((a & theDigit) === BigInt(0)
      && ((b & theDigit) === BigInt(0))) {
      x += (2 ** i)
      a += theDigit
      b += theDigit
    } else {
      // a * b + (2**x)*((b-a) - (2**x))
      if ((a & theDigit) === BigInt(0) && ((b - a) - theDigit) > BigInt(0)) {
        a += theDigit
        b -= theDigit

        if (a > b) {
          const temp = a
          a = b
          b = temp
        }
      }
    }
  }

  return Number(((a * b) % BigInt(module)))
}