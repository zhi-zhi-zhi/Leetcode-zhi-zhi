function takeCharacters(s: string, k: number): number {
  const count = [0, 0, 0]
  const arr = Array.from(s).map(char => char.charCodeAt(0) - 97)
  const n = s.length

  for (const num of arr)
    count[num]++

  if (count.some(itemCount => itemCount < k))
    return -1

  // hash 前缀
  // 两侧最短，就是中间最长
  // 中间最长需要满足的是：
  // curcount[i] - precount[0] <= count[0] - k
  // curCount[1] - preCount[1] <= count[1] - k
  // curCount[2] - preCount[2] <= count[2] - k

  const needCount = count.map(itemCount => itemCount - k)
  const aMap = new Map<number, number>()
  let aCount = 0
  const bMap = new Map<number, number>()
  let bCount = 0
  const cMap = new Map<number, number>()
  let cCount = 0

  let res = n

  for (let i = 0; i < arr.length; i++) {
    switch (arr[i]) {
      case 0: aCount++; break;
      case 1: bCount++; break;
      case 2: cCount++; break;
    }
  }

  return n
};
