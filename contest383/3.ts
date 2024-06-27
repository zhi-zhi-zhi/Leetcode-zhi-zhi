/**
 *
 * 3 <= n, m <= 500
 * 0 <= image[i][j] <= 255
 * 0 <= threshold <= 255
 *
 * 一个点，最多可以归属于九个区域？
 * @param image
 * @param threshold
 */
function resultGrid(image: number[][], threshold: number): number[][] {
    const m = image.length, n = image[0].length
    const result = Array.from(Array(m), () => Array<number>(n).fill(0))
    const lTr = Array.from(Array(m), () => Array<number>(n).fill(0))

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n - 1; j++)
            lTr[i][j] = Math.abs(image[i][j] - image[i][j+1])
    }

    const tTB = Array.from(Array(m), () => Array<number>(n).fill(0))
    for (let i = 0; i < m - 1; i++) {
        for (let j = 0; j < n; j++)
            tTB[i][j] = Math.abs(image[i][j] - image[i+1][j])
    }
    const presum = calculatePrefixSum(image)

    const zhizhi: number[][] = JSON.parse(JSON.stringify(image))
    const threeDimensionalArray: number[][][] = new Array(m);

    for (let i = 0; i < m; i++) {
        threeDimensionalArray[i] = new Array(n);

        for (let j = 0; j < n; j++) {
            threeDimensionalArray[i][j] = []
        }
    }



    for (let i = 1; i < m - 1; i++) {
        for (let j = 1; j < n - 1; j++) {
            if (
                lTr[i - 1][j - 1] <= threshold
                && lTr[i - 1][j] <= threshold
                && lTr[i][j - 1] <= threshold
                && lTr[i][j] <= threshold
                && lTr[i + 1][j - 1] <= threshold
                && lTr[i + 1][j] <= threshold

                && tTB[i - 1][j - 1] <= threshold
                && tTB[i - 1][j] <= threshold
                && tTB[i - 1][j+1] <= threshold
                && tTB[i][j - 1] <= threshold
                && tTB[i][j] <= threshold
                && tTB[i][j+1] <= threshold
            ) {
                for (let x = -1; x <= 1; x++)
                    for (let y = -1; y <= 1; y++)
                        threeDimensionalArray[i+x][j+y].push(i * n + j)
                zhizhi[i][j] = Math.floor(
(                    presum[i+2][j+2] + presum[i-1][j-1]
                    - presum[i+2][j-1] - presum[i-1][j+2]
) / 9                )
            }
        }
    }

    for (let i = 0; i < m; i++) {
        for (let j = 0; j < n; j++) {
            if (threeDimensionalArray[i][j].length) {
                for (const num of threeDimensionalArray[i][j]) {
                    const x = Math.floor(num / n)
                    const y = num % n
                    result[i][j] += zhizhi[x][y]
                }
                result[i][j] = Math.floor(result[i][j] / threeDimensionalArray[i][j].length)
            }
            else result[i][j] = zhizhi[i][j]
        }
    }

    return result
};

function calculatePrefixSum(matrix: number[][]): number[][] {
    if (matrix.length === 0 || matrix[0].length === 0) {
        return [];
    }

    const rows = matrix.length;
    const cols = matrix[0].length;

    // Initialize a 2D array for the prefix sum
    const prefixSum: number[][] = new Array(rows + 1)
        .fill(0)
        .map(() => new Array(cols + 1).fill(0));

    // Fill the prefix sum array
    for (let i = 1; i <= rows; i++) {
        for (let j = 1; j <= cols; j++) {
            prefixSum[i][j] = matrix[i - 1][j - 1] +
                prefixSum[i - 1][j] +
                prefixSum[i][j - 1] -
                prefixSum[i - 1][j - 1];
        }
    }

    return prefixSum;
}

// console.log(resultGrid([[10,20,30],[15,25,35],[20,30,40],[25,35,45]]
// ,12))