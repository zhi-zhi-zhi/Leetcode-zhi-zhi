function findIndices(nums: number[], indexDifference: number, valueDifference: number): number[] {
  const arr = nums.map((num, index) => [num, index])
    .sort((a, b) => a[0] - b[0])

  const n = arr.length
  let left = 0 , right = 0
  let minLeftIndex = 0, maxLeftIndex = 0

  while (right < n) {
    if (Math.abs(arr[right][1] - arr[minLeftIndex][1]) >= indexDifference
      && arr[right][0] - arr[minLeftIndex][0] >= valueDifference
    ) {
      return [Math.max(arr[right][1], arr[minLeftIndex][1]), Math.min(arr[right][1], arr[minLeftIndex][1])]
    }

    if (Math.abs(arr[right][1] - arr[maxLeftIndex][1]) >= indexDifference
      && arr[right][0] - arr[maxLeftIndex][0] >= valueDifference
    ) {
      return [Math.max(arr[right][1], arr[maxLeftIndex][1]), Math.min(arr[right][1], arr[maxLeftIndex][1])]
    }

    while (left <= right && arr[right][0] - arr[left][0] >= valueDifference) {
      if (arr[left][1] < arr[minLeftIndex][1]) {
        minLeftIndex = left
      }

      if (Math.abs(arr[right][1] - arr[minLeftIndex][1]) >= indexDifference) {
        return [Math.max(arr[right][1], arr[minLeftIndex][1]), Math.min(arr[right][1], arr[minLeftIndex][1])]
      }

      if (arr[left][1] > arr[maxLeftIndex][1]) {
        maxLeftIndex = left
      }

      if (Math.abs(arr[right][1] - arr[maxLeftIndex][1]) >= indexDifference) {
        return [Math.min(arr[right][1], arr[maxLeftIndex][1]), Math.max(arr[right][1], arr[maxLeftIndex][1])]
      }

      left++
    }

    right++
  }

  return [-1, -1]
};

// console.log(findIndices([1,3,4,4], 2,2))