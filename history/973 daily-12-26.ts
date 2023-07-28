function kClosest(points: number[][], k: number): number[][] {
  // 1. Priority queue  （base on heap sort）
  // 2. Partition （base on quick sort）

  // use 2

  const compareFun = (a: number[], b: number[]) => {
    return (a[0] * a[0] + a[1] * a[1]) - (b[0] * b[0] + b[1] * b[1])
  }

  let start: number = 0, end: number = points.length - 1

  while (true) {
    const resultIndex = partition(points, start, end, compareFun)
    if (resultIndex === k - 1) {
      return points.slice(0, k)
    } else if (resultIndex > k - 1) {
      end = resultIndex - 1
    } else {
      start = resultIndex + 1
    }
  }

  return []
}


function partition<T>(nums: Array<T>, start: number, end: number, compare: (a: T, b: T) => number): number {
  swap(nums, start, end)

  let min = start - 1
  for (let i = start; i < end; i++) {
    if (compare(nums[i], nums[end]) < 0) {
      min++
      if (min !== i) {
        swap(nums, min, i)
      }
    }
  }

  min++
  swap(nums, min, end)

  return min
}

function swap<T>(nums: T[], i: number, j: number) {
  const temp = nums[i] as any
  nums[i] = nums[j] as any
  nums[j] = temp
}