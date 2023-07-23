function palindromePairs(words: string[]): number[][] {
  const isPalindrome = (str: string) => {
    let l = 0, r = str.length - 1;
    while (l < r) {
      if (str[l++] != str[r--]) return false; // 我很不想这么写，尽量一句话做一件事吧
    }
    return true;
  };

  // 记录每个字符串翻转后的情况
  const reversedMap = new Map<string, number>();
  for (let i = 0; i < words.length; i++) {
    const reversed = Array.from(words[i]).reverse().join("");
    reversedMap.set(reversed, i);
  }

  const res: number[][] = [];
  for (let i = 0; i < words.length; i++) {
    const curWord = words[i];

    // 如果自身就是一个回文串
    // words[i] 长度 === words[j] 长度
    if (isPalindrome(curWord) && reversedMap.has("") && curWord !== "") {
      res.push([reversedMap.get("")!, i]);
      res.push([i, reversedMap.get("")!]);
    }

    // words[i] 长度 === words[j] 长度
    if (![undefined, i].includes(reversedMap.get(curWord)))
      res.push([reversedMap.get(curWord)!, i])

    // words[i] 长度 > words[j] 长度
    // 即可以将 words[i] 视为两部分
    // 1. words[j] 的翻转
    // 2. 回文串
    // 两部分位置可互换
    for (let j = 1; j < curWord.length; j++) {
      const left = curWord.substring(0, j);
      const right = curWord.substring(j);

      // words[i] 在右边
      if (isPalindrome(left) && reversedMap.has(right)) {
        res.push([reversedMap.get(right)!, i]);
      }

      // words[i] 在左边
      if (isPalindrome(right) && reversedMap.has(left)) {
        res.push([i, reversedMap.get(left)!]);
      }
    }
  }
  return res;
};

// console.log(palindromePairs(["a",""]));




/**
 * 线段树类
 * @param {number[]} nums
 */
var SeqTree = function (nums: number[]) {
  this.nums = nums;
  this.tree = new Array(4 * nums.length).fill(undefined) as number[];
  this.build(0, 0, nums.length - 1);
};

/**
 * 建树方法
 * @param {*} node 当前树节点
 * @param {*} start 当前树节点涵盖范围的起点
 * @param {*} end 当前树节点涵盖范围的终点
 * @return {void}
 */
SeqTree.prototype.build = function (node: number, start: number, end: number) {
  if (start === end) {
    this.tree[node] = this.nums[start];
    return;
  }
  const mid = start + Math.floor((end - start) / 2);
  const leftNode = 2 * node + 1;
  const rightNode = 2 * node + 2;
  this.build(leftNode, start, mid);
  this.build(rightNode, mid + 1, end);
  // this.tree[node] = this.tree[leftNode] + this.tree[rightNode];
  this.tree[node] = Math.max(this.tree[leftNode], this.tree[rightNode])
};

/**
 * 对外使用的更新方法
 * @param {number} index 需要修改的节点下标
 * @param {number} val 需要修改的数值
 * @return {void}
 */
SeqTree.prototype.update = function (index: number, val: number) {
  this.change(0, 0, this.nums.length - 1, index, val);
};

/**
 * 更新树节点
 * @param {*} node 当前树节点
 * @param {*} start 涵盖范围的起点
 * @param {*} end 涵盖范围的终点
 * @param {*} idx 需要修改的节点下标
 * @param {*} val 需要修改的数值
 * @return {void}
 */
SeqTree.prototype.change = function (node: number, start: number, end: number, idx: number, val: number) {
  if (start === end) {
    this.tree[node] = val;
  } else if (idx < start || end < idx) {
    return;
  } else {
    const mid = start + Math.floor((end - start) / 2);
    const leftNode = 2 * node + 1;
    const rightNode = 2 * node + 2;
    if (start <= idx && idx <= mid) {
      this.change(leftNode, start, mid, idx, val);
    } else {
      this.change(rightNode, mid + 1, end, idx, val);
    }
    // this.tree[node] = this.tree[leftNode] + this.tree[rightNode];

    this.tree[node] = Math.max(this.tree[leftNode], this.tree[rightNode])
  }
};

// /**
//  * 对外使用的区间求和方法
//  * @param {number} left 查询区间的左节点
//  * @param {number} right 查询区间的右节点
//  * @return {number} 返回区间和
//  */
// SeqTree.prototype.sumRange = function (left: number, right: number) {
//   return this.query(0, 0, this.nums.length - 1, left, right);
// };

/**
 * 对外使用的区间最大值方法
 * @param {number} left 查询区间的左节点
 * @param {number} right 查询区间的右节点
 * @return {number} 返回区间和
 */
SeqTree.prototype.maxRange = function (left: number = 0, right: number = this.nums.length - 1) {
  return this.query(0, 0, this.nums.length - 1, left, right);
};

/**
 * 查询范围的最大值
 * @param {*} node 当前树节点
 * @param {*} start 涵盖范围的起点
 * @param {*} end 涵盖范围的终点
 * @param {*} l 查询区间的左节点
 * @param {*} r 查询区间的右节点
 * @return {number} 返回区间和
 */
SeqTree.prototype.query = function (node: number, start: number, end: number, l: number, r: number): number {
  if (r < start || end < l) {
    return null;
  } else if (l <= start && end <= r) {
    return this.tree[node];
  } else {
    const mid = start + Math.floor((end - start) / 2);
    const leftNode = 2 * node + 1;
    const rightNode = 2 * node + 2;
    const leftMax = this.query(leftNode, start, mid, l, r);
    const rightMax = this.query(rightNode, mid + 1, end, l, r);

    return Math.max(leftMax, rightMax)
  }
};


class SumAndMaxSegmentTree {
  private nums: number[]
  sumTree: number[]
  maxTree: number[]

  constructor(nums: number[]) {
    this.nums = nums
    this.sumTree = Array(nums.length * 4).fill(0)
    this.maxTree = Array(nums.length * 4).fill(0)
    this._build(0, 0, nums.length - 1)
  }

  private _build(root: number, start: number, end: number) {
    if (start === end) {
      this.sumTree[root] = this.nums[start]
      this.maxTree[root] = this.nums[start]
      return
    }

    const mid = start + ((end - start) >> 1)

    this._build(root * 2 + 1, start, mid)
    this._build(root * 2 + 2, mid + 1, end)
    this.sumTree[root] = this.sumTree[root * 2 + 1] + this.sumTree[root * 2 + 2]
    this.maxTree[root] = Math.max(this.maxTree[root * 2 + 1], this.maxTree[root * 2 + 2])
  }

  update(index: number, value: number) {
    this.nums[index] = value
    this._update(0, 0, this.nums.length - 1, index)
  }

  private _update(root: number, start: number, end: number, index: number) {
    if (start === end) {
      this.sumTree[root] = this.nums[index]
      this.maxTree[root] = this.nums[index]
      return
    }

    const mid = start + ((end - start) >> 1)
    if (index <= mid) this._update(root * 2 + 1, start, mid, index)
    else this._update(root * 2 + 2, mid + 1, end, index)
    this.sumTree[root] = this.sumTree[root * 2 + 1] + this.sumTree[root * 2 + 2]
    this.maxTree[root] = Math.max(this.maxTree[root * 2 + 1], this.maxTree[root * 2 + 2])
  }

  querySum(left: number, right: number): number {
    return this._querySum(0, 0, this.nums.length - 1, left, right)
  }

  private _querySum(root: number, start: number, end: number, left: number, right: number): number {
    if (start === left && end === right) return this.sumTree[root]

    const mid = start + ((end - start) >> 1)

    if (right <= mid) return this._querySum(root * 2 + 1, start, mid, left, right)
    else if (left > mid) return this._querySum(root * 2 + 2, mid + 1, end, left, right)

    const leftSum = this._querySum(root * 2 + 1, start, mid, left, mid)
    const rightSum = this._querySum(root * 2 + 2, mid + 1, end, mid + 1, right)

    return leftSum + rightSum
  }

  queryMax(left: number, right: number): number {
    return this._queryMax(0, 0, this.nums.length - 1, left, right)
  }

  private _queryMax(root: number, start: number, end: number, left: number, right: number): number {
    if (start === left && end === right) return this.sumTree[root]

    const mid = start + ((end - start) >> 1)

    if (right <= mid) return this._queryMax(root * 2 + 1, start, mid, left, right)
    else if (left > mid) return this._queryMax(root * 2 + 2, mid + 1, end, left, right)

    const leftSum = this._queryMax(root * 2 + 1, start, mid, left, mid)
    const rightSum = this._queryMax(root * 2 + 2, mid + 1, end, mid + 1, right)

    return Math.max(leftSum, rightSum)
  }

  queryFirstGreater(left: number, right: number, value: number): [number, number] {
    if (this.maxTree[0] < value) return [-1, -1]
    return this._queryFirstGreater(0, 0, this.nums.length - 1, value)
  }

  private _queryFirstGreater(root: number, start: number, end: number, value: number): [number, number] {
    if (start === end) {
      return [start, this.maxTree[root]]
    }

    const mid = start + ((end - start) >> 1)

    if (this.maxTree[root * 2 + 1] >= value) return this._queryFirstGreater(root * 2 + 1, start, mid, value)
    else return this._queryFirstGreater(root * 2 + 2, mid + 1, end, value)
  }
}


class BookMyShow {
  segTree: SumAndMaxSegmentTree
  n: number
  m: number
  lastZeroRowIndex = -1

  constructor(n: number, m: number) {
    this.segTree = new SumAndMaxSegmentTree(Array(n).fill(m))
    this.n = n
    this.m = m
  }

  gather(k: number, maxRow: number): number[] {
    if (this.segTree.maxTree[0] < k) return []

    const [row, leftSeats] = this.segTree.queryFirstGreater(0, this.n - 1, k)
    if (row > maxRow) return []

    this.segTree.update(row, leftSeats - k)
    return [row, this.m - leftSeats]
  }

  scatter(k: number, maxRow: number): boolean {
    if (maxRow <= this.lastZeroRowIndex) {
      return false
    }
    const sum = this.segTree.querySum(this.lastZeroRowIndex + 1, maxRow)

    if (sum < k) {
      return false
    }

    for (let i = this.lastZeroRowIndex + 1; i <= maxRow; i++) {
      const leftSeats = this.segTree.querySum(i, i)

      if (k >= leftSeats) {
        this.segTree.update(i, 0)
        k -= leftSeats
        this.lastZeroRowIndex = i
      } else {
        this.segTree.update(i, leftSeats - k)
        k = 0
      }

      if (k === 0) break
    }

    return true
  }
}

/**
 * Your BookMyShow object will be instantiated and called as such:
 * var obj = new BookMyShow(n, m)
 * var param_1 = obj.gather(k,maxRow)
 * var param_2 = obj.scatter(k,maxRow)
 */
