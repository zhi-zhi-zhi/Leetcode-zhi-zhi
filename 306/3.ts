function smallestNumber(pattern: string): string {
  const arr = [1]

  for (const char of pattern) {
    // arr.push(Math.max(arr) + 1)
    if (char === 'I') {
      arr.push(Math.max(...arr) + 1)
    } else {
      // 满足 arr[i] < arr[i-1] 的同时，num最小
      // 贪心：
      // 1. 让前面的字符串尽可能的小，当前数字尽可能的大
      // 2. arr[i] = arr[i-1]-1
      //    1. 检验 arr[i] 是否已存在
      //       1. 若已存在，找到位置 j，arr[j] 是第一个 > arr[i] 的
      //           arr[j] 到 arr[i] 整体 + 1

      const num = (arr[arr.length-1]!) - 1
      arr.push(num)

      let j: number = 0
      for (let i = 0; i < arr.length; i++)
        if (arr[i] > num) {
          j = num
          break
        }

      for (let i = j; i < arr.length; i++)
        arr[i] = arr[i] + 1
    }
  }

  return arr.join('')
}

