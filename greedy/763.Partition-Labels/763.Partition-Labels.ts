interface OccurPos {
  first: number
  last: number
}

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 * @param s
 */
function partitionLabels(s: string): number[] {
  const res = []
  const map = new Map<string, OccurPos>()
  const arr = Array.from(s)
  const n = arr.length

  arr.forEach((char, index) => {
    if (map.has(char))
      map.get(char).last = index
    else
      map.set(char, { first: index, last: index })
  })

  for (let i = 0; i < n;) {
    let start = i
    let end = start

    while (start < n && start <= end) {
      end = Math.max(end, map.get(arr[start]).last)
      start++
    }

    res.push(end - i)
    i = start + 1
  }

  return res
}