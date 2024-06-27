// // function minWindow(s: string, t: string): string {
// //     if (s.length < t.length) return ''
// //     const set = new Set(Array.from(t))
// //     const arr = Array(52 + 6).fill(0)
// //     let diff = 0
// //
// //     for (let i = 0; i < t.length; i++) {
// //         if (arr[t.charCodeAt(i) - 65]++ === 0)
// //             diff++
// //     }
// //
// //     let left = 0, right = 0
// //     let res = s + ","
// //
// //     while (right < s.length) {
// //         if (set.has(s[right])) {
// //             if (arr[s.charCodeAt(right) - 65]-- === 1)
// //                 diff--
// //
// //             if (diff === 0) {
// //                 while (diff === 0) {
// //                     if (set.has(s[left])) {
// //                         if (arr[s.charCodeAt(left) - 65]++ === 0)
// //                             diff++
// //                     }
// //                     left++
// //                 }
// //                 if (right - left + 1 < res.length) {
// //                     res = s.substring(left - 1, right + 1)
// //                 }
// //             }
// //         }
// //
// //         right++
// //     }
// //
// //     return res === s + "," ? '' : res
// // };
// //
// // minWindow('ADOBECODEBANC', 'ABC')
// //
// /**
//  Do not return anything, modify matrix in-place instead.
//  */
// function rotate(matrix: number[][]): void {
//     // 找到旋转后的位置与旋转前位置的关联
//     // 1. 第 i 行 元素旋转到第 n-1 - i 列元素
//     // 2. 第 j 列元素旋转到第 i 行
//     // 即原位置 matrix[i][j]
//     // 旋转后再 matrix[j][n-1 - i]
//
//     // 对于一个正方形，分两种情况讨论
//     // 1. 边长为偶数：整个正方形可以分成四小块，该四小块进行旋转
//     // 2. 边长为奇数：忽略中间格子，中轴线上四份分给四小块，同样分成四块
//     const n = matrix.length
//     for (let i = 0; i < n / 2; i++) {
//         for (let j = 0; j < Math.ceil(n / 2); j++) {
//             const temp = matrix[i][j]
//             matrix[i][j] = matrix[(n-1) - j][i]
//             matrix[(n-1) - j][i] = matrix[(n-1) - i][(n-1) - j]
//             matrix[(n-1) - i][(n-1) - j] = matrix[j][(n-1) - i]
//             matrix[j][(n-1) - i] = temp
//         }
//     }
// };
//
// rotate([[1,2,3],[4,5,6],[7,8,9]])
function largestRectangleArea(heights: number[]): number {
    const stack = []
    let res = heights[0]

    for (let i = 0; i < heights.length; i++) {
        while (stack.length > 0 && heights[stack.at(-1)] > heights[i]) {
            const index = stack.pop()
            const left = (stack.at(-1) ?? -1) + 1, right = i
            const w = right - left
            const area = heights[index] * w
            res = Math.max(res, area)
        }
        stack.push(i)
    }

    for (let i = 0; i < stack.length; i++) {
        const index = stack[i]
        const h = heights[index]
        // const w = stack.at(-1) - (i > 0 ? index : 0) + 1
        const w = stack.at(-1) - (stack[i-1] ?? -1)
        const area = w * h
        res = Math.max(res, area)
    }

    return res
};

// console.log(largestRectangleArea([2,1,5,6,2,3]))
// console.log(largestRectangleArea([5,4,1,2]))
// console.log(largestRectangleArea([2, 4]))

function findKthLargest(nums: number[], k: number): number {
    // 快速排序思想
    let left = 0, right = nums.length - 1
    while (true) {
        const index = pivot(nums, left, right)
        if ((index + k) === nums.length) {
            return nums[index]
        } else if ((index + k) > nums.length) {
            right = index - 1
        } else {
            left = index + 1
        }
    }

    return nums[k-1]

    function quickSort(nums: number[]) {
        part(nums, 0, nums.length - 1)
    }
    function part(nums: number[], left: number, right: number) {
        if (left >= right) return

        const index = pivot(nums, left, right)
        part(nums, left, index-1)
        part(nums, index+1, right)
    }

    function pivot(nums: number[], left: number, right: number) {
        const randomIndex = left + Math.floor(Math.random() * (right - left ))

        // 把当前位置放到最后面
        {
            const temp = nums[right]
            nums[right] = nums[randomIndex]
            nums[randomIndex] = temp
        }

        // 单指针
        // let lessIndex = left
        // for (let i = left; i < right; i++) {
        //     if (nums[i] < nums[right]) {
        //         const temp = nums[lessIndex]
        //         nums[lessIndex] = nums[i]
        //         nums[i] = temp
        //         lessIndex++
        //     }
        // }

        // 交换回来
        // {
        //     const temp = nums[right]
        //     nums[right] = nums[lessIndex]
        //     nums[lessIndex] = temp
        // }
        // return lessIndex

        // 双指针
        let i = left - 1, j = right
        while (i < j) {
            do {
                i++
            } while (nums[i] < nums[right])
            do {
                j--
            } while (nums[j] > nums[right])

            if (i < j && nums[i] > nums[j]) {
                // nums[i] >= nums[right]
                // nums[j] <= nums[right]
                swap(nums, i, j)
            }
        }

        // i >= j && nums[i]  >= nums[right]
        swap(nums, i, right)
        return i
    }

    function swap(nums: number[], i: number, j: number) {
        const temp = nums[i]
        nums[i] = nums[j]
        nums[j] = temp
    }
};


function topKFrequent(nums: number[], k: number): number[] {
    const map = new Map<number, number>()

    for (const num of nums) {
        map.set(num, (map.get(num) ?? 0) + 1)
    }

    const arr = Array.from(map.entries())

    let left = 0, right = arr.length - 1

    while (left < right) {
        const index = quickSortCore(arr, left, right,
            (a, b) =>
                -(a[1] - b[1])
        )

        if (index === k) return arr.slice(0, k).map(item => item[0])
        else if (index > (k - 1)) right = index - 1
        else left = index + 1
    }

    return []
};

function quickSortCore<T>(nums: T[], left: number, right: number, compareFunc: (a: T, b: T) => number) {
    const randomIndex = left + Math.floor((right - left + 1) * Math.random())
    swap(nums, randomIndex, right)

    let i = left - 1, j = right
    while (i < j) {
        do { i++ } while (i < right && compareFunc(nums[i], nums[right]) < 0)
        do { j-- } while (j >= 0 && compareFunc(nums[j], nums[right]) > 0)
        if (i < j) swap(nums, i, j)
    }

    swap(nums, i, right)
    return i
}

function swap<T>(nums: T[], i: number, j: number) {
    const temp = nums[i]
    nums[i] = nums[j]
    nums[j] = temp
}

// console.log(topKFrequent([2,3,4,1,4,0,4,-1,-2,-1], 2))
function findDuplicate(nums: number[]): number {
    for (let i = 0; i < nums.length; i++) nums[i]--

    for (let i = 0; i < nums.length; i++) {
        if (nums[i] === i) continue

        while (nums[i] !== i) {
            // 位置已经被占了
            if (nums[nums[i]] === nums[i]) {
                return nums[i] + 1
            }

            const temp = nums[nums[i]]
            nums[nums[i]] = nums[i]
            nums[i] = temp
        }
    }

    return nums[nums.length-1]
};

findDuplicate([1,3,4,2,2])