function maxProduct(s: string): number {
  const n = s.length;
  const map = new Map<number, boolean>();

  let res = 1

  for (let state = 1; state < (1 << n); state++) {
    const otherStateMask = (~state) & ((1 << n) - 1);

    if (checkIsPalindrome(state)) {
      const lenState = countOneBit(state)

      for (let otherState = otherStateMask; otherState > 0; otherState = (otherState - 1) & otherStateMask) {
        if (checkIsPalindrome(otherState)) {
          const lenOtherState = countOneBit(otherState)

          res = Math.max(res, lenOtherState * lenState)
        }
      }
    }
  }

  return res

  function checkIsPalindrome(mask: number) {
    if (map.has(mask)) return map.get(mask);


    let low = 0, high = n - 1;

    while (low < high) {
      while (low < high && ((mask >> low) & 1) === 0)
        low++;
      while (low < high && ((mask >> high) & 1) === 0)
        high--;
      if (s[low] !== s[high]) {
        map.set(mask, false);
        return false;
      }

      low++;
      high--;
    }

    map.set(mask, true);
    return true;
  }

  function countOneBit(mask: number): number {
    let count = 0;

    while (mask > 0) {
      count++;
      mask = mask & (mask - 1);
    }

    return count;
  }
};
