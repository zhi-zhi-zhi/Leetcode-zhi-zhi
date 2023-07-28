/**
 * top down dp
 * @param grid
 */
function minDistance(word1: string, word2: string): number {
  const dp: number[][] = Array.from(Array(word1.length), () => Array(word2.length).fill(-1))

  return dfs(0, 0)

  function dfs(i: number, j: number): number {
    if (i >= word1.length) return word2.length - j
    if (j >= word2.length) return word1.length - i
    if (dp[i][j] !== -1) return dp[i][j]

    if (word1.charAt(i) === word2.charAt(j)) {
      dp[i][j] = dfs(i + 1, j + 1)
    } else {
      // insert, replace or delete (word1)
      dp[i][j] = Math.min(dfs(i, j+ 1), dfs(i + 1, j + 1), dfs(i + 1, j)) + 1
    }

    return dp[i][j]
  }
}

/**
 * bottom-up
 */
function solutionTwo(word1: string, word2: string): number {
  const dp: number[][] = Array.from(Array(word1.length + 1), () => Array(word2.length + 1).fill(-1))

  for (let i = 0; i < word1.length; i++) {
    dp[i][0] = i
  }
  for (let j = 0; j < word2.length; j++) {
    dp[0][j] = j
  }

  for (let i = 0; i < word1.length; i++) {
    for (let j = 0; j < word2.length; j++) {
      if (word1.charAt(i) === word2.charAt(j)) {
        dp[i + 1][j + 1] = dp[i][j]
      } else {
        // insert, replace or delete(word1)
        dp[i + 1][j + 1] = Math.min(dp[i][j + 1], dp[i][j], dp[i + 1][j]) + 1
      }
    }
  }

  return dp[word1.length - 1][word2.length - 1]
}


minDistance("horse", "ros")