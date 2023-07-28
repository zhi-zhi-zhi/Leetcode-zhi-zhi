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

interface Student {
  name: string
  score: number
}

/**
 * 学习自：https://leetcode.cn/problems/sequentially-ordinal-rank-tracker/solution/shuang-ding-dui-jian-mo-hao-ban-chai-ban-wzgv/
 */
class SORTracker {
  // 大顶堆：差班
  maxHeap: PriorityQueue<Student>
  // 小顶堆：好班
  minHeap: PriorityQueue<Student>

  constructor() {
    // 堆顶是成绩最差的（名字相同时，名字最大的）
    this.minHeap = new PriorityQueue<Student>((a, b) => a.score !== b.score
      ? a.score - b.score
      : a.name > b.name ? -1 : 1)
    // 堆顶是成绩最好的（名字相同时，名字最小的）
    this.maxHeap = new PriorityQueue<Student>((a, b) => a.score !== b.score
      ? b.score - a.score
      : b.name > a.name ? -1 : 1)
  }

  add(name: string, score: number): void {
    // 新来的可能在差班，可能在好班
    // 统一：先加入至好班，再从好班中淘汰一名最差的学生去差班
    this.minHeap.add({ name, score })
    this.maxHeap.add(this.minHeap.deleteTop())
  }

  get(): string {
    // 把差班最好的学生加入好班
    // 可以保证，这个差班最好的学生，比好班最坏的学生差
    this.minHeap.add(this.maxHeap.deleteTop())
    return this.minHeap.top().name
  }
}

/**
 * Your SORTracker object will be instantiated and called as such:
 * var obj = new SORTracker()
 * obj.add(name,score)
 * var param_2 = obj.get()
 */
//
// var obj = new SORTracker()
// obj.add("bradford", 2)
// obj.add("branford", 3)
// console.log(obj.get())
// obj.add("alps", 2)
// console.log(obj.get())
// obj.add("orland", 2)
// console.log(obj.get())
// obj.add("orlando", 3)
// console.log(obj.get())
// obj.add("alpine", 2)
// console.log(obj.get())
// console.log(obj.get())
