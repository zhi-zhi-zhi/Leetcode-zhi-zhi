class MyPriorityQueue<T> {
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

    getArr(): T[] {
        return this.arr
    }

    top(): T | undefined {
        return this.arr.length > 0 ? this.arr[0] : undefined
    }

    add(val: T) {
        const {arr, compareFunc} = this
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
        const {arr} = this

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
        const {arr} = this
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

        const {arr, compareFunc} = this

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

function earliestSecondToMarkIndices(nums: number[], changeIndices: number[]): number {
    const n = nums.length, m = changeIndices.length
    let res = -1

    const arr = Array.from(Array(n), () => [])
    const indexHelp = Array(n).fill(0)

    for (let i = 0; i < changeIndices.length; i++)
        arr[changeIndices[i] - 1].push(i)
    let earliest = -1
    for (let i = 0; i < n; i++) {
        if (arr[i].length === 0) return -1
        earliest = Math.max(earliest, arr[i][0])
    }
    for (let i = 0; i < n; i++) {
        let j = 0
        while (j < arr[i].length - 1) {
            if (arr[i][j] <= earliest && arr[i][j+1] <= earliest)
                j++
            else
                break
        }
        indexHelp[i] = j
    }
    const pq = new MyPriorityQueue<[number, number]>(
        (a, b) => a[1] - b[1])
    for (let i = 0 ; i < n; i++)
        pq.add([i, arr[i][indexHelp[i]]])

    let cost = 0
    while (pq.size() > 0) {
        // 你可以执行以下操作 之一 ：
        const [i, time] = pq.top()
        if (time >= cost + nums[i] + 1) {
            cost += nums[i] + 1
            pq.deleteTop()
            if (pq.size() === 0)
                res = time
        } else {
            if (indexHelp[i] === arr[i].length - 1) return -1
            indexHelp[i]++
            pq.replaceTopAndAdjustment([i, arr[i][indexHelp[i]]])
        }
    }

    return res + 1
}

console.log(earliestSecondToMarkIndices([2,2,0]
    ,[2,2,2,2,3,2,2,1]))
console.log(earliestSecondToMarkIndices([1,3]
    ,[1,1,1,2,1,1,1]))