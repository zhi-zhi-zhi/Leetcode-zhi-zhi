interface Item {
  // 原值
  value: number,
  // 在原数组的下标
  originIndex: number,
  // 左边的 abs(indices difference)
  left: number,
  // 右边的 abs(indices difference)
  right: number,
}

function getDistances(arr: number[]): number[] {
  const length = arr.length
  const result:number[] = Array(length).fill(0)

  // 排序
  const temp = Array.from(arr, (item, index) => {
    return {
      value: item,
      originIndex: index,
      // 左边的 abs 和
      left: 0,
      // 右边的 abs 和
      right: 0,
    } as Item
  }).sort((a, b) => a.value - b.value)

  // 记录有多少个重复的
  let sameCount = 1;
  // 记录当前是第几个重复的
  let cur = 0;

  temp.forEach((item, index) => {
    if (index > 0 && item.value === temp[index - 1].value) {
      // 当前是重复值，利用已算过的
      cur++

      const indexAbsDiff = item.originIndex - temp[index - 1].originIndex

      item.left = temp[index - 1].left + (cur) * indexAbsDiff
      item.right = temp[index - 1].right - (sameCount - cur) * (indexAbsDiff)
    } else {
      // 第一个，直接算
      sameCount = 1
      cur = 0


      for (let i = index + 1; i < length; i++) {
        const nextItem = temp[i]
        if (nextItem.value !== item.value)
          break

        sameCount++
        item.right += nextItem.originIndex - item.originIndex
      }
    }

    // 左边的 abs indices diff + 右边的 abs indices diff
    // 等于 all abs indices diff
    result[item.originIndex] = item.left + item.right
  })

  return result
}