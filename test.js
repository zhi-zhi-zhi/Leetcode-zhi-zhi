/**
 *
 * @param compareFunc 默认小顶堆构建
 * @constructor
 */
function PriorityQueue(compareFunc = (a, b) => a - b) {
  this.arr = []
  this.compareFunc = compareFunc
}

PriorityQueue.prototype.size = function() {
  return this.arr.length
}
PriorityQueue.prototype.top = function() {
  return this.size() > 0 ? this.arr[0] : null
}


PriorityQueue.prototype.add = function(val) {
  this.arr.push(val)
  percolateUp(this.arr, this.size() - 1, 0, this.compareFunc)


  function percolateUp(arr, start = arr.length - 1, end = 0, compareFunc) {
    if (start === 0) { return }

    const originChildValue = arr[start]
    let childIndex = start

    let parentIndex = Math.floor((childIndex - 1) / 2)
    while (parentIndex >= end && compareFunc(arr[parentIndex], originChildValue) >= 0) {
      arr[childIndex] = arr[parentIndex]
      childIndex = parentIndex
      parentIndex = Math.floor((childIndex - 1) / 2)
    }

    arr[childIndex] = originChildValue
  }
}

PriorityQueue.prototype.deleteTop = function() {
  // 删除堆顶，并调整堆（把最后一个元素放上堆顶，保证堆不发生结构性改变，然后再做调整）
  if (this.size() === 0) { return null }
  else if (this.arr.length === 1) return this.arr.pop();

  const result = this.arr[0]
  this.arr[0] = this.arr.pop()
  percolateDown(this.arr, 0, this.size() - 1, this.compareFunc)

  return result

}

PriorityQueue.prototype.replaceTopAndAdjustment = function(num) {
  if (this.size() === 0) { return null }

  this.arr[0] = num
  percolateDown(this.arr, 0, this.size() - 1, this.compareFunc)
}

function percolateDown(arr, start = 0, end = arr.length - 1, compareFunc) {
  if (end === 0) { return }

  const originParentValue = arr[start]
  let parentIndex = start

  // left child index
  let childIndex = parentIndex * 2 + 1
  while (childIndex <= end) {
    // find the fit index between left child and right child
    if (childIndex + 1 <= end && compareFunc(arr[childIndex], arr[childIndex + 1]) >= 0) {
      childIndex++
    }

    if (compareFunc(originParentValue, arr[childIndex]) < 0) {
      break
    }

    arr[parentIndex] = arr[childIndex]
    parentIndex = childIndex
    childIndex = childIndex * 2 + 1
  }

  arr[parentIndex] = originParentValue
}


const testPriorityQueue = new PriorityQueue((a, b) => a.value - b.value)

const tempArr = [3, 4, 3, 3]

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
const maxSubsequence = function(nums, k) {
  const queue = new PriorityQueue((a, b) => a.value - b.value)

  for (let i = 0; i < k; i++) {
    queue.add({
      index: i,
      value: nums[i]
    })
  }

  for (let i = k; i < nums.length; i++) {
    if (nums[i] > queue.top().value) {
      queue.replaceTopAndAdjustment({
        index: i,
        value: nums[i]
      })
    }
  }

  const result = queue.arr.sort((a, b) => a.index - b.index).map(a => a.value)

  return result
}

function countEven(num) {
  let result = 0

  for (let i = 2; i <= num; i++) {
    if (sumDigit(i) % 2 === 0)
      result++
  }

  return result
}

function sumDigit(num) {
  let x = 0
  while (num > 0) {
    x += num % 10
    num = Math.floor(num / 10)
  }
  return x
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
function ListNode(val, next) {
  this.val = (val === undefined ? 0 : val)
  this.next = (next === undefined ? null : next)
}

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
const mergeNodes = function(head) {
  if (head === null) return null
  let p = head.next

  const result = new ListNode()
  let q = result
  let sum = 0

  while (p !== null) {
    if (p.val === 0) {
      q.val = sum
      sum = 0

      if (p.next !== null) {
        q.next = new ListNode()
        q = q.next
      }
    } else {
      sum += p.val
    }

    p = p.next
  }

  return result
}


/**
 * @param {string} s
 * @param {number} repeatLimit
 * @return {string}
 */
const repeatLimitedString = function(s, repeatLimit) {
  let map = new Map()
  const result = []

  Array.from(s).forEach(char => {
    map.set(char, (map.get(char) ?? 0) + 1)
  })

  let assistArr = Array.from(map.entries())
    .sort(
      (a, b) => {
        return a[0].charCodeAt(0) - b[0].charCodeAt(0)
      })


  let lastChar  = '',
      charCount = 0

  while (assistArr.length > 0) {
    let length = assistArr.length
    let flag = false

    while (length > 0 && (
      lastChar !== assistArr[length - 1][0]
      || (lastChar === assistArr[length - 1][0] && charCount < repeatLimit))) {
      result.push(assistArr[length - 1][0])

      // 当前 letter 用完了
      if (--assistArr[length - 1][1] === 0) {
        lastChar = ''
        charCount = 0
        assistArr.pop()
        length = assistArr.length
        continue
      }
      // count 达到上限了
      // 还意味着当前元素没有用完
      // 尝试找一个第二大的字母，找的到就继续，找不到就 over
      if (++charCount === repeatLimit) {
        if (length > 1) {
          result.push(assistArr[length - 2][0])
          // 当前 letter 用完了
          if (--assistArr[length - 2][1] === 0) {
            assistArr.splice(length - 2, 1)
            length = assistArr.length
          }
          charCount = 0
        } else {
          flag = true
          break
        }
      }
    }

    if (flag)
      break
  }


  return result.join('')
}

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const coutPairs = function(nums, k) {
  const map = new Map()
  let result = 0

  nums.forEach(num => {
    const greatestCommonDivider = gcd(num, k)
    const temp = k / greatestCommonDivider

    // 找前面的i
    for (let key of map.keys())
      if (num % key === 0)
        result += map.get(key)

    // 供后面出现的用
    map.set(temp, (map.get(temp) ?? 0) + 1)
  })

  return result

  function gcd(a, b) {
    if (a % b === 0)
      return b
    else
      return gcd(b, a % b)
  }
}

// coutPairs([1,2,3,4,5], 2)


/**
 * version 1
 * straightforward backtracking
 *
 * Ver 1 would go TLE for testcases like:
 *
 * container sizes: [2,2,2,...,2] (50 containers with all size of 2)
 * item sizes: [2,2,2,...,2,3] (9 of size 2 and 1 of size 3)
 *
 * In the worst case, it would try 50 ** 10 times before it can return false.
 *
 * @param {number[]} nums
 * @param {number[]} quantity
 * @return {boolean}
 */
const canDistributeVersion1 = function(nums, quantity) {
  const containers = Array.from(
    nums
      .reduce((map, num) => map.set(num, (map.get(num) ?? 0) + 1), new Map())
      .values()
  )

  return dfs(0)

  /**
   *
   * @param {number} index i-th item
   */
  function dfs(index) {
    if (index === quantity.length)
      return true

    const needSpace = quantity[index]
    for (let i = 0; i < containers.length; i++) {
      if (containers[i] < needSpace)
        continue

      containers[i] -= needSpace
      if (dfs(index + 1))
        return true
      containers[i] += needSpace
    }

    return false
  }
}

/**
 * version 1.1
 * straightforward backtracking
 *
 * if we start with the biggest item, once we find a bigger item that cannot fit into any of the rest containers,
 * it fails. We don't need to care about any of the smaller ones.
 *
 * @param {number[]} nums
 * @param {number[]} quantity
 * @return {boolean}
 */
const canDistributeVersion11 = function(nums, quantity) {
  const containers = Array.from(
    nums
      .reduce((map, num) => map.set(num, (map.get(num) ?? 0) + 1), new Map())
      .values()
  )
  // sort in descending order
  quantity.sort((a, b) => b - a)

  return dfs(0)

  /**
   *
   * @param {number} index i-th item
   */
  function dfs(index) {
    if (index === quantity.length)
      return true

    const needSpace = quantity[index]
    for (let i = 0; i < containers.length; i++) {
      if (containers[i] < needSpace)
        continue

      containers[i] -= needSpace
      if (dfs(index + 1))
        return true
      containers[i] += needSpace
    }

    return false
  }
}

/**
 * version 1.2
 *
 * Data preprocess for pruning
 *
 * In addition to sorting the item by size, we can do more preprocess to make the calculation faster:
 * - Sort the item by size, as well as the containers.
 * - If any container is smaller than the smallest item, it's useless. Get rid of them.
 * - If a container can just fit the smallest item (same size), we should put the item in the container, and forget
 *   about them. Prove:
 *     - If we don't put the smallest item in to container with same size, and there exists a solution, the container
 *       must be empty (since it cannot fit any bigger item), and we can always move the smallest item into that
 *       container and all others still fit.
 *     - If we put the smallest item into the container with same size and cannot fit all others items, put it in
 *       another container (leave the one with same size empty, since it cannot fit any bigger item) will only make less
 *       room. We still cannot fit all others items.
 * - If the smallest container left (bigger than the smallest item) can only fit one item (smaller than the sum of the
 *   two smallest items left), we find the biggest item that fits it and put the item in it. Prove:
 *     - Say, the biggest item that smaller or the same to the container *C* is *X*. If we don't put X in C, and there
 *     exists a solution, then C is either empty or has ONE smaller (than X) item in it, and X is in a bigger container.
 *     We can always move X into C (if empty) or swap X with the smaller item and still have a solution (return true).
 *     - Similar to above, if there is no solution when putting X in C, moving/swapping X out of C will not make more
 *       room, and there is still no solution.
 * - After the pre-process, if there is no item left, we successfully fitted all items, return true.
 * - Otherwise if there is no container left, no way to fit rest of the items, return false
 *
 * @param {number[]} nums
 * @param {number[]} quantity
 * @return {boolean}
 */
const canDistributeVersion12 = function(nums, quantity) {
  const containers = Array.from(
    nums
      .reduce((map, num) => map.set(num, (map.get(num) ?? 0) + 1), new Map())
      .values()
  ).sort((a, b) => b - a)
  // sort in descending order
  quantity.sort((a, b) => b - a)
  // alias of quantity
  const items = quantity

  while (containers.length > 0 && items.length > 0) {
    if (containers[containers.length - 1] < items[items.length - 1])
      containers.pop()
    else if (items.length === 1 ||
      containers[containers.length - 1] === items[items.length - 1])
      (containers.pop(), items.pop())
    else if (containers[containers.length - 1] < items[items.length - 1] + items[items.length - 2]) {
      items.splice(items.findIndex((item => item <= containers[containers.length - 1])), 1)
      containers.pop()
    } else
      break
  }

  if (items.length === 0) return true
  if (containers.length === 0) return false

  return dfs(0)

  /**
   *
   * @param {number} index i-th item
   */
  function dfs(index) {
    if (index === items.length)
      return true

    const needSpace = items[index]
    for (let i = 0; i < containers.length; i++) {
      if (containers[i] < needSpace)
        continue

      containers[i] -= needSpace
      if (dfs(index + 1))
        return true
      containers[i] += needSpace
    }

    return false
  }
}

/**
 * version 1.3
 *
 * optimize on version 1.2
 *
 * But don't worry. There is a simpler method: (Inspired by the problem [subsets II])
 *
 * Group the containers by size
 * We try to put an item in one container, if we failed to find a solution, then we don't bother putting that item
 * in other containers with same size - just try a container with different size.
 *
 * @param {number[]} nums
 * @param {number[]} quantity
 * @return {boolean}
 */
var canDistributeVersion13 = function(nums, quantity) {
  const containers = Array.from(
    nums
      .reduce((map, num) => map.set(num, (map.get(num) ?? 0) + 1), new Map())
      .values()
  )
  // sort in descending order
  quantity.sort((a, b) => b - a)
  const items = quantity

  while (containers.length > 0 && items.length > 0) {
    if (containers[containers.length - 1] < items[items.length - 1])
      containers.pop()
    else if (items.length === 1 ||
      containers[containers.length - 1] === items[items.length - 1])
      (containers.pop(), items.pop())
    else if (containers[containers.length - 1] < items[items.length - 1] + items[items.length - 2]) {
      items.splice(items.findIndex((item => item <= containers[containers.length - 1])), 1)
      containers.pop()
    } else
      break
  }

  return dfs(0)

  /**
   *
   * @param {number} index i-th item
   */
  function dfs(index) {
    if (index === quantity.length)
      return true

    const needSpace = quantity[index]
    for (let i = 0; i < containers.length; i++) {
      if (containers[i] < needSpace || (i > 0 && containers[i] === containers[i - 1]))
        continue

      containers[i] -= needSpace
      if (dfs(index + 1))
        return true
      containers[i] += needSpace
    }

    return false
  }
}

/**
 * version 1.3
 *
 * dp with bit mask
 *
 *
 * @param {number[]} nums
 * @param {number[]} quantity
 * @return {boolean}
 */
var canDistributeVersion13 = function(nums, quantity) {
  const containers = Array.from(
    nums
      .reduce((map, num) => map.set(num, (map.get(num) ?? 0) + 1), new Map())
      .values()
  )
  // sort in descending order
  quantity.sort((a, b) => b - a)
  const items = quantity

  while (containers.length > 0 && items.length > 0) {
    if (containers[containers.length - 1] < items[items.length - 1])
      containers.pop()
    else if (items.length === 1 ||
      containers[containers.length - 1] === items[items.length - 1])
      (containers.pop(), items.pop())
    else if (containers[containers.length - 1] < items[items.length - 1] + items[items.length - 2]) {
      items.splice(items.findIndex((item => item <= containers[containers.length - 1])), 1)
      containers.pop()
    } else
      break
  }

  if (items.length === 0)
    return true
  if (containers.length === 0)
    return false

  const dp = Array.from(Array(containers.length), () => Array(1 << items.length).fill(false))
  const subSum = Array(1 << items.length).fill(0)
  for (let i = 1; i < (1 << items.length); i++) {
    let sum = 0
    for (let j = 0; j < items.length; j++)
      if ((i & (i << j)) === 1)
        sum += items[j]
    subSum[i] = sum
  }

  return dfs(0, (1 << items.length) - 1)

  /**
   *
   * @param {number} index i-th container
   * @param {number} mask representation the combination of items
   */
  function dfs(index, mask) {
    if (mask === 0)
      return true
    // all items are put into containers and
    if (index === containers.length)
      return false
    if (dp[index][mask])
      return false

    for (let subset = mask; subset >= 0; subset = (subset - 1) & mask) {
      if (subset === 0) {
        if (dfs(index + 1, mask))
          return true
        break
      }

      if (subSum[subset] <= containers[index]
        && dfs(index + 1, mask ^ subset))
        return true
    }

    dp[index][mask] = true
    return false
  }
}


/**
 * version 1.3
 *
 * dp with bit mask
 *
 *
 * @param {number[]} nums
 * @param {number[]} quantity
 * @return {boolean}
 */
const canDistribute = function(nums, quantity) {
  const containers = Array.from(
    nums
      .reduce((map, num) => map.set(num, (map.get(num) ?? 0) + 1), new Map())
      .values()
  )
  // sort in descending order
  quantity.sort((a, b) => b - a)
  const items = quantity

  while (containers.length > 0 && items.length > 0) {
    if (containers[containers.length - 1] < items[items.length - 1])
      containers.pop()
    else if (items.length === 1 ||
      containers[containers.length - 1] === items[items.length - 1])
      (containers.pop(), items.pop())
    else if (containers[containers.length - 1] < items[items.length - 1] + items[items.length - 2]) {
      items.splice(items.findIndex((item => item <= containers[containers.length - 1])), 1)
      containers.pop()
    } else
      break
  }

  if (items.length === 0)
    return true
  if (containers.length === 0)
    return false

  const dp = Array.from(Array(containers.length + 1), () => Array(1 << items.length).fill(false))
  dp[0][0] = true

  const subSum = Array(1 << items.length).fill(0)
  for (let i = 1; i < 1 << items.length; i++) {
    let sum = 0
    for (let j = 0; j < items.length; j++)
      if ((i & (1 << j)) !== 0)
        sum += items[j]
    subSum[i] = sum
  }

  for (let i = 0; i < containers.length; i++) {
    for (let mask = 0; mask < (1 << items.length); mask++) {
      dp[i + 1][mask] |= dp[i][mask]

      const wholeSet = (~mask) & (1 << items.length - 1)
      for (let subset = wholeSet; subset > 0; subset = (subset - 1) & wholeSet)
        if (subSum[subset] <= containers[i])
          dp[i + 1][mask | subset] |= dp[i][mask]
    }
  }

  return dp[containers.length][(1 << items.length) - 1]

  // return dfs(0, (1 << items.length) - 1)

  /**
   *
   * @param {number} index i-th container
   * @param {number} mask representation the combination of items
   */
  function dfs(index, mask) {
    if (mask === 0)
      return true
    // all items are put into containers
    if (index === containers.length)
      return false
    if (dp[index][mask])
      return false

    for (let subset = mask; subset >= 0; subset = (subset - 1) & mask) {
      if (subset === 0) {
        if (dfs(index + 1, mask))
          return true
        break
      }

      if (subSum[subset] <= containers[index] && dfs(index + 1, mask ^ subset))
        return true
    }

    dp[index][mask] = true
    return false
  }
}
// console.log(canDistribute(
//   [1,1,1,1,1]
//     ,[2,3]));

function connectTwoGroups(cost) {
  const m      = cost.length,
        n      = cost[0].length,
        subSum = Array.from(Array(m), () => Array(1 << n).fill(0)),
        dp     = Array.from(Array(m + 1), () => Array(1 << n).fill(Number.MAX_SAFE_INTEGER >>> 1))
  dp[0][0] = 0

  for (let i = 0; i < m; i++)
    for (let subset = 0; subset < 1 << n; subset++) {
      let sum = 0
      for (let j = 0; j < n; j++)
        if ((subset & (1 << j)) !== 0)
          sum += cost[i][j]
      subSum[i][subset] = sum
    }

  for (let i = 0; i < m; i++)
    for (let mask = 0; mask < 1 << n; mask++) {
      // 从已选择的里面至少选一个
      for (let j = 0; j < n; j++)
        if ((mask & (1 << j)) !== 0)
          dp[i + 1][mask] = Math.min(dp[i + 1][mask], dp[i][mask] + cost[i][j])

      // 遍历没有选过的所有集合
      const all = (~mask) & ((1 << n) - 1)
      for (let subset = all; subset > 0; subset = (subset - 1) & all)
        dp[i + 1][mask | subset] = Math.min(dp[i + 1][mask | subset], dp[i][mask] + subSum[i][subset])
    }

  return dp[m][(1 << n) - 1]
}

// connectTwoGroups([[15,96],[36,2]])


/**
 * Definition for singly-linked list.
 * class ListNode {
 *     val: number
 *     next: ListNode | null
 *     constructor(val?: number, next?: ListNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.next = (next===undefined ? null : next)
 *     }
 * }
 * @param {ListNode} head
 * @return {ListNode | null}
 */
function sortList(head) {
  if (head === null || head.next === null)
    return head

  let length = 0,
      cur    = head
  while (cur !== null) {
    length++
    cur = cur.next
  }

  const dummy = new ListNode(0)
  dummy.next = head

  let left, right, tail

  for (let step = 1; step < length; step <<= 1) {
    cur = dummy.next
    tail = dummy

    while (cur !== null) {
      left = cur
      right = split(left, step)
      cur = split(right, step)
      tail = merge(left, right, tail)
    }
  }

  return dummy.next

  /**
   * Divide the linked list into two lists,
   * while the first list contains first n nodes
   * return the second list's head
   *
   * @param {ListNode | null} head
   * @param {number} n
   * @return {ListNode | null} second
   */
  function split(head, n) {
    for (let i = 1; i < n && head !== null; i++)
      head = head.next

    if (head === null)
      return null

    const second = head.next
    head.next = null

    return second
  }

  /**
   * merge the two sorted linked list l1 and l2,
   * then append the merged sorted linked list to the node head
   * return the tail of the merged sorted linked list
   *
   * @param {ListNode | null} l1
   * @param {ListNode | null} l2
   * @param {ListNode | null} head
   */
  function merge(l1, l2, head) {
    let cur = head

    while (l1 !== null && l2 !== null) {
      if (l1.val <= l2.val) {
        cur.next = l1
        cur = cur.next
        l1 = l1.next
      } else {
        cur.next = l2
        cur = cur.next
        l2 = l2.next
      }
    }

    cur.next = l1 !== null ? l1 : l2

    while (cur.next !== null)
      cur = cur.next

    return cur
  }
}

/**
 * @param {number[][]} matrix
 * @return {number}
 */
const minFallingPathSum = function(matrix) {
  const n  = matrix.length,
        dp = Array.from(matrix[0])

  for (let i = 1; i < n; i++) {
    const temp = Array(n)
    for (let j = 0; j < n; j++) {
      temp[j] = matrix[i][j] +
        Math.min(j > 0 ? dp[j - 1] : Number.MAX_SAFE_INTEGER,
          dp[j],
          j < n - 1 ? dp[j + 1] : Number.MAX_SAFE_INTEGER)
    }
    dp.splice(0, n, ...temp)
  }

  return Math.min(...dp)
}

// minFallingPathSum( [[-19,57],[-40,-5]])


/**
 * @param {number[][]} triangle
 * @return {number}
 */
const minimumTotal = function(triangle) {
  const n  = triangle.length,
        dp = Array.from(triangle[n - 1])

  for (let i = n - 2; i >= 0; i--)
    for (let j = 0; j <= i; j++)
      dp[j] = Math.min(dp[j], dp[j + 1]) + triangle[i][j]

  return dp[0]
}


/**
 * @param {string} version1
 * @param {string} version2
 * @return {number}
 */
const compareVersion = function(version1, version2) {
  let i = 0,
      j = 0,
      m = version1.length,
      n = version2.length

  while (i < m && j < n) {
    let num = 0
    while (i < m && version1.charAt(i) !== '.')
      num = num * 10 + version1.charCodeAt(i++) - 48

    let num2 = 0
    while (j < n && version2.charAt(j) !== '.')
      num2 = num2 * 10 + version2.charCodeAt(j++) - 48

    if (num < num2)
      return -1
    else if (num > num2)
      return 1

    i++
    j++
  }

  if (i < m) {
    while (i < m)
      if (!['0', '.'].includes(version1.charAt(i++)))
        return 1
  } else if (j < n) {
    while (j < n)
      if (!['0', '.'].includes(version2.charAt(j++)))
        return -1
  }

  return 0
}


// /**
//  * @param {number[][]} mat
//  * @param {number} k
//  * @return {number[][]}
//  */
// var matrixBlockSum = function(mat, k) {
//   const m = mat.length,
//         n = mat[0].length,
//         dp = Array.from(Array(m), () => Array(n).fill(0))
//
//   let sum = 0
//   for (let x = 0; x < m && x <= k; x++) {
//     for (let y = 0; y < n && y <= k; y++) {
//       sum += mat[x][y]
//     }
//   }
//   dp[0][0] = sum
//
//   for (let i = 0; i < m; i++) {
//     if (i > 0) {
//       let tempy = 0
//
//       for (let y = 0; y < n && y <= k; y++) {
//         tempy -= (i - k - 1) >= 0 ? mat[i - k - 1][y] : 0
//         tempy += (i + k) < m ? mat[i + k][y] : 0
//       }
//
//       dp[i][0] = dp[i-1][0] + tempy
//     }
//
//     for (let j = 1; j < n; j++) {
//       let temp = 0
//
//       for (let x = Math.max(0, i - k); x < m && x <= i +k; x++) {
//         temp -= (j - k - 1) >= 0 ? mat[x][j-k-1] : 0
//         temp += (j + k) < n ? mat[x][j+k] : 0
//       }
//
//       dp[i][j] = dp[i][j-1] + temp
//     }
//   }
//
//   return dp
// }
/**
 * @param {number[][]} mat
 * @param {number} k
 * @return {number[][]}
 */
const matrixBlockSum = function(mat, k) {
  const m   = mat.length,
        n   = mat[0].length,
        sum = Array.from(Array(m + 1), () => Array(n + 1).fill(0)),
        dp  = Array.from(Array(m), () => Array(n).fill(0))

  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      sum[i][j] = sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1] + mat[i - 1][j - 1]

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++) {
      let r1 = Math.max(0, i - k) + 1,
          c1 = Math.max(0, j - k) + 1,
          r2 = Math.min(m - 1, i + k) + 1,
          c2 = Math.min(n - 1, j + k) + 1

      dp[i][j] = sum[r2][c2] + sum[r1 - 1][c1 - 1] - sum[r1 - 1][c2] - sum[r2][c1 - 1]
    }

  return dp
}


/**
 * @param {number[][]} matrix
 */
const NumMatrix = function(matrix) {
  const m   = matrix.length,
        n   = matrix[0].length,
        sum = Array.from(Array(m + 1), () => Array(n + 1).fill(0))

  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      sum[i][j] = matrix[i - 1][j - 1] + sum[i - 1][j] + sum[i][j - 1] - sum[i - 1][j - 1]

  this.sum = sum
}

/**
 * @param {number} row1
 * @param {number} col1
 * @param {number} row2
 * @param {number} col2
 * @return {number}
 */
NumMatrix.prototype.sumRegion = function(row1, col1, row2, col2) {
  const sum = this.sum

  return sum[row2 + 1][col2 + 1] + sum[row1][col1] - sum[row2 + 1][col1] - sum[row1][col2 + 1]
}

/**
 * Your NumMatrix object will be instantiated and called as such:
 * var obj = new NumMatrix(matrix)
 * var param_1 = obj.sumRegion(row1,col1,row2,col2)
 */
const x = new NumMatrix([[3, 0, 1, 4, 2], [5, 6, 3, 2, 1], [1, 2, 0, 1, 5], [4, 1, 0, 1, 7], [1, 0, 3, 0, 5]])


/**
 * @param {number[]} nums
 * @return {number[]}
 */
const countSmaller = function(nums) {
  if (nums.length === 0)
    return []

  const n           = nums.length,
        result      = Array(n).fill(0),
        help        = Array(n).fill(0).map((_, index) => {
          return {
            val: nums[index],
            originalIndex: index
          }
        }),
        compareFunc = (a, b) => a.val - b.val

  mergeSortAndCount(help, 0, n - 1, compareFunc)
  return result

  /**
   *
   * @param {[]} nums
   * @param {number} start
   * @param {number} end
   * @param {Function} compareFunc
   */
  function mergeSortAndCount(nums, start, end, compareFunc) {
    if (start >= end)
      return

    const mid = start + ((end - start) >> 1)
    mergeSortAndCount(nums, start, mid, compareFunc)
    mergeSortAndCount(nums, mid + 1, end, compareFunc)
    merge(nums, start, end, compareFunc)
  }

  /**
   *
   * @param {[]} nums
   * @param {number} start
   * @param {number} end
   * @param {Function} compareFunc
   */
  function merge(nums, start, end, compareFunc) {
    const mid = start + ((end - start) >> 1)
    const tempArr = Array(end - start + 1).fill(0)

    for (let left = start, right = mid + 1, k = 0; k <= end - start; k++) {
      if (left > mid) {
        tempArr[k] = nums[right]
        right++
      } else if (right > end) {
        tempArr[k] = nums[left]
        result[nums[left].originalIndex] += right - (mid + 1)
        left++
      } else if (compareFunc(nums[left], nums[right]) <= 0) {
        tempArr[k] = nums[left]
        result[nums[left].originalIndex] += right - (mid + 1)
        left++
      } else {
        tempArr[k] = nums[right]
        right++
      }
    }

    for (let i = start; i <= end; i++) {
      nums[i] = tempArr[i - start]
    }
  }
}


// countSmaller([5,2,6,1])


/**
 * @param {number[][]} graph
 * @return {number}
 */
const shortestPathLength = function(graph) {
  const n   = graph.length,
        map = new Map()

  for (let i = 0; i < n; i++) {
    const m        = graph[i].length,
          edgeList = []

    for (let j = 0; j < m; j++)
      edgeList.push(graph[i][j])

    map.set(i, edgeList)
  }

  // dp[mask][j]: mask represents nodes which be visited noted by 1
  // j represents the leading node in visited nodes
  const dp    = Array.from(Array(1 << n), () => Array(n).fill(-1)),
        queue = []

  for (let i = 0; i < n; i++) {
    queue.push([1 << i, i])
    dp[1 << i][i] = 0
  }

  while (queue.length > 0) {
    const next = []

    for (const [mask, lead] of queue)
      // the first path that has visited all nodes is the shortest path due to BFS
      if (mask === ((1 << n) - 1))
        return dp[mask][lead]
      else if (map.has(lead))
        for (let adjacentNode of map.get(lead)) {
          const newLead = adjacentNode,
                newMask = mask | (1 << newLead)

          // never visited
          if (dp[newMask][newLead] === -1) {
            dp[newMask][newLead] = dp[mask][lead] + 1
            next.push([newMask, newLead])
          }
        }

    queue.splice(0, queue.length, ...next)
  }
}

// shortestPathLength([[1,2,3],[0],[0],[0]])


/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
const uniquePaths = function(m, n) {
  const dp = Array(n + 1).fill(0)
  dp[1] = 1

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      dp[j + 1] = dp[j] + dp[j + 1]

  return dp[n]
}


/**
 * @param {number[][]} obstacleGrid
 * @return {number}
 */
const uniquePathsWithObstacles = function(obstacleGrid) {
  const m  = obstacleGrid.length,
        n  = obstacleGrid[0].length,
        dp = Array(n + 1).fill(0)
  dp[1] = 1

  for (let i = 0; i < m; i++)
    for (let j = 0; j < n; j++)
      if (obstacleGrid[i][j] === 1)
        dp[j + 1] = 0
      else
        dp[j + 1] = dp[j] + dp[j + 1]

  return dp[n]
}


/**
 * @param {number} finalSum
 * @return {number[]}
 */
const maximumEvenSplit = function(finalSum) {
  if (finalSum % 2 === 1)
    return []

  const result = []
  let sum      = 0,
      nextEven = 2

  while (sum + nextEven <= finalSum) {
    result.push(nextEven)
    sum += nextEven
    nextEven += 2
  }

  result[result.length - 1] += finalSum - sum - result[result.length - 1]

  return result
}


/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
const goodTriplets = function(nums1, nums2) {
  // preprocess
  const map           = nums1.reduce((map, num, index) => map.set(num, index), new Map()),
        n             = nums1.length,
        smallerBefore = Array(n).fill(0),
        greaterAfter  = Array(n).fill(0),
        help          = nums2.map((num, index) => {
          return { val: map.get(num), originalIndex: index }
        }),
        compareFunc   = (a, b) => a.val - b.val

  mergeSortAndCount(help, 0, n - 1, compareFunc)

  let result = 0

  for (let i = 0; i < n; i++)
    result += smallerBefore[i] * greaterAfter[i]

  return result

  /**
   *
   * @param {[]} nums
   * @param {number} start
   * @param {number} end
   * @param {Function} compareFunc
   */
  function mergeSortAndCount(nums, start, end, compareFunc) {
    if (start >= end)
      return

    const mid = start + ((end - start) >> 1)
    mergeSortAndCount(nums, start, mid, compareFunc)
    mergeSortAndCount(nums, mid + 1, end, compareFunc)
    merge(nums, start, end, compareFunc)
  }

  /**
   *
   * @param {[]} nums
   * @param {number} start
   * @param {number} end
   * @param {Function} compareFunc
   */
  function merge(nums, start, end, compareFunc) {
    const mid = start + ((end - start) >> 1)
    const tempArr = Array(end - start + 1).fill(0)

    for (let left = start, right = mid + 1, k = 0; k <= end - start; k++) {
      if (left > mid) {
        tempArr[k] = nums[right]
        smallerBefore[nums[right].originalIndex] += left - start
        right++
      } else if (right > end) {
        tempArr[k] = nums[left]
        greaterAfter[nums[left].originalIndex] += end - right + 1
        left++
      } else if (compareFunc(nums[left], nums[right]) <= 0) {
        tempArr[k] = nums[left]
        greaterAfter[nums[left].originalIndex] += end - right + 1
        left++
      } else {
        tempArr[k] = nums[right]
        smallerBefore[nums[right].originalIndex] += left - start
        right++
      }
    }

    for (let i = start; i <= end; i++) {
      nums[i] = tempArr[i - start]
    }
  }
}


// goodTriplets([2, 0, 1, 3], [0, 1, 2, 3])


/**
 * @param {string[]} words
 * @param {string} pref
 * @return {number}
 */
const prefixCount = function(words, pref) {
  let result = 0
  words.forEach(word => {
    if (word.startsWith(pref))
      result++
  })

  return result
}


/**
 * @param {string} s
 * @param {string} t
 * @return {number}
 */
const minSteps = function(s, t) {
  const map = new Map()
  let result = 0

  Array.from(s).forEach(char => {
    map.set(char, (map.get(char) ?? 0) + 1)
  })

  Array.from(t).forEach(char => {
    map.set(char, (map.get(char) ?? 0) - 1)
  })

  Array.from(map.values()).forEach(value => {
    result += Math.abs(value)
  })

  return result
}


/**
 * @param {number[]} time
 * @param {number} totalTrips
 * @return {number}
 */
const minimumTime = function(time, totalTrips) {
  const n       = time.length,
        minTime = Math.min(...time)
  let low = minTime, high = minTime * totalTrips

  while (low <= high) {
    const mid = low + Math.floor(((high - low) / 2))

    if (canTripTimes(mid) >= totalTrips)
      high = mid - 1
    else
      low = mid + 1
  }

  return low

  function canTripTimes(spendTime) {
    return time.reduce((allTime, time) =>
      allTime += Math.floor(spendTime / time), 0)
  }
}

// minimumTime([10000], 100000000000)

/**
 * Time complexity: O(max(n, numLaps))
 * Space complexity: O(numLaps)
 *
 * @param {number[][]} tires
 * @param {number} changeTime
 * @param {number} numLaps
 * @return {number}
 */
const minimumFinishTime = function(tires, changeTime, numLaps) {
  const n = tires.length
  const without_change = Array(18).fill(Number.MAX_SAFE_INTEGER)

  tires.forEach(([time, p]) => {
    let accumulative = time
    // 最多 17 次
    for (let x = 1, sum = 0; accumulative <= changeTime + time; x++) {
      sum += accumulative
      without_change[x] = Math.min(without_change[x], sum)
      accumulative *= p
    }
  })

  const dp = Array(numLaps + 1).fill(Number.MAX_SAFE_INTEGER)
  dp[0] = -changeTime

  for (let i = 1; i <= numLaps; i++)
    for (let j = 1; j <= Math.min(17, i); j++)
      dp[i] = Math.min(dp[i], dp[i - j] + changeTime + without_change[j])

  return dp[numLaps]
}

// minimumFinishTime([[36, 5], [32, 5], [88, 8], [11, 4], [52, 2], [2, 2], [90, 5], [49, 6], [68, 9], [77, 3], [42, 7],
//     [17, 3], [73, 7], [89, 2], [92, 9], [40, 7], [71, 8], [79, 3], [55, 6], [77, 9], [14, 3], [87, 10], [4, 2], [63, 7],
//     [79, 8], [3, 9], [44, 2], [49, 9], [91, 3], [58, 6], [62, 3], [72, 7], [97, 6], [29, 5], [88, 9], [40, 8], [36, 4],
//     [82, 8], [53, 8], [26, 2], [26, 6], [92, 2], [46, 2], [75, 6], [85, 2], [6, 10], [12, 4], [15, 4]]
//   , 24
//   , 27)

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
const widthOfBinaryTree = function(root) {
  if (root === null) return 0

  const queue = [[root, 0]]
  let result = -1

  while (queue.length > 0) {
    let start = 0,
        end   = 0

    let length = queue.length
    const startIndex = queue[0][1]
    for (let i = 0; i < length; i++) {
      const [node, index] = queue.shift()

      if (i === 0)
        start = index
      if (i === length - 1)
        end = index

      if (node.left !== null) {
        queue.push([node.left, 2 * index])
      }
      if (node.right !== null) {
        queue.push([node.right, 2 * index + 1])
      }
    }

    result = Math.max(result, end - start + 1)
  }

  return result
}


/**
 * @param {character[][]} matrix
 * @return {number}
 */
const maximalSquare = function(matrix) {
  const m  = matrix.length,
        n  = matrix[0].length,
        dp = Array(n + 1).fill(0)
  let result = 0

  for (let i = 0; i < m; i++)
    for (let j = 0, temp = 0, preTemp = 0; j < n; j++) {
      temp = preTemp
      preTemp = dp[j + 1]

      if (matrix[i][j] === '1')
        dp[j + 1] = Math.min(temp, dp[j], dp[j + 1]) + 1
      else
        dp[j + 1] = 0

      result = Math.max(result, dp[j + 1])
    }

  return result ** 2
}

// maximalSquare([["1","0","1","0","0"],["1","0","1","1","1"],["1","1","1","1","1"],["1","0","0","1","0"]])
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const countPairs = function(nums, k) {
  const map = new Map()
  let result = 0

  nums.forEach(num => {
    const x = gcd(num, k)

    for (let key of map.keys())
      if (num % key === 0)
        result += map.get(key)

    map.set(k / x, (map.get(k / x) ?? 0) + 1)
  })

  return result

  function gcd(m, n) {
    if (m % n === 0)
      return n
    else
      return gcd(n, m % n)
  }
}

// countPairs([1, 2, 3, 4, 5], 2)


/**
 * @param {number[]} nums
 * @return {string[]}
 */
const summaryRanges = function(nums) {
  if (nums.length === 0)
    return []

  const n      = nums.length,
        result = []

  let start = nums[0], end = nums[0]

  for (let i = 1; i < n; i++) {
    if (nums[i] - end > 1) {
      result.push(start === end ? `${start}` : `${start}->${end}`)
      start = nums[i]
      end = nums[i]
    } else
      end = nums[i]
  }

  result.push(start === end ? `${start}` : `${start}->${end}`)

  return result
}


/**
 * @param {string} s
 * @return {string}
 */
const longestPalindrome = function(s) {
  const n  = s.length,
        // dp[i][j] = true: s.substring(i, j) is a palindrome
        dp = Array.from(Array(n), () => Array(n).fill(false))

  let left  = -1,
      right = -1,
      max   = -1

  for (let i = n - 1; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (j - i <= 2)
        dp[i][j] = s.charAt(i) === s.charAt(j)
      else
        dp[i][j] = s.charAt(i) === s.charAt(j) && dp[i + 1][j - 1]

      if (dp[i][j] && j - i > max) {
        left = i
        right = j
        max = j - i
      }
    }
  }

  return s.substring(left, right + 1)
}


// /**
//  * @param {string} s
//  * @return {number}
//  */
// const longestPalindromeSubseq = function(s) {
//   const n  = s.length,
//         dp = Array.from(Array(n), () => Array(n).fill(0))
//
//   for (let i = n - 1; i >= 0; i--) {
//     dp[i][i] = 1
//     for (let j = i + 1; j < n; j++) {
//       if (s.charAt(i) === s.charAt(j))
//         if (j - i === 1)
//           dp[i][j] = 2
//         else
//           dp[i][j] = dp[i + 1][j - 1] + 2
//       else
//         dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
//     }
//   }
//
//   return dp[0][n - 1]
// }

// longestPalindromeSubseq('bbbab')


/**
 * @param {string} corridor
 * @return {number}
 */
const numberOfWays = function(corridor) {
  const n = corridor.length

  let i = 0
  while (i < n) {
    if (corridor.charAt(i) !== 'P')
      break
    i++
  }
  if (i === n)
    return 0

  let j = n - 1
  while (j >= 0) {
    if (corridor.charAt(j) !== 'P')
      break
    j--
  }
  if (j === i || j - i === 1)
    return 0

  const arr = Array.from(corridor.substring(i, j + 1))
  let subArr = [],
      seats  = 0,
      plants = 0

  arr.forEach(char => {
    if (seats < 2) {
      if (char === 'S') {
        seats++
      }
    } else {
      if (char === 'S') {
        subArr.push(plants)
        plants = 0
        seats = 1
      } else if (char === 'P') {
        plants++
      }
    }
  })

  if (seats === 1) {
    return 0
  }

  return subArr.reduce((product, plants) => product *= (plants + 1), 1)
}

// numberOfWays("SSPPSPSS")


/**
 * @param {number[]} height
 * @return {number}
 */
const trap = function(height) {
  let left     = 0,
      leftMax  = height[left],
      right    = height.length - 1,
      rightMax = height[right],
      result   = 0

  while (left < right) {
    if (leftMax <= rightMax) {
      result += Math.max(0, leftMax - height[left++])
      leftMax = Math.max(leftMax, height[left])
    } else {
      result += Math.max(0, rightMax - height[right--])
      rightMax = Math.max(rightMax, height[right])
    }
  }

  return result
}
// trap([5,5,1,7,1,1,5,2,7,6])


/**
 * @param {number[]} prices
 * @return {number}
 */
const maxProfit = function(prices) {
  // dp[i][0]: max profit when i-th day sell
  // dp[i][1]: max profit when i-th day buy
  const n  = prices.length,
        dp = Array.from(Array(n + 2), () => Array(2).fill(0))
  // -2-day and -1-day
  dp[0] = [0, -1e10]
  dp[1] = [0, -1e10]

  for (let i = 0; i < n; i++) {
    // sell
    dp[i + 2][0] = Math.max(dp[i + 1][0], dp[i + 1][1] + prices[i])
    // buy
    dp[i + 2][1] = Math.max(dp[i + 1][1], dp[i][0] - prices[i])
  }

  return dp[n + 1][0]
}

// maxProfit([1,2,3,0,2])


/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumDifference = function(nums) {
  // 大顶堆，堆顶是最大的元素
  const minQueue = new PriorityQueue((a, b) => b - a)
  // 小顶堆，堆顶是最小的元素
  const maxQueue = new PriorityQueue((a, b) => a - b)

  const length     = nums.length,
        n          = length / 3,
        leftMinDp  = Array(n + 1).fill(0),
        rightMaxDp = Array(n + 1).fill(0)

  let minimumDiff = Number.MAX_SAFE_INTEGER,
      leftSum     = 0,
      rightSum    = 0

  if (length % 3 !== 0 || length === 0)
    return 0

  for (let i = 0; i < n; i++) {
    minQueue.add(nums[i])
    leftSum += nums[i]
    maxQueue.add(nums[length - 1 - i])
    rightSum += nums[length - 1 - i]
  }
  leftMinDp[0] = leftSum
  rightMaxDp[0] = rightSum

  for (let i = n; i < 2 * n; i++) {
    if (nums[i] < minQueue.top()) {
      leftSum = leftSum - minQueue.top() + nums[i]
      minQueue.replaceTopAndAdjustment(nums[i])
    }
    leftMinDp[i - n + 1] = leftSum

    if (nums[length - 1 - i] > maxQueue.top()) {
      rightSum = rightSum - maxQueue.top() + nums[length - 1 - i]
      maxQueue.replaceTopAndAdjustment(nums[length - 1 - i])
    }
    rightMaxDp[i - n + 1] = rightSum
  }


  for (let i = 0; i <= n; i++) {
    minimumDiff = Math.min(minimumDiff, leftMinDp[0] - rightMaxDp[n - i])
  }

  return minimumDiff
}

// minimumDifference([7,9,5,8,1,3])

/**
 *
 * @param {number[]} nums
 * @return {number}
 */
const minimumDeviation = function(nums) {
  const n        = nums.length,
        maxQueue = new PriorityQueue((a, b) => b - a)
  let min          = Number.MAX_SAFE_INTEGER,
      minDeviation = Number.MAX_SAFE_INTEGER

  for (let i = 0; i < n; i++) {
    if (nums[i] % 2 === 1)
      nums[i] *= 2

    min = Math.min(min, nums[i])
    maxQueue.add(nums[i])
  }

  while (maxQueue.top() % 2 === 0) {
    minDeviation = Math.min(minDeviation, maxQueue.top() - min)
    min = Math.min(min, maxQueue.top() / 2)
    maxQueue.replaceTopAndAdjustment(maxQueue.top() / 2)
  }

  return Math.min(minDeviation, maxQueue.top() - min)
}


/**
 * @param {string} s
 * @return {number}
 */
const minFlips = function(s) {
  let start0 = 0,
      start1 = 0,
      assist = ['0', '1']

  for (let i = 0; i < s.length; i++)
    if (s.charAt(i) !== assist[i % 2])
      start0++

  // 长度为偶数时，翻转对结果没有任何影响（奇偶性不变）
  if (s.length % 2 === 0)
    return Math.min(start0, s.length - start0)

  // 长度为奇数
  // type-1
  let min = Math.min(start0, s.length - start0)
  start1 = s.length - start0
  for (let i = 0; i < s.length - 1; i++) {
    if (s.charAt(i) === '0')
      start0 = start1 - 1
    else
      start0 = start1 + 1

    min = Math.min(min, start0, s.length - start0)
    start1 = s.length - start0
  }

  return min
}


// minFlips('010')


/**
 * Version1
 *
 * Time complexity: O(n)
 * Space complexity: O(n)
 *
 * @param {string} boxes
 * @return {number[]}
 */
const minOperationsVersion1 = function(boxes) {
  const n        = boxes.length,
        leftArr  = Array(n).fill(0),
        rightArr = Array(n).fill(0),
        answer   = Array(n).fill(0)

  let left  = 0,
      right = 0

  for (let i = 1; i < n; i++) {
    if (boxes.charAt(i - 1) === '1')
      left++

    leftArr[i] = leftArr[i - 1] + left
  }

  for (let i = n - 2; i >= 0; i--) {
    if (boxes.charAt(i + 1) === '1')
      right++

    rightArr[i] = rightArr[i + 1] + right
  }

  for (let i = 0; i < n; i++)
    answer[i] = leftArr[i] + rightArr[i]

  return answer
}


/**
 * Version2
 *
 * Time complexity: O(n)
 * Space complexity: O(1)
 *
 * @param {string} boxes
 * @return {number[]}
 */
const minOperationsVersion2 = function(boxes) {
  const n      = boxes.length,
        answer = Array(n).fill(0)

  let left  = 0,
      right = 0,
      total = 0

  for (let i = 1; i < n; i++) {
    if (boxes.charAt(i - 1) === '1')
      left++

    total += left
  }

  answer[n - 1] = total
  for (let i = n - 2; i >= 0; i--) {
    total -= left
    if (boxes.charAt(i) === '1')
      left--

    if (boxes.charAt(i + 1) === '1')
      right++
    total += right

    answer[i] = total
  }

  return answer
}


/**
 * Time complexity: (n ^ 2)
 * Space complexity: O(n ^ n)
 *
 * @param {string} s
 * @return {number}
 */
const longestPalindromeSubseq = function(s) {
  const n  = s.length,
        // dp[i][j] means the longest palindromic subsequence in s.substring(i, j)
        dp = Array.from(Array(n), () => Array(n).fill(1))

  for (let i = n - 2; i >= 0; i--) {
    for (let j = i + 1; j < n; j++) {
      if (j - i === 1) {
        if (s.charAt(i) === s.charAt(j))
          dp[i][j] = 2
      } else {
        if (s.charAt(i) === s.charAt(j))
          dp[i][j] = Math.max(dp[i + 1][j - 1] + 2, dp[i + 1][j], dp[i][j - 1])
        else
          dp[i][j] = Math.max(dp[i + 1][j], dp[i][j - 1])
      }
    }
  }

  return dp[0][n - 1]
}

// longestPalindromeSubseq('bbbab')

/**
 * greedy.
 * math problem
 *
 * @param {number} n
 * @return {number}
 */
const integerBreak = function(n) {
  if (n === 2) return 1
  if (n === 3) return 2

  let countThree = Math.floor(n / 3)

  if (n % 3 === 1)
    return 3 ** (countThree - 1) * 4
  else if (n % 3 === 2)
    return 3 ** (countThree) * 2
  else
    return 3 ** (countThree)
}


/**
 * Time complexity: O(n*log(n))
 * Space complexity: O(n)
 *
 * @param {number} n
 * @return {number}
 */
const numSquares = function(n) {
  const dp = Array(n + 1).fill(1e10)
  dp[0] = 0

  for (let i = 1; i <= n; i++)
    for (let j = 1; j ** 2 <= i; j++)
      dp[i] = Math.min(dp[i], dp[i - j ** 2] + 1)

  return dp[n]
}


/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 *
 * @param {string} s
 * @return {number}
 */
const minimumDeletions = function(s) {
  const assistArr = Array.from(s),
        n         = s.length
  let countA           = 0,
      countB           = assistArr.reduce((accumulate, char) => accumulate += char === 'b' ? 1 : 0, 0),
      minimumDeletions = Math.min(countB, n - countB)

  for (let i = 0; i < n; i++) {
    if (assistArr[i] === 'a') {
      countA++
    } else {
      minimumDeletions = Math.min(minimumDeletions, n - countA - countB)
      countB--
    }
  }

  return minimumDeletions
}

/**
 * Time complexity: O(n*log(n))
 * Space complexity: O(n)
 *
 * @param {number[]} nums
 * @return {number}
 */
const deleteAndEarn = function(nums) {
  const map = new Map()

  nums.forEach(num => {
    map.set(num, (map.get(num) ?? 0) + 1)
  })

  const dp = Array(map.size + 1).fill(0)

  Array.from(map.keys())
    .sort((a, b) => a - b)
    .forEach((num, index, arr) => {
      if (index > 0) {
        if (num - arr[index - 1] === 1) {
          dp[index + 1] = Math.max(dp[index], num * map.get(num) + dp[index - 1])
        } else {
          dp[index + 1] = num * map.get(num) + dp[index]
        }
      } else {
        dp[1] = num * map.get(num)
      }
    })

  return dp[dp.length]
}

// deleteAndEarn([3,4,2])
// deleteAndEarn([3,1])


/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 *
 * @param {number[]} nums
 * @return {number}
 */
const waysToMakeFair = function(nums) {
  const n = nums.length
  let result     = 0,
      preOddSum  = 0,
      preEvenSum = 0,
      sufOddSum  = 0,
      sufEvenSum = 0

  for (let i = 0; i < n; i++)
    if (i % 2 === 0)
      sufEvenSum += nums[i]
    else
      sufOddSum += nums[i]

  for (let i = 0; i < n; i++) {
    if (i % 2 === 0)
      sufEvenSum -= nums[i]
    else
      sufOddSum -= nums[i]

    if (preEvenSum + sufOddSum === preOddSum + sufEvenSum)
      result++

    if (i % 2 === 0)
      preEvenSum += nums[i]
    else
      preOddSum += nums[i]
  }

  return result
}


// waysToMakeFair([6,1,7,4,1])
/**
 * @param {number[]} nums
 * @param {number} key
 * @return {number}
 */
const mostFrequent = function(nums, key) {
  const map = new Map()

  for (let i = 0; i < nums.length - 1; i++) {
    if (nums[i] === key) {
      map.set(nums[i + 1], (map.get(nums[i + 1]) ?? 0) + 1)
    }
  }

  return (Array.from(map.entries()).sort(([num1, count1], [num2, count2]) =>
    count2 - count1
  ))[0][0]
}

// mostFrequent([2,2,2,2,3], 2)


/**
 * @param {number[]} mapping
 * @param {number[]} nums
 * @return {number[]}
 */
const sortJumbled = function(mapping, nums) {
  const tempArr = []

  nums.forEach(num => {
    let newNum = 0

    Array.from(String(num)).forEach((digit, index, arr) => {
      newNum += mapping[digit] * (10 ** (arr.length - index - 1))
    })

    tempArr.push([num, newNum])
  })

  return tempArr
    .sort(([num1, newNum1], [num2, newNum2]) => newNum1 - newNum2)
    .map(item => item[0])
}

// sortJumbled([8,9,4,0,2,1,3,5,7,6], [991,338,38])
/**
 * @param {number} n
 * @param {number[][]} edges
 * @return {number[][]}
 */
const getAncestors = function(n, edges) {
  // 2. 记录每个节点的入度，一个节点入度为 0 时，其所有出节点入度 - 1，出节点的数组，自动添加当前出节点
  // 3. 用队列来做
  const map    = new Map(),
        queue  = [],
        result = Array.from(Array(n), () => new Set())

  edges.forEach(([from, to]) => {
    if (map.has(from)) {
      const temp = map.get(from)
      temp.toArr.push(to)
    } else {
      const obj = {
        inDegree: 0,
        toArr: [to]
      }
      map.set(from, obj)
    }

    if (map.has(to)) {
      map.get(to).inDegree++
    } else {
      const obj = {
        inDegree: 1,
        toArr: []
      }
      map.set(to, obj)
    }
  })

  for (let [key, val] of map.entries()) {
    if (val.inDegree === 0) {
      queue.push(key)
    }
  }

  while (queue.length > 0) {
    const next = []

    for (let key of queue) {
      // 出队时，给所有子儿子，加上自己及自己父母的节点
      for (let to of map.get(key).toArr) {
        for (let item of result[key])
          result[to].add(item)
        result[to].add(key)

        if (--map.get(to).inDegree === 0)
          next.push(to)
      }
    }

    queue.splice(0, queue.length, ...next)
  }

  return result.map(item => Array.from(item).sort((a, b) => a - b))
}

// getAncestors(5, [[0,1],[0,2],[0,3],[0,4],[1,2],[1,3],[1,4],[2,3],[2,4],[3,4]])


/**
 * 1 <= s.length <= 2000
 *
 * 遍历？
 * 贪心
 *
 * 隔壁两个元素两两想换，相当于是冒泡
 *
 * 1. 剪枝：自己不和自己换
 * 2. 直觉：若当前元素是开头元素，则肯定不动当前元素，后半部分找到该元素然后挪到队尾
 * 3. 直觉：第0和和最后一个匹配，然后第一个和倒数第二个匹配，只挪后半部分
 *
 * 4. 如果长度是奇数，则必有一个在中间，把这个元素挪到末尾或队头（看哪个更近）
 *    ，当作不存在，最后再挪回来
 * 5. 也有可能不懂，留在队伍中间，两边挪
 *
 * 所以不大可能是贪心了
 *
 * @param {string} s
 * @return {number}
 */
const minMovesToMakePalindrome = function(s) {
  const arr = Array.from(s)
  const n = arr.length
  let count = 0

  for (let i = 0; i < (n >> 1); i++) {
    let j = n - 1 - i
    while (j > i) {
      if (arr[j] === arr[i]) {
        // 第一个找到的，挪到对应位置
        for (let k = j; k < n - 1 - i; k++)
          swap(k, k + 1)

        count += n - 1 - i - j
        break
      }

      j--
    }

    // 如果找到的位置是自己，则代表自己是奇数个的最后一个
    if (j === i)
      return count + minMovesToMakePalindrome(arr.slice(i, n - i).reverse().join(''))
  }

  return count

  function swap(i, j) {
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
}


// minMovesToMakePalindrome('hlkbvcxotyxvviyvzltmwwcefwnxjotedmeomfgwdxyujbqcnstzhytocmycgiamllxmnwqhkbimirgbveqokxkolrgrlxtkvqfxozwxuoxzibpvxqufeczmzucfiheyqiqsvylnsxugrxfsqwgnsivxorzrjtfwhonjiwcijeizonxgjkrbkychecfbdkskalhpcplunkbmwlkpbrozdgilreepigqqyrplstrcafzsrzwvprhclwsbhqjccxmyannhhyxxjhraiabbutvlqxwtodibjinbxhxxbgtfugslykwmpowliatymfgienowngaprabjjzqefkravphlprxijzavceavrquiunljffwpspoupafjkihdbvxdelnjggevdidegjcgixaprcxxbzkeehyicaorbebkmqtttgmzlrvzcxqvjcpbhsdlszwcengmxccgzksodcxwhigytufgaxtirgqmcidkrjldmlwpmolejwblrfaycgxueygrmxmlixuobzxvrxkesopvgclpnzlxsrsojtphjjzdgsjqegpxausvieedksgviuqrqzxxxxwysekzzcqdhnwwlwbaqekejyofukkwdninxeywkxokucpechqcnpvgajargoemghioisjjqhsmejzhyzlrurmzozxuusvdveohdivmhsnmxdmrisdmfggzbuxsmzpcemxcxpklxbhbbuyedmkcelsponvayyoearstwxqmnrmvfsrryugyajgpchhlxegctseqvrvsdegzyhpzkirfywqslwbdeufacvpgbpyejscqvgfvaushxtstelnzwvloeiksvqckgscltxreurjnqdblkmesgsjeedhvzgktiidsdrnaxvcmmpmwdsamdamjwwaeabvzgrakeigcifdpukbqrphjmsrwmnircexemzclixonvylhhbzselxlvkdpbkxnkrebsxsfstxgnlsipeyopbtuzmkjsmrvkneizbkhfxaiempbvshkljuxzjkeibblszjpkkdcderijfhlnvhccswvtyxbjvxcjqwliurwbxlmivsgssvilvplumzzdeabsgcpbglvnpdlzsslpiaosjgvlytqiccdhgnylbcirtvlpylhrfsvdkdkeonwzvlzlnsnakcfavhtzkhnvdbxbicjzpnurnerqwjlqcwszuihczohebdxbkpgaxsglicpinmebxlketmfjjfxylcljhvlbgmhabkilwdflcxsmbuxnpotmttjojpkzjbrkqrgzsydxxdnjnqzzzpfczbxvhkrdifdyilllnuzuzckknjcnkmupglscnnxbnqlahihxemnebhhv')

/**
 * @param {string} s
 * @return {string[]}
 */
const cellsInRange = function(s) {
  const result = []

  for (let i = s.charAt(0); i <= s.charAt(3); i = String.fromCharCode(i.charCodeAt(0) + 1)) {
    for (let j = s.charAt(1); j <= s.charAt(4); j = String.fromCharCode(j.charCodeAt(0) + 1)) {
      result.push(i + j)
    }
  }

  return result
}

// cellsInRange("A1:Z9")
/**
 * 数值会溢出
 *
 * Time complexity: O(n*log(n))
 * Space complexity: O(1)
 *
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
const minimalKSum = function(nums, k) {
  nums.sort((a, b) => b)
  nums.unshift(0)
  const n = nums.length
  let minimalSum = 0,
      x          = k

  for (let i = 1; i < n; i++) {
    if (nums[i] - nums[i - 1] > 1) {
      if (x >= nums[i] - nums[i - 1] - 1) {
        x -= nums[i] - nums[i - 1] - 1
        minimalSum += ((nums[i - 1] + 1) + (nums[i] - 1)) * (nums[i] - nums[i - 1] - 1) / 2
      } else {
        minimalSum += ((nums[i - 1] + 1) + (nums[i - 1] + x)) * (x) / 2
        x = 0
        break
      }
    }
  }


  return minimalSum
}

// minimalKSum([53,41,90,33,84,26,50,32,63,47,66,43,29,88,71,28,83], 76)

function TreeNode(val, left, right) {
  this.val = (val === undefined ? 0 : val)
  this.left = (left === undefined ? null : left)
  this.right = (right === undefined ? null : right)
}

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[][]} descriptions
 * @return {TreeNode}
 */
const createBinaryTree = function(descriptions) {
  const map = new Map()
  const parentSet = new Set()
  const childSet = new Set()

  descriptions.forEach(([parent, child, isLeft]) => {
    parentSet.add(parent)
    childSet.add(child)

    if (map.has(parent)) {
      const parentNode = map.get(parent)

      if (map.has(child)) {
        if (isLeft === 1)
          parentNode.left = map.get(child)
        else
          parentNode.right = map.get(child)
      } else {
        const childNode = new TreeNode(child)
        map.set(child, childNode)

        if (isLeft === 1)
          parentNode.left = map.get(child)
        else
          parentNode.right = map.get(child)
      }
    } else {
      const parentNode = new TreeNode(parent)
      map.set(parent, parentNode)

      if (map.has(child)) {
        if (isLeft === 1)
          parentNode.left = map.get(child)
        else
          parentNode.right = map.get(child)
      } else {
        const childNode = new TreeNode(child)
        map.set(child, childNode)

        if (isLeft === 1)
          parentNode.left = map.get(child)
        else
          parentNode.right = map.get(child)
      }
    }
  })

  for (let key of childSet)
    parentSet.delete(key)

  return map.get(parentSet.keys().next().value)
}

// createBinaryTree([[20,15,1],[20,17,0],[50,20,1],[50,80,0],[80,19,1]])
// createBinaryTree([[1,2,1],[2,3,0],[3,4,1]])


/**
 * @param {number[]} nums
 * @return {number[]}
 */
const replaceNonCoprimes = function(nums) {
  const n = nums.length

  for (let i = n - 2; i >= 0; i--) {
    while (i < nums.length - 1) {
      const gcdWeGet = gcd(nums[i], nums[i + 1])

      if (gcdWeGet > 1) {
        // 等同于
        // nums.pop(); nums.pop(); nums.push(nums[i] * nums[i+1] / gcdWeGet)
        nums.splice(i, 2, nums[i] * nums[i + 1] / gcdWeGet)
      } else {
        break
      }
    }
  }

  return nums


  function gcd(a, b) {
    if (a % b === 0)
      return b
    else
      return gcd(b, a % b)
  }
}

// replaceNonCoprimes([6,4,3,2,7,6,2])
// replaceNonCoprimes([2,2,1,1,3,3,3])
/**
 * @param {number} n
 * @return {number}
 */
const countOrders = function(n) {
  let result = 1,
      modulo = 1e9 + 7

  for (let i = 1; i <= n; i++) {
    result *= i
    result %= modulo
    result *= (2 * i - 1)
    result %= modulo
  }

  return result
}

/**
 * @param {number[]} nums
 * @return {number}
 */
const minimumMountainRemovals = function(nums) {
  const n   = nums.length,
        pre = Array(n).fill(0),
        suf = Array(n).fill(0)

  let min = Number.MAX_SAFE_INTEGER

  let assist = []
  for (let i = 0; i < n; i++) {
    const num = nums[i]
    if (assist.length > 0 && num <= assist[assist.length - 1]) {
      let left = 0, right = assist.length - 1

      while (left <= right) {
        const mid = left + Math.floor((right - left) / 2)

        if (assist[mid] >= num)
          right = mid - 1
        else
          left = mid + 1
      }

      assist[left] = num
      pre[i] = left
    } else {
      assist.push(num)
      pre[i] = assist.length - 1
    }
  }

  assist.length = 0
  for (let i = n-1; i >= 0; i--) {
    const num = nums[i]

    if (assist.length > 0 && num <= assist[assist.length - 1]) {
      let left = 0, right = assist.length - 1

      while (left <= right) {
        const mid = left + Math.floor((right - left) / 2)

        if (assist[mid] >= num)
          right = mid - 1
        else
          left = mid + 1
      }

      assist[left] = num
      suf[i] = left
    } else {
      assist.push(num)
      suf[i] = assist.length - 1
    }
  }

  for (let i = 1; i < n - 1; i++)
    if (pre[i] > 0 && suf[i] > 0)
      min = Math.min(min, n - pre[i] - suf[i] - 1)

  return min
}

// minimumMountainRemovals([1,3,1])
// minimumMountainRemovals([2,1,1,5,6,2,3,1])

let temp = []

for (let i = 0; i < 1000; i++) {
  temp.push(Math.floor(Math.random() * 1e9) + 1)

  if (i === 999){
    console.log(temp)
  }
}


/**
 * @param {number[][]} graph
 * @return {boolean}
 */
var isBipartite = function(graph) {
  const n = graph.length
  // 0 代表未访问
  // 1 代表黑色
  // -1 代表白色
  const visited = Array(n).fill(0)

  for (let i = 0; i < n; i++) {
    // 与之前访问的点连通
    if (visited[i] !== 0)
      continue

    const queue = new PriorityQueue()
    queue.add(i)
    visited[i] = 1

    while (queue.size() > 0) {
      const point = queue.deleteTop()

      for (const adj of graph[point]) {
        // 如果已经染色过，且与当前顶点颜色相同，则不符合规则
        if (visited[adj] !== 0 && visited[adj] === visited[point])
          return false

        if (visited[adj] === 0) {
          // 染成和当前节点不一样的颜色
          visited[adj] = 0 - visited[point]
          queue.add(adj)
        }
      }
    }
  }

  return true
};
isBipartite([[1,2,3],[0,2],[0,1,3],[0,2]])
