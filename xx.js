// function minDistance(word1, word2) {
//   const dp = Array(word2.length + 1).fill(0)
//
//   for (let i = 0; i < word1.length; i++) {
//     for (let j = 0, temp = 0, preTemp = 0; j < word2.length; j++) {
//       // temp = dp[i][j]
//       temp = preTemp
//       preTemp = dp[j + 1]
//
//       if (word1.charAt(i) === word2.charAt(j))
//         dp[j + 1] = temp
//       else
//         //                   insert replace delete
//         // dp[i + 1][j + 1] = Math.min(dp[i + 1][j], dp[i][j], dp[i][j + 1]) + 1
//         dp[j + 1] = Math.min(dp[j], temp, dp[j + 1]) + 1
//     }
//   }
//
//   return dp[word2.length]
// }
//
// // minDistance(
// //   "horse", "ros")
//
//
// /**
//  * @param {number[]} nums
//  * @param {number} key
//  * @param {number} k
//  * @return {number[]}
//  */
// const findKDistantIndices = function(nums, key, k) {
//   const n = nums.length
//   let keyIndex = -2000,
//       res      = new Set()
//
//   for (let i = 0; i < n; i++) {
//     if (nums[i] === key) {
//       keyIndex = i
//     }
//
//     if (Math.abs(i - keyIndex) <= k)
//       res.add(i)
//   }
//
//   keyIndex = 2000
//   for (let i = n; i >= 0; i--) {
//     if (nums[i] === key) {
//       keyIndex = i
//     }
//
//     if (Math.abs(i - keyIndex) <= k)
//       res.add(i)
//   }
//
//   return Array.from(res).sort((a, b) => a - b)
// }
//
// /**
//  * @param {number} n
//  * @param {number[][]} artifacts
//  * @param {number[][]} dig
//  * @return {number}
//  */
// const digArtifacts = function(n, artifacts, dig) {
//   const grid = Array.from(Array(n), () => Array(n).fill(0))
//   for (let i = 0; i < dig.length; i++) {
//     const [x, y] = dig[i]
//     grid[x][y] = 1
//   }
//
//   const dp = Array.from(Array(n + 1), () => Array(n + 1).fill(0))
//
//   for (let i = 0; i < n; i++)
//     for (let j = 0; j < n; j++)
//       if (grid[i][j] === 1)
//         dp[i + 1][j + 1] = 1 + dp[i][j + 1] + dp[i + 1][j] - dp[i][j]
//       else
//         dp[i + 1][j + 1] = dp[i][j + 1] + dp[i + 1][j] - dp[i][j]
//
//   let res = 0
//   for (let i = 0; i < artifacts.length; i++) {
//     const [x1, y1, x2, y2] = artifacts[i]
//
//     if (dp[x2 + 1][y2 + 1] - dp[x1][y2 + 1] - dp[x2 + 1][y1] + dp[x1][y1] === (x2 - x1 + 1) * (y2 - y1 + 1))
//       res++
//   }
//
//   return res
// }
//
// /**
//  *
//  * @param compareFunc 默认小顶堆构建
//  * @constructor
//  */
// function PriorityQueue(compareFunc = (a, b) => a - b) {
//   this.arr = []
//   this.compareFunc = compareFunc
// }
//
// PriorityQueue.prototype.size = function() {
//   return this.arr.length
// }
// PriorityQueue.prototype.top = function() {
//   return this.size() > 0 ? this.arr[0] : null
// }
//
//
// PriorityQueue.prototype.add = function(val) {
//   this.arr.push(val)
//   percolateUp(this.arr, this.size() - 1, 0, this.compareFunc)
//
//
//   function percolateUp(arr, start = arr.length - 1, end = 0, compareFunc) {
//     if (start === 0) { return }
//
//     const originChildValue = arr[start]
//     let childIndex = start
//
//     let parentIndex = Math.floor((childIndex - 1) / 2)
//     while (parentIndex >= end && compareFunc(arr[parentIndex], originChildValue) >= 0) {
//       arr[childIndex] = arr[parentIndex]
//       childIndex = parentIndex
//       parentIndex = Math.floor((childIndex - 1) / 2)
//     }
//
//     arr[childIndex] = originChildValue
//   }
// }
//
// PriorityQueue.prototype.deleteTop = function() {
//   // 删除堆顶，并调整堆（把最后一个元素放上堆顶，保证堆不发生结构性改变，然后再做调整）
//   if (this.size() === 0) { return null }
//
//   const result = this.arr[0]
//   this.arr[0] = this.arr.pop()
//   percolateDown(this.arr, 0, this.size() - 1, this.compareFunc)
//
//   return result
//
// }
//
// PriorityQueue.prototype.replaceTopAndAdjustment = function(num) {
//   if (this.size() === 0) { return null }
//
//   this.arr[0] = num
//   percolateDown(this.arr, 0, this.size() - 1, this.compareFunc)
// }
//
// function percolateDown(arr, start = 0, end = arr.length - 1, compareFunc) {
//   if (end === 0) { return }
//
//   const originParentValue = arr[start]
//   let parentIndex = start
//
//   // left child index
//   let childIndex = parentIndex * 2 + 1
//   while (childIndex <= end) {
//     // find the fit index between left child and right child
//     if (childIndex + 1 <= end && compareFunc(arr[childIndex], arr[childIndex + 1]) >= 0) {
//       childIndex++
//     }
//
//     if (compareFunc(originParentValue, arr[childIndex]) < 0) {
//       break
//     }
//
//     arr[parentIndex] = arr[childIndex]
//     parentIndex = childIndex
//     childIndex = childIndex * 2 + 1
//   }
//
//   arr[parentIndex] = originParentValue
// }
//
//
// /**
//  * 0-index
//  * Math.(前 (Math.min(k, n) - 1) 个中的最大值, 第 (Math.min(k, n) + 1) 个值）
//  *
//  *
//  * @param {number[]} nums
//  * @param {number} k
//  * @return {number}
//  */
// const maximumTop = function(nums, k) {
//   const n = nums.length
//   let limit = Math.min(k, n + 1)
//
//   const priorityQueue = new PriorityQueue((a, b) => b - a)
//   for (let i = 0; i < limit - 1; i++) {
//     priorityQueue.add(nums[i])
//   }
//
//   if (n === 1 && k % 2 === 1)
//     return -1
//
//
//   if (priorityQueue.size() > 0 && k < n) {
//     return Math.max(priorityQueue.top(), nums[k])
//   } else if (priorityQueue.size() > 0) {
//     return priorityQueue.top()
//   } else if (k < n) {
//     return nums[k]
//   } else {
//     return -1
//   }
// }
//
// // maximumTop([18], 3)
// // maximumTop([73,63,62,16,95,92,93,52,89,36,75,79,67,60,42,93,93,74,94,73,35,86,96],59)
//
// // maximumTop([5, 2, 2, 4, 0, 6], 4)
//
// // 顶点表节点
// class Vertex {
//   constructor(data) {
//     this.data = data // 顶点域
//     this.firstEdge = null // 指向第一个邻接边的指针
//     this.outNum = 0  // 在无向图中表示与顶点邻接的边的数量，在有向图中为出度
//     this.inNum = 0  // 在有向图中为顶点的入度
//   }
// }
//
// // 边表节点
// class Edge {
//   constructor(data, weight = 0, nextEdge = null) {
//     this.data = data // 邻接点域
//     this.nextEdge = nextEdge // 指向下一条邻接边
//     this.weight = weight  // 权重
//   }
// }
//
// /**
//  * @param {number} n
//  * @param {number} a
//  * @param {number} b
//  * @param {number} c
//  * @return {number}
//  */
// var nthUglyNumber = function(n, a, b, c) {
//   const lcmABC = lcm(lcm(a, b), c)
//   const aCount = Math.trunc(lcmABC / a)
//   const bCount = Math.trunc(lcmABC / b)
//   const cCount = Math.trunc(lcmABC / c)
//   const abCount = Math.trunc(lcmABC / lcm(a, b))
//   const acCount = Math.trunc(lcmABC / lcm(a, c))
//   const bcCount = Math.trunc(lcmABC / lcm(b, c))
//   const singleCount = aCount + bCount + cCount - abCount - acCount - bcCount + 1
//   let res = lcmABC * Math.trunc(n / singleCount)
//   let x = n % singleCount
//   console.log(res, x)
//
//   if (x > 0) {
//     let left = 1, right = lcmABC - 1
//
//     while (left <= right) {
//       const mid = left + Math.trunc((right - left) / 2)
//
//       if (check(mid))
//         right = mid - 1
//       else
//         left = mid + 1
//     }
//
//     res += left
//   }
//
//   return res
//
//   function check(num) {
//     return Math.trunc(num / a) + Math.trunc(num / b) + Math.trunc(num / c) - Math.trunc(num / lcm(a, b)) - Math.trunc(num / lcm(a, c)) - Math.trunc(num / lcm(b, c)) >= x
//   }
//
//   function lcm(a, b) {
//     const memo = new Map()
//     if (memo.has(`${a}_${b}`))
//       return memo.get(`${a}_${b}`)
//
//     const res = a * b / gcd(a, b)
//     memo.set(`${a}_${b}`, res)
//     return res
//   }
//
//   function gcd(a, b) {
//     if (a % b === 0)
//       return b
//     else
//       return gcd(b, a % b)
//   }
// }
//
// // nthUglyNumber(5, 2, 3, 3)
//
//
// /**
//  * @param {number[][]} rectangles
//  * @param {number[][]} points
//  * @return {number[]}
//  */
// var countRectangles = function(rectangles, points) {
//   const n = points.length
//   const res = Array(n).fill(0)
//   const map = new Map()
//
//   rectangles.sort((a, b) => {
//     if (a[1] === b[1])
//       return a[0] - b[0]
//     else
//       return a[1] - b[1]
//   })
//   let start, end, layer
//   rectangles.forEach(([x, y], index) => {
//     if (start === undefined) {
//       start = index
//       end = index
//       layer = y
//     } else if (y !== layer) {
//       map.set(layer, [start, end])
//       start = index
//       end = index
//       layer = y
//     } else {
//       end = index
//     }
//   })
//   map.set(layer, [start, end])
//
//
//   points.forEach(([x,y], index) => {
//     let count = 0
//     for (let i = y; i <= 100; i++) {
//       if (!map.has(i))
//         continue
//       let [left, right] = map.get(i)
//       const start = left
//
//       while (left <= right) {
//         const mid = left + Math.trunc((right - left) / 2)
//         debugger
//         if (x >= rectangles[mid][0])
//           left = mid + 1
//         else
//           right = mid - 1
//       }
//
//       count += left - start
//     }
//     res[index] = count
//   })
//
//   return res
// };
//
// countRectangles(
//   [[7,1],[2,6],[1,4],[5,2],[10,3],[2,4],[5,9]],
//     [[2,3]]
// )

let S = []
const L = Array(20).fill(0)
const R = Array(20).fill(0)
const All = Array(20).fill(0)

function build(node, l, r) {
  if (l === r)
    L[node] = R[node] = All[node] = 1
  else {
    const m = l + Math.trunc((r - l) / 2)
    build(node * 2, l, m)
    build(node * 2 + 1, m + 1, r)
    merge(node, l, r)
  }
}

function merge(node, l, r) {
  const nodeLeft = node * 2, nodeRight = node * 2 + 1, m = l + Math.trunc((r - l) / 2)
  All[node] = Math.max(All[nodeLeft], All[nodeRight])
  L[node] = L[nodeLeft]
  R[node] = R[nodeRight]

  if (S[m] === S[m + 1]) {
    All[node] = Math.max(All[node], R[nodeLeft] + L[nodeRight])
    if (All[nodeLeft] === m - l + 1)
      L[node] += L[nodeRight]
    if (All[nodeRight] === r - m)
      R[node] += R[nodeLeft]
  }
}

function query(node, l, r, i, c) {
  if (l === r)
    S[l] = c
  else {
    const m = l + Math.trunc((r - l) / 2)
    if (i <= m)
      query(node * 2, l, m, i, c)
    else
      query(node * 2 + 1, m + 1, r, i, c)
    merge(node, l, r)
  }

  return All[node]
}

const longestRepeating = function(s, queryCharacters, queryIndices) {
  S = Array.from(s)

  build(1, 0, s.length - 1)

  const res = Array(queryCharacters.length)
  for (let i = 0; i < queryCharacters.length; i++)
    res[i] = query(1, 0, s.length - 1, queryIndices[i], queryCharacters[i])

  return res
}

console.log(longestRepeating('babacc', 'bcb', [1,3,3]))
