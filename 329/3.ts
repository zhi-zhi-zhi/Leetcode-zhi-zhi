function makeStringsEqual(s: string, target: string): boolean {

  /**
   * 1 1 => 1 0 减去一个 1，多出一个0
   * 0 1 => 1 1 减去一个0，多出一个1
   * 0 0 => 0 0
   */

  const s0count = Array.from(s).reduce((res, char) => res + (char === '0' ? 1 : 0), 0)
  const s1Count = s.length - s0count
  const t0count = Array.from(target).reduce((res, char) => res + (char === '0' ? 1 : 0), 0)
  const t1Count = target.length - t0count

  const oneDiff = Math.abs(s1Count - t1Count)

  if (oneDiff === 0) {
    return true
  } else if (t0count === target.length) {
    if (t0count === s0count) return true

    return false
  } else if (t1Count === target.length) {
    if (s1Count > 0) return true
    return false
  } else if (s0count === s.length) {
    if (t0count === target.length) return true

    return false
  } else {
    return true
  }
};

/**
 * 1. 两边相等
 * 2. 目标是纯数字，自己也只能是相同的纯数字
 * 3. 自己是纯数字，对方不是纯数字
 */
