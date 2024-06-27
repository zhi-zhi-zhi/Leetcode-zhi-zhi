function negativeSort(nums: number[]) {
  const n = nums.length

  // keep in-place
  // [2, 1, 1, -2]
  // [-2, 1, 1, 2]

  // O(n) 肯定做不了
  // O(n * log(n)): 归并

  // function merge(left: number, right: number) {
  // }

  function iterator() {
    let left = 0, right = 0
    const extraPlace: number[] = []

    // negative: in-place
    // keep positive in-place
    while (right < n) {
      if (nums[right] < 0) {
        const temp = nums[right]
        nums[right] = nums[left]
        nums[left] = temp

        left++
        right++
      } else {
        extraPlace.push(nums[right])
        right++
      }
    }

    for (let i = left; i < n; i++) {
      nums[i] = extraPlace[i - left]
    }
  }
}


// function convertMatrixZero(matrix: number[][]): void {
//   const rowSet = new Set<number>();
//   const colSet = new Set<number>();
//
//   const m = matrix.length
//   const n = matrix[0].length
//
//   for (let i = 0; i < m; i++) {
//     for (let j = 0; j < n; j++) {
//       if (matrix[i][j] === 0) {
//         rowSet.add(i)
//         colSet.add(j)
//       }
//     }
//   }
//
//
//
//
//   for (const row of Array.from(rowSet)) {
//     for (let j = 0; j < n; j++) {
//       matrix[row][j] = 0
//     }
//   }
//
//   for (const col of Array.from(colSet)) {
//     for (let i = 0; i < m; i++) {
//       matrix[i][col] = 0
//     }
//   }
// }