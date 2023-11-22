class TrieNode {
  next: [TrieNode | null, TrieNode | null]
  count: number

  constructor() {
    this.next = [null, null]
    this.count = 0
  }
}

function countPairs(nums: number[], low: number, high: number): number {
  return countSmallerPairs(high + 1)
    - countSmallerPairs(low)

  function countSmallerPairs(num: number): number {
    const root = new TrieNode()
    let count = 0

    for (let i = 0; i < nums.length; i++) {
      //
      count += countSmallThan(root, nums[i], num)
      insert(root, nums[i])
    }

    return count
  }

  function countSmallThan(root: TrieNode, num: number, th: number): number {
    let node = root
    let count = 0

    for (let i = 31; i >= 0; i--) {
      const c = (th >> i) & 1
      const b = (num >> i) & 1
      // a ^ b = c
      const a = b ^ c

      if (c === 1) {
        if (a === 1) {
          if (node.next[0] !== null) count += node.next[0].count

          if (node.next[1] !== null) node = node.next[1]
          else break
        } else {
          if (node.next[1] !== null) count += node.next[1].count

          if (node.next[0] !== null) node = node.next[0]
          else break
        }
      } else {
        if (a === 1) {
          if (node.next[1] !== null) node = node.next[1]
          else break
        } else {
          if (node.next[0] !== null) node = node.next[0]
          else break
        }
      }

      // if (a === 1 && c === 1) {
      //   if (node.next[0] !== null) count += node.next[0].count
      //
      //   if (node.next[1] !== null) node = node.next[1]
      //   else break
      // } else if (a === 0 && c === 1) {
      //   if (node.next[1] !== null) count += node.next[1].count
      //
      //   if (node.next[0] !== null) node = node.next[0]
      //   else break
      // } else if (a === 1 && c === 0) {
      //   if (node.next[1] !== null) node = node.next[1]
      //   else break
      // } else {
      //   if (node.next[0] !== null) node = node.next[0]
      //   else break
      // }
    }

    return count
  }

  function insert(root: TrieNode, num: number) {
    const binaryStr = num.toString(2)
    let node = root

    for (let i = 31; i >= 0; i--) {
      if ((num & (1 << i)) > 0) {
        if (node.next[1] === null) node.next[1] = new TrieNode()
        node.next[1].count++
        node = node.next[1]
      } else {
        if (node.next[0] === null) node.next[0] = new TrieNode()
        node.next[0].count++
        node = node.next[0]
      }
    }
  }
}