/**
 * stockPrices[i] = [dayi, pricei]
 * @param stockPrices
 */
function minimumLines(stockPrices: number[][]): number {
  const n = stockPrices.length
  const arr = stockPrices
  if (n === 2)
    return 1
  if (n === 1)
    return 0

  arr.sort((a, b) => a[0] - b[0])

  let res = 1
  let a = arr[1][1] - arr[0][1]
  let b = arr[1][0] - arr[0][0]
  const xx = gcd(a, b)
  a /= xx
  b /= xx
  let preRatio = `${a}_${b}`

  for (let i = 2; i < n; i++) {
    let a = arr[i][1] - arr[i-1][1]
    let b = arr[i][0] - arr[i-1][0]
    const xx = b === 0 ? 1 : gcd(a, b)
    a /= xx
    b /= xx
    let curRatio = `${a}_${b}`

    if (curRatio !== preRatio)
      res++

    preRatio = curRatio
  }

  return res

  function gcd(a: number, b: number): number {
    if (a % b === 0)
      return b
    else
      return gcd(b, a % b)
  }
}


console.log(minimumLines([[3,4],[1,2],[7,8],[2,3]]))
console.log(minimumLines([[1,7],[2,6],[3,5],[4,4],[5,4],[6,3],[7,2],[8,1]]))