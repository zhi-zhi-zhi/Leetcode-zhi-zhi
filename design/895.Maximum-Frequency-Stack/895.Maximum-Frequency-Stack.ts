class FreqStack {
  /** 访问最频繁 **/
  maxFreq: number
  /**
   * key: number, push 的 数
   * val: number, key 被 push（减去pop） 的次数
   */
  freqMap: Map<number, number>
  /**
   * key: number, 数的 frequency
   * val: number[], 不同 frequency 都有其对应的栈
   */
  map: Map<number, number[]>

  constructor() {
    this.maxFreq = 0
    this.freqMap = new Map<number, number>()
    this.map = new Map<number, number[]>()
  }

  push(val: number): void {
    // 维护 val 的 frequency
    this.freqMap.set(val, (this.freqMap.get(val) ?? 0) + 1)
    // 维护访问最频繁
    this.maxFreq = Math.max(this.maxFreq, this.freqMap.get(val))

    if (!this.map.has(this.maxFreq))
      this.map.set(this.maxFreq, [])
    // 维护 val 至对应 frequency 的栈
    this.map.get(this.freqMap.get(val))!.push(val)
  }

  pop(): number {
    const res = this.map.get(this.maxFreq)!.pop()
    // 维护 val 的 frequency
    this.freqMap.set(res, this.freqMap.get(res)! - 1)
    // 维护访问最频繁
    if (this.map.get(this.maxFreq).length === 0)
      this.maxFreq--

    return res
  }
}

/**
 * Your FreqStack object will be instantiated and called as such:
 * var obj = new FreqStack()
 * obj.push(val)
 * var param_2 = obj.pop()
 */