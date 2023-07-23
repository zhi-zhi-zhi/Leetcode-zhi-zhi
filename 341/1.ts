function rowAndMaximumOnes(mat: number[][]): number[] {
  let res = [-1, -1]

  for (let i = 0; i < mat.length; i++) {
    let count = mat[i].filter(num => num === 1).length

    if (count > res[1]) {
      res = [i, count]
    }
  }

  return res
};
