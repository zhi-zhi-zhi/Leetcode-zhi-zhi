/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 * @param {number[]} tops
 * @param {number[]} bottoms
 * @return {number}
 */
function minDominoRotations(tops: number[], bottoms: number[]): number {
  // 暴力
  // top 1, 2, 3, 4, 5, 6
  // bottom 1, 2, 3, 4, 5, 6
  const n = tops.length
  let min = n + 1

  // top
  for (let i = 1; i <= 6; i++) {
    let topCount = 0,
      bottomCount = 0,
      topCan = true
      // bottomCan = true
    for (let j = 0; j < n; j++) {
      if (tops[j] === i && bottoms[j] === i) {
        // do nothing
      } else if (bottoms[j] === i) {
        topCount++
      } else if (tops[j] === i){
        bottomCount++
      } else {
        topCan = false
        // bottomCan = false
        break
      }

    }

    if (topCan)
      min = Math.min(min, topCount, bottomCount)
  }

  return min === n + 1 ? -1 : min
}
