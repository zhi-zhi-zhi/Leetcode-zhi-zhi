/**
 * 100 1
 * 98 10
 * 96 10 * 9 + 10 * 10
 * 94 10 * 10
 * 92 10 * 9 * 10 + 10 * 9 + 5
 * 90 0 + 10 * 9 * 10 + 5 * 10
 * ...
 * 60 1
 * ...
 * 16
 * <= 14 1
 *
 *
 * n: 2 * x + 2 * y + 8 * z
 * 0 <= n <= 100
 * @param n
 * @return C((10-x), 10) * C((10-y), 10) * C((10-z), 5)
 *
 * 1. x < 7, y = 0, z = 0
 * 2. x = 7
 */
function f(n: number): number {
  // n: 2 * x + 2 * y + 8 * x
  if (n <= 14)
    return 10 * 9 * 8

  let count = 0
  for (let x = 0; x <= 10; x++) {
    if (2 * x === n)
      count += C(x, Math.min(10, x + 3))

    if (x >= 7) {
      for (let y = 1; y <= 10; y++) {
        const xFac = C(x, 10)

        if (2 * x + 4 * y === n) {
          count += C(x, Math.min(10, x + 3)) + 1
            + C(x, Math.min(10, x + 2)) + C(y, Math.min(10, y + 1))
            + C(x, Math.min(10, x + 1)) + C(y, Math.min(10, y + 2))
            + 1 + C(y, Math.min(10, y + 3))
        }

        if (x + y >= 17) {
          for (let z = 1; z <= 5; z++) {
            const yFac = C(y, 10)

            if (2 * x + 4 * y + 8 * z === n) {
              for (let k = 0; k <= 3 - (10 - x) - (10 - y) && z + k <= 5; k++)
                count += xFac * yFac * C(k, z + k)

              // count += C(x, Math.min(10, x + 3)) + 1 + 1
              //   + C(x, Math.min(10, x + 2)) + C(y, Math.min(10, y + 1)) + 1
              //   + C(x, Math.min(10, x + 2)) + 1 + C(z, Math.min(5, z + 1))
              //   + C(x, Math.min(10, x + 1)) + C(y, Math.min(10, y + 2)) + 1
              //   + C(x, Math.min(10, x + 1)) + 1 + C(z, Math.min(5, z + 2))
              //   + C(x, Math.min(10, x + 1)) + C(y, Math.min(10, y + 1)) + C(z, Math.min(5, z + 1))
              //   + 1 + C(y, Math.min(10, y + 3)) + 1
              //   + 1 + C(y, Math.min(10, y + 2)) + C(z, Math.min(5, z + 1))
              //   + 1 + C(y, Math.min(10, y + 1)) + C(z, Math.min(5, z + 2))
              //   + 1 + 1 + C(z, Math.min(5, z + 3))
            }
          }
        }
      }
    }
  }

  console.log(count)
  return count

  function C(upper: number, under: number) {
    return factorial(under) / (factorial(upper) * factorial(under - upper))
  }

  function factorial(number: number): number {
    if (number === 0 || number === 1)
      return 1
    return number * factorial(number - 1)
  }
}

// f(100)
// f(98)
// f(96)
f(94)
// f(92)
// f(90)