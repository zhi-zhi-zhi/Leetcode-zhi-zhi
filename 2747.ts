import 'core-js';

function countServers(n: number, logs: number[][], x: number, queries: number[]): number[] {
    logs.sort((a, b) => a[1] - b[1])
    const newQueries: number[][] = queries.map((query, i) => [query, i]).sort((a, b) => (a[0]) - b[0])
    const map = new Map<number, number>()
    let count = 0
    const allTimes = newQueries.at(-1)![0]

    let left = 0, right = 0
    let i = 0, j = 0, k = 0
    const res = []

    for (const [query, index] of newQueries) {
        const low = query - x, high = query

        while (right < logs.length && logs[right][1] <= high) {
            const serve = logs[right][0]
            const requests = map.get(serve) ?? 0
            if (requests === 0) count++
            map.set(serve, requests + 1)
            right++
        }
        while (left < logs.length && logs[left][1] < low) {
            const serve = logs[left][0]
            const requests = map.get(serve) ?? 1
            if (requests === 1) count--
            map.set(serve, requests - 1)
            left++
        }

        res.push([n - count, index])
    }

//   while (right <= allTimes) {
//     while (j < logs.length && logs[j][1] === right) {
//       const serve = logs[j][0]
//       const requests = map.get(serve) ?? 0
//       if (requests === 0) count++
//       map.set(serve, requests + 1)
//       j++
//     }

//     while (right - left > x) {
//       while (i < logs.length && logs[i][1] === left) {
//         const serve = logs[i][0]
//         const requests = map.get(serve) ?? 1
//         if (requests === 1) count--
//         map.set(serve, requests - 1)
//         i++
//       }

//       left++
//     }

//     while (k < newQueries.length && newQueries[k][0] === right) {
//       res.push([n-count, newQueries[k][1]])
//       k++
//     }

//     right++
//   }

    return res.sort((a, b) => a[1] - b[1]).map(item => item[0])
};

// function countServers(n: number, logs: number[][], x: number, queries: number[]): number[] {
//   logs.sort((a, b) => a[1] - b[1])
//   const newQueries = queries.map((query, i) => [query, i]).sort((a, b) => (a[0]) - b[0])
//   const map = new Map<number, number>()
//   let count = 0
//   const allTimes = newQueries.at(-1)[0]

//   let left = 1, right = 0
//   let i = 0, j = 0, k = 0
//   const res = []

//   while (right <= allTimes) {
//     while (j < logs.length && logs[j][1] === right) {
//       const serve = logs[j][0]
//       const requests = map.get(serve) ?? 0
//       if (requests === 0) count++
//       map.set(serve, requests + 1)
//       j++
//     }

//     while (right - left > x) {
//       while (i < logs.length && logs[i][1] === left) {
//         const serve = logs[i][0]
//         const requests = map.get(serve) ?? 1
//         if (requests === 1) count--
//         map.set(serve, requests - 1)
//         i++
//       }

//       left++
//     }

//     while (k < newQueries.length && newQueries[k][0] === right) {
//       res.push([n-count, newQueries[k][1]])
//       k++
//     }

//     right++
//   }

//   return res.sort((a, b) => a[1]-b[1]).map(item => item[0])
// };

console.log(countServers(3
    , [[1, 3], [2, 6], [1, 5]]
    , 5
    , [10, 11]))
