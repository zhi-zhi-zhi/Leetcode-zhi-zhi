class PriorityQueue<T> {
  private readonly arr: T[]
  /**
   * 小顶堆：(a, b) => a - b
   * 大顶堆：(a, b) => b - a
   */
  private compareFunc: (a: T, b: T) => number

  constructor(compareFunc: (a: T, b: T) => number) {
    this.arr = []
    this.compareFunc = compareFunc
  }

  size(): number {
    return this.arr.length
  }

  top(): T | undefined {
    return this.arr.length > 0 ? this.arr[0] : undefined
  }

  add(val: T) {
    const { arr, compareFunc } = this
    arr.push(val)
    percolateUp()

    /**
     * 自底向上冒泡
     * @param start
     * @param end
     */
    function percolateUp(start: number = arr.length - 1, end: number = 0) {
      if (start <= end) return

      const originalChildValue = arr[start]
      let childIndex = start
      let parentIndex = Math.floor((start - 1) / 2)

      while (parentIndex >= end && compareFunc(arr[parentIndex], originalChildValue) >= 0) {
        arr[childIndex] = arr[parentIndex]
        childIndex = parentIndex
        parentIndex = Math.floor((parentIndex - 1) / 2)
      }

      arr[childIndex] = originalChildValue
    }
  }

  deleteTop(): T | undefined {
    const { arr } = this

    if (arr.length === 0) return undefined
    else if (arr.length === 1) return arr.pop()

    const res = this.arr[0]
    // @ts-ignore
    arr[0] = arr.pop()
    this.percolateDown()

    return res
  }

  /**
   * 替换堆顶元素
   */
  replaceTopAndAdjustment(val: T) {
    const { arr } = this
    if (arr.length === 0)
      return

    arr[0] = val
    this.percolateDown()
  }

  // static from<T>(val: T[]): PriorityQueue<T> {
  //   const
  // }

  private percolateDown(start: number = 0, end: number = this.arr.length - 1) {
    if (end <= start) return

    const { arr, compareFunc } = this

    const originalParentVal = this.arr[start]
    let parentIndex = start,
      childIndex = parentIndex * 2 + 1

    while (childIndex <= end) {
      // find the fit index between left child and right child
      if (childIndex + 1 <= end && compareFunc(arr[childIndex], arr[childIndex + 1]) >= 0) {
        childIndex++
      }

      if (compareFunc(originalParentVal, arr[childIndex]) >= 0) {
        arr[parentIndex] = arr[childIndex]
        parentIndex = childIndex
        childIndex = childIndex * 2 + 1
      } else {
        break
      }
    }

    arr[parentIndex] = originalParentVal
  }
}

class Trie {
  children: Trie[]
  words: PriorityQueue<string>

  constructor() {
    this.children = Array(26).fill(null)
    this.words = new PriorityQueue<string>((a, b) => a >= b ? -1 : 1)
  }
}

function suggestedProducts(products: string[], searchWord: string): string[][] {
  const root = new Trie()
  const res: string[][] = []

  products.map(product => Array.from(product).map(char => char.charCodeAt(0) - 97))
    .forEach((productNumArr, index) => {
      let cur = root

      productNumArr.forEach(num => {
        if (cur.children[num] === null)
          cur.children[num] = new Trie()
        cur = cur.children[num]
        cur.words.add(products[index])
        if (cur.words.size() > 3)
          cur.words.deleteTop()
      })
    })

  let notFind = false
  let cur = root
  Array.from(searchWord, char => char.charCodeAt(0) - 97)
    .forEach(charNum => {
      if (notFind || cur.children[charNum] === null) {
        notFind = true
        res.push([])
      } else {
        const temp: string[] = []
        while (cur.children[charNum].words.size() > 0)
          temp.push(cur.children[charNum].words.deleteTop()!)
        res.push(temp.reverse())
        cur = cur.children[charNum]
      }
    })

  return res
}

interface Edge {
  from: number,
  to: number,
  // 不需要记录 cost
  cost?: number
}

function maximumDetonation(bombs: number[][]): number {
  const graph = new Map<number, Edge[]>()

  // 建图
  // O(n^2)
  for (let i = 0; i < bombs.length; i++) {
    const edgesI = graph.get(i) ?? []
    const [xi, yi, ri] = bombs[i]

    for (let j = i + 1; j < bombs.length; j++) {
      const [xj, yj, rj] = bombs[j]
      // i can to j
      if (ri ** 2 >= ((xi - xj) ** 2 + (yi - yj) ** 2))
        edgesI.push({ from: i, to: j, cost: 0 })
      graph.set(i, edgesI)

      const edgesJ = graph.get(j) ?? []
      // j can to i
      if (rj ** 2 >= ((xi - xj) ** 2 + (yi - yj) ** 2))
        edgesJ.push({ from: j, to: i, cost: 0 })
      graph.set(j, edgesJ)
    }
  }

  let maxBombs = 0
  // 每个点都试一下，看谁炸的最多
  for (let i = 0; i < bombs.length; i++) {
    const visited = Array(bombs.length).fill(false)
    const queue = [i]
    visited[i] = true
    let bombsCount = 1

    while (queue.length > 0) {
      const cur = queue.pop()!

      for (const { from, to } of Array.from(graph.get(cur) ?? [])) {
        if (visited[to] === false) {
          queue.push(to)
          visited[to] = true
          bombsCount++
        }
      }
    }

    console.log(i, bombsCount)
    maxBombs = Math.max(maxBombs, bombsCount)
  }


  return maxBombs
}

// console.log(maximumDetonation([[1,2,3],[2,3,1],[3,4,2],[4,5,3],[5,6,4]]))

function furthestBuilding(heights: number[], bricks: number, ladders: number): number {
  const queue = new PriorityQueue<number>((a, b) => a - b)
  let bricksUsed = 0

  for (let i = 1; i < heights.length; i++) {
    const needBricks = heights[i] - heights[i - 1]
    if (needBricks <= 0)
      continue

    queue.add(needBricks)
    if (queue.size() > ladders) {
      bricksUsed += queue.deleteTop()!
      if (bricksUsed > bricks)
        return i - 1
    }
  }

  return heights.length - 1
}

// console.log(furthestBuilding([4, 2, 7, 6, 9, 14, 12], 5, 1))

function findKthLargest(nums: number[], k: number): number {
  const n = nums.length
  let find = false
  let result = 0

  dfs(0, n-1)

  return result

  function dfs(left: number, right: number) {
    if (left > right) return
    if (find) return

    const mid = left + Math.trunc((right - left) / 2)
    const res = partition(mid, left, right)

    if (res === (n-k)) {
      find = true
      result = nums[res]
    } else if (res > n - k) {
      dfs(left, res - 1)
    } else {
      dfs(res + 1, right)
    }
  }

  function partition(index: number, start: number, end: number): number {
    swap(index, end)

    let i = start, j = start

    while (i < end) {
      if (nums[i] <= nums[end])
        swap(j++, i)

      i++
    }
    swap(j, end)
    return j
  }

  function swap(i: number, j: number) {
    if (i === j) return

    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
  }
}

// console.log(findKthLargest([7,6,5,4,3,2,1], 5))