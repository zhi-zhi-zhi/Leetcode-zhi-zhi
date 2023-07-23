function countSubstrings(s: string, t: string): number {
  return countSubstringsVersion3(s, t);
}

/**
 * Time complexity: O(n ^ 3)
 * Space complexity: O(1)
 * @param s
 * @param t
 */
function countSubstringsVersion1(s: string, t: string): number {
  const n = s.length, m = t.length;
  let res = 0;

  for (let i = 0; i < n; i++)
    for (let j = 0; j < m; j++)
      if (s.charAt(i) !== t.charAt(j)) {
        let left = 0, right = 0;

        for (let k = 1; i - k >= 0 && j - k >= 0 && s.charAt(i - k) === t.charAt(j - k); k++)
          left++;
        for (let k = 1; i + k < n && j + k < m && s.charAt(i + k) === t.charAt(j + k); k++)
          right++;

        res += (left + 1) * (right + 1);
      }

  return res;
}

/**
 * Time complexity: O(n ^ 2)
 * Space complexity: O(n ^ 2)
 * @param s
 * @param t
 */
function countSubstringsVersion2(s: string, t: string): number {
  const n   = s.length,
        m   = t.length,
        dp1 = Array.from(Array(n + 2), () => Array(m + 2).fill(0)),
        dp2 = Array.from(Array(n + 2), () => Array(m + 2).fill(0));

  s = "#" + s;
  t = "#" + t;

  let res = 0;

  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      if (s.charAt(i) === t.charAt(j))
        dp1[i][j] = dp1[i - 1][j - 1] + 1;
      else
        dp1[i][j] = 0;

  for (let i = n; i >= 1; i--)
    for (let j = m; j >= 1; j--)
      if (s.charAt(i) === t.charAt(j))
        dp2[i][j] = dp2[i + 1][j + 1] + 1;
      else
        dp2[i][j] = 0;

  for (let i = 1; i <= n; i++)
    for (let j = 1; j <= m; j++)
      if (s.charAt(i) !== t.charAt(j))
        res += (dp1[i - 1][j - 1] + 1) * (dp2[i + 1][j + 1] + 1);

  return res;
}

/**
 * 学习自寒神，迄今尚未得到此解神意
 * slide
 *
 * Time complexity: O(n ^ 2)
 * Space complexity: O(n)
 * @param s
 * @param t
 */
function countSubstringsVersion3(s: string, t: string): number {
  const n = s.length,
        m = t.length;

  let res = 0;

  for (let i = 0; i < n; i++)
    res += helper(i, 0)

  for (let j = 1; j < m; j++)
    res += helper(0, j)

      return res;

  /**
   * each pair (i, j) just calc once.
   * (0, 0), (1, 0) ..., (n-1, 0)
   *         (0, 1) ...., (0, n - 1)
   * @param i
   * @param j
   */
  function helper(i: number, j: number): number {
    let res = 0, pre = 0, cur = 0;

    while (i < n && j < m) {
      cur++;

      if (s.charAt(i++) !== t.charAt(j++)) {
        pre = cur
        cur = 0
      }

      res += pre
    }

    return res
  }
}