/**
 * 1 <= s.length <= 100
 * 1 <= k <= s.length
 *
 * @param s
 * @param k
 */

function shortestBeautifulSubstring(s: string, k: number): string {
  let left = 0, right = 0, count = 0
  let res = ''
  const n = s.length

  while (right < n) {
    if (s[right] === '1') count++

    while (left <= right && count > k) {
      if (s[left] === '1') count--
      left++
    }
    while (left <= right && s[left] === '0') left++
    const str = s.substring(left, right + 1)
    if (left <= right && count === k && ((res.length === str.length && res > str) || res === '' || str.length < res.length)) {
      res = str
    }

    right++
  }

  return res
};

// console.log(shortestBeautifulSubstring("1100100101011001001", 7))