function minimumOperationsToWriteY(grid: number[][]): number {
    const arr1 = Array(3).fill(0)
    const arr2 = Array(3).fill(0)
    const n = grid.length

    for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[0].length; j++) {
            if ((i === j || (i + j ) === n - 1) && i < (n >> 1) || (i >= (n >> 1) && j === (n >> 1))) {
                arr1[grid[i][j]]++
            } else {
                arr2[grid[i][j]]++
            }
        }
    }

    let res = n * n
    const arr1Sum = arr1[0] + arr1[1] + arr1[2]
    for (let i = 0; i < 3; i++) {
        res = Math.min(res, arr1Sum - arr1Sum[i])
    }

    return Math.min(arr1[1] + arr1[2] + arr2[0] + arr2[2], arr1[1] + arr1[2] + arr2[0] + arr2[1],
        arr1[0] + arr1[2] + arr2[1] + arr2[2], arr1[0] + arr1[2] + arr2[0] + arr2[1],
        arr1[0] + arr1[1] + arr2[0] + arr2[2], arr1[0] + arr1[1] + arr2[1] + arr2[2])
};