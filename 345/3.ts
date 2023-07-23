function maxMoves(grid: number[][]): number {
    const m = grid.length, n = grid[0].length

    const memo = Array.from(Array(m), () => Array<number>(n).fill(0))

    for (let i = 0; i < m; i++) {
        if (memo[i][0] > 0) continue
        dfs(i, 0)
    }

    return Math.max(...memo.flat(1)) - 1

    function dfs(i: number, j: number): number {
        if (i < 0 || i >= m || j < 0 || j >= n) return 0
        if (memo[i][j]) return memo[i][j]

        memo[i][j] = 1

        let max = 0

        max = Math.max(
            !(i - 1 < 0 || i - 1 >= m || j + 1 < 0 || j + 1 >= n) && grid[i - 1][j + 1] > grid[i][j]
                ? dfs(i - 1, j + 1)
                : 0,
            !(i < 0 || i >= m || j + 1 < 0 || j + 1 >= n) && grid[i][j + 1] > grid[i][j]
                ? dfs(i, j + 1) : 0,
            !(i + 1 < 0 || i + 1 >= m || j + 1 < 0 || j + 1 >= n) && grid[i + 1][j + 1] > grid[i][j]
                ? dfs(i + 1, j + 1) : 0
        )
        memo[i][j] += max

        return memo[i][j]
    }
};
