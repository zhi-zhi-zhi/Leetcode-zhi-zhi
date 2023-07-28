/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 *
 * @param s
 */
function minimumTimeVersion2(s: string): number {
  const n = s.length
  let min = 1e10,
    left = 0

  for (let i = 0; i < n; i++) {
    if (s.charAt(i) === '1')
      left = Math.min(i + 1, left + 2)
    min = Math.min(min, left + n - (i + 1))
  }

  return min
}
