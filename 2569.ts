class LazySumSegTree {
  tree: number[];
  lazyTag: number[];
  lazyVal: number[];
  nums: number[];

  constructor(nums: number[]) {
    this.nums = nums;
    this.tree = Array(nums.length * 4).fill(0);
    this.lazyTag = Array(nums.length * 4).fill(0);
    this.lazyVal = Array(nums.length * 4).fill(0);
    this._build(0, 0, this.nums.length - 1);
  }

  private _build(root: number, start: number, end: number) {
    if (start === end) {
      this.tree[root] = this.nums[start];
      return;
    }

    const mid = start + ((end - start) >> 1);

    this._build(root * 2 + 1, start, mid);
    this._build(root * 2 + 2, mid + 1, end);
    this.tree[root] = this.tree[root * 2 + 1] + this.tree[root * 2 + 2];
  }

  updateRange(left: number, right: number) {
    this._updateRange(0, 0, this.nums.length - 1, left, right)
  }

  private _updateRange(root: number, start: number, end: number, left: number, right: number) {
    // out of boundary
    if (end < start) return;
    // not covered by [left, right] with flips
    if (right < start || end < left) return;
    // completed covered with [left, right]
    if (left <= start && end <= right) {
      this.tree[root] = (end - start + 1) - this.tree[root];
      this.lazyTag[root] = 1;
      this.lazyVal[root] += 1;
      return;
    }

    // non-left node
    // [start, end] partially overlap with [left, right]
    if (end > start) {
      const mid = start + ((end - start) >> 1);
      this._pushDown(root, start, end)

      this._updateRange(root * 2 + 1, start, mid, left, right);
      this._updateRange(root * 2 + 2, mid + 1, end, left, right);
      this.tree[root] = this.tree[root * 2 + 1] + this.tree[root * 2 + 2]
    }
  }

  private _pushDown(root: number, start: number, end: number) {
    if (end <= start) return

    if (this.lazyTag[root] === 1) {
      if (this.lazyVal[root] % 2 === 1) {
        // odd should flip
        const mid = start + ((end - start) >> 1)
        this.tree[root * 2 + 1] = (mid - start + 1) - this.tree[root * 2 + 1];
        this.tree[root * 2 + 2] = (end - mid) - this.tree[root * 2 + 2];
        this.lazyTag[root * 2 + 1] = 1;
        this.lazyTag[root * 2 + 2] = 1;
        this.lazyVal[root * 2 + 1] += this.lazyVal[root];
        this.lazyVal[root * 2 + 2] += this.lazyVal[root];
      }

      this.lazyTag[root] = 0;
      this.lazyVal[root] = 0;
    }
  }

  queryRange(left: number, right: number): number {
    return this._queryRange(0, 0, this.nums.length - 1, left, right)
  }

  private _queryRange(root: number, start: number, end: number, left: number, right: number): number {
    if (right < start || end < left) return 0
    if (left <= start && end <= right) return this.tree[root]

    if (start < end) {
      this._pushDown(root, start, end)
      const mid = start + ((end - start) >> 1)
      const res = this._queryRange(root * 2 + 1, start, mid, left, right)
        + this._queryRange(root * 2 + 2, mid + 1, end, left, right)

      this.tree[root] = this.tree[root * 2 + 1] + this.tree[root * 2 + 2]

      return res
    }

    // shouldn't reach hear
    return this.tree[root]
  }
}

function handleQuery(nums1: number[], nums2: number[], queries: number[][]): number[] {
  const segTree = new LazySumSegTree(nums1)
  let sum = nums2.reduce((res, num) => res + num, 0)
  const res: number[] = []

  for (const [type, l, r] of queries) {
    if (type === 1) segTree.updateRange(l, r)
    else if (type === 2) sum += segTree.queryRange(0, nums1.length - 1) * l
    else res.push(sum)
  }

  return res
};
