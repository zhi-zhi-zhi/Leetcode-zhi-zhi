function minimumWhiteTiles(floor: string, numCarpets: number, carpetLen: number): number {
  return minimumWhiteTilesVersion1(floor, numCarpets, carpetLen)
}

/**
 * top-down
 * @param floor
 * @param numCarpets
 * @param carpetLen
 */
function minimumWhiteTilesVersion1(floor: string, numCarpets: number, carpetLen: number): number {
  const n = floor.length
  const floorArr = Array.from(floor, (char) => parseInt(char))
  const dp = Array.from(Array(n), () => Array(numCarpets + 1).fill(-1))

  return dfs(0, numCarpets)

  function dfs(index: number, leftCarpets: number): number {
    if (leftCarpets < 0)
      return n + 1
    else if (index >= n)
      return 0
    else if (dp[index][leftCarpets] !== -1)
      return dp[index][leftCarpets]

    const unuse = dfs(index + 1, leftCarpets) + floorArr[index]
    const use = dfs(index + carpetLen, leftCarpets - 1)
    dp[index][leftCarpets] = Math.min(unuse, use)

    return dp[index][leftCarpets]
  }
}

/**
 * bottom-up
 * @param floor
 * @param numCarpets
 * @param carpetLen
 */
function minimumWhiteTilesVersion2(floor: string, numCarpets: number, carpetLen: number): number {
  const n = floor.length
  const floorArr = Array.from(floor, (char) => parseInt(char))
  const dp = Array.from(Array(n + 1), () => Array(numCarpets + 1).fill(0))

  for (let i = 1; i <= n; i++) {
    for (let j = 0; j <= numCarpets; j++) {
      const jump = dp[i - 1][j] + floorArr[i - 1]
      const cover = j === 0 ? n + 1: dp[Math.max(0, i - carpetLen)][j - 1]
      dp[i][j] = Math.min(jump, cover)
    }
  }

  return dp[n][numCarpets]
}