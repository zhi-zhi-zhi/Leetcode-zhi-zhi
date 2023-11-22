class MyPriorityQueue<T> {
  private readonly arr: T[];
  /**
   * 小顶堆：(a, b) => a - b
   * 大顶堆：(a, b) => b - a
   */
  private compareFunc: (a: T, b: T) => number;

  constructor(compareFunc: (a: T, b: T) => number) {
    this.arr = [];
    this.compareFunc = compareFunc;
  }

  size(): number {
    return this.arr.length;
  }

  top(): T | undefined {
    return this.arr.length > 0 ? this.arr[0] : undefined;
  }

  add(val: T) {
    const {arr, compareFunc} = this;
    arr.push(val);
    percolateUp();

    /**
     * 自底向上冒泡
     * @param start
     * @param end
     */
    function percolateUp(start: number = arr.length - 1, end: number = 0) {
      if (start <= end) return;

      const originalChildValue = arr[start];
      let childIndex = start;
      let parentIndex = Math.floor((start - 1) / 2);

      while (parentIndex >= end && compareFunc(arr[parentIndex], originalChildValue) >= 0) {
        arr[childIndex] = arr[parentIndex];
        childIndex = parentIndex;
        parentIndex = Math.floor((parentIndex - 1) / 2);
      }

      arr[childIndex] = originalChildValue;
    }
  }

  deleteTop(): T | undefined {
    const {arr} = this;

    if (arr.length === 0) return undefined;
    else if (arr.length === 1) return arr.pop();

    const res = this.arr[0];
    // @ts-ignore
    arr[0] = arr.pop();
    this.percolateDown();

    return res;
  }

  /**
   * 替换堆顶元素
   */
  replaceTopAndAdjustment(val: T) {
    const {arr} = this;
    if (arr.length === 0)
      return;

    arr[0] = val;
    this.percolateDown();
  }

  // static from<T>(val: T[]): MyPriorityQueue<T> {
  //   const
  // }

  private percolateDown(start: number = 0, end: number = this.arr.length - 1) {
    if (end <= start) return;

    const {arr, compareFunc} = this;

    const originalParentVal = this.arr[start];
    let parentIndex = start,
      childIndex = parentIndex * 2 + 1;

    while (childIndex <= end) {
      // find the fit index between left child and right child
      if (childIndex + 1 <= end && compareFunc(arr[childIndex], arr[childIndex + 1]) >= 0) {
        childIndex++;
      }

      if (compareFunc(originalParentVal, arr[childIndex]) >= 0) {
        arr[parentIndex] = arr[childIndex];
        parentIndex = childIndex;
        childIndex = childIndex * 2 + 1;
      } else {
        break;
      }
    }

    arr[parentIndex] = originalParentVal;
  }
}


function maximumScore(nums: number[], k: number): number {
  const module = 1e9 + 7
  const help = nums.map((num, index) => [num, countPrimeFactors(num), index])
  let res = 1

  const pq = new MyPriorityQueue((a, b) => -(a[0] - b[0]))
  for (const num of help)
    pq.add(num)

  while (k > 0) {
    const item = pq.deleteTop()!;

    const right = upperBound(help, item[1], item[2])
    const left = lastUpperBound(help, item[1], 0, item[2])

    if ((left))
  }

  return res
}



/**
 * 第一个 < target 的下标
 * @param nums
 * @param target
 */
function upperBound(nums: number[][], target: number, start?: number, end?: number): number {
  let left = start ?? 0, right = end ?? nums.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    // if (nums[mid] <= target) {
    //   left = mid + 1
    // } else {
    //   right = mid - 1
    // }

    if (nums[mid][1] < target) {
      left = mid + 1
    } else if (nums[mid][1] > target) {
      right = mid - 1
    } else {
      right = mid - 1
    }
  }

  return right
}


/**
 * 最后 < target 的下标
 * @param nums
 * @param target
 */
function lastUpperBound(nums: number[][], target: number, start?: number, end?: number): number {
  let left = start ?? 0, right = end ?? nums.length - 1

  while (left <= right) {
    const mid = left + Math.floor((right - left) / 2)

    // if (nums[mid] <= target) {
    //   left = mid + 1
    // } else {
    //   right = mid - 1
    // }

    if (nums[mid] < target) {
      left = mid + 1
    } else if (nums[mid] > target) {
      right = mid - 1
    } else {
      right = mid - 1
    }
  }

  return right
}


// 判断是否为质数
function isPrime(number: number) {
  if (number <= 1) return false
  if (number <= 3) return true

  if (number % 2 === 0 || number % 3 === 0) return false

  for (let i = 5; i * i <= number; i += 6) {
    if (number % i === 0 || number % (i + 2) === 0) return false
  }

  return true
}

// 计算质因数个数
function countPrimeFactors(number) {
  let count = 0
  const set = new Set()

  for (let i = 2; i <= number; i++) {
    while (number % i === 0 && isPrime(i)) {
      if (!set.has(i))
        count++
      number /= i
      set.add(i)
    }
  }

  return count
}

// 计算数组中每个元素的质因数个数
function countPrimeFactorsInArray(arr) {
  const result = []

  for (let i = 0; i < arr.length; i++) {
    const num = arr[i]
    const primeFactorCount = countPrimeFactors(num)
    result.push(primeFactorCount)
  }

  return result
}

const inputArray = [12, 15, 28, 29]
const primeFactorCounts = countPrimeFactorsInArray(inputArray)
console.log(primeFactorCounts) // 输出每个元素的质因数个数
