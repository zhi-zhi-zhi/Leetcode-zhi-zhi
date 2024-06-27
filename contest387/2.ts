function countSubmatrices(grid: number[][], k: number): number {
    let res = 0

    const m = grid.length, n = grid[0].length
    const preSum = Array.from(Array(m), () => Array(n).fill(0))
    preSum[0][0] = grid[0][0]

    for (let i = 1; i < n; i++) {
        preSum[0][i] = preSum[0][i-1] + grid[0][i]
    }
    for (let i = 1; i < m; i++) {
        preSum[i][0] = preSum[i-1][0] + grid[i][0]
    }
    for (let i = 1; i < m; i++) {
        for (let j = 1; j < n; j++) {
            preSum[i][j] = preSum[i-1][j] + preSum[i][j-1] - preSum[i-1][j-1] + grid[i][j]
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (preSum[i][j] <= k)
                res++
        }
    }

    return res
};

// console.log(countSubmatrices( [[7,2,9],[1,5,0],[2,6,6]],
// 20))