/**
 * i = 1: return 6
 *
 * i = 2:
 * if (x !== y) && (gcd(x, y) === 1):
 *   f[2][x][y] = 1
 * else
 *   f[2][x][y] = 0
 *
 * i > 2:
 * f[i][last][last2]: 序列长度为 i, 最后一个元素是 last，倒数第二个元素是 last2 的组合的个数
 * f[i+1][j][last] = f[i][last][last2] (last: 0-5, last2: 0-5 && j !== last && j !== last2 && gcd(j, last) === 1)
 * f[i][..][..] = 0
 */

const MODULE = 1e9 + 7, MAX_LEN = 1e4
const f = Array.from(Array(MAX_LEN), () => Array.from(Array(6), () => Array(6).fill(0)))

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

for (let i = 0; i < 6; i++)
  for (let j = 0; j < 6; j++)
    if (i !== j && gcd(i, j) === 1)
      f[2][i][j] = 1

for (let k = 3; k < MAX_LEN; k++) {
  for (let j = 0; j < 6; j++) {
    for (let last = 0; last < 6; last++) {
      if (j !== last && gcd(j, last) === 1) {
        for (let last2 = 0; last2 < 6; last2++) {
          if (j !== last2)
            f[k][j][last] = (f[k][j][last] + f[k - 1][last][last2]) % MODULE
        }
      }
    }
  }
}


function distinctSequences(n: number): number {
  if (n === 1)
    return 0

  let res = 0

  for (let i = 0; i < 6; i++)
    for (let j = 0; j < 6; j++)
      res = (res + f[n][i][j]) % MODULE

  return res
};

distinctSequences(2)
