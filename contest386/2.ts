/**
 * n == bottomLeft.length == topRight.length
 * 2 <= n <= 103
 * bottomLeft[i].length == topRight[i].length == 2
 * 1 <= bottomLeft[i][0], bottomLeft[i][1] <= 107
 * 1 <= topRight[i][0], topRight[i][1] <= 107
 * bottomLeft[i][0] < topRight[i][0]
 * bottomLeft[i][1] < topRight[i][1]
 *
 * @param bottomLeft
 * @param topRight
 */
function largestSquareArea(bottomLeft: number[][], topRight: number[][]): number {
    const arr = []
    let res = -1

    for (let i = 0; i < bottomLeft.length; i++) {
        const width = topRight[i][0] - bottomLeft[i][0]
        const height = topRight[i][1] - bottomLeft[i][1]
        arr.push([width, height])
    }

    for (let i = 0; i < bottomLeft.length; i++) {
        const xa1 = bottomLeft[i][0]
        const ya1 = bottomLeft[i][1]
        const xa2 = topRight[i][0]
        const ya2 = topRight[i][1]


        for (let j = i + 1; j < bottomLeft.length; j++) {
            const xb1 = bottomLeft[j][0]
            const yb1 = bottomLeft[j][1]
            const xb2 = topRight[j][0]
            const yb2 = topRight[j][1]

            if (Math.abs(xb2 + xb1 - xa2 - xa1) <=
                xa2 - xa1 + xb2 - xb1
            && Math.abs(yb2 + yb1 - ya2 - ya1) < ya2 - ya1 + yb2 - yb1) {
                res = Math.max(res,
                    Math.min(Math.min(xa2, xb2) - Math.max(xa1, xb1),
                        Math.min(ya2, yb2) - Math.max(ya1, yb1))
                    )
            }
        }
    }

    return res **2
};

console.log(largestSquareArea([[1,1],[3,3],[3,1]],
    [[2,2],[4,4],[4,2]]))