/**
 * Time complexity: O(n ^ 2)
 * Space complexity: O(n ^ 2)
 *
 * @param s
 */
function longestPalindrome(s: string): string {
  return longestPalindromeVersion2(s);
}

/**
 * Time complexity: O(n ^ 2)
 * Space complexity: O(n ^ 2)
 *
 * @param s
 */
function longestPalindromeVersion1(s: string): string {
  let left = 0, right = 0;
  const arr = Array.from(s),
        n   = arr.length,
        dp  = Array.from(Array(n), () => Array(n).fill(false));

  for (let i = n - 2; i >= 0; i--) {
    for (let j = i; j < n; j++) {
      if (j - i <= 2)
        dp[i][j] = arr[i] === arr[j];
      else
        dp[i][j] = dp[i + 1][j - 1] && arr[i] === arr[j];

      if (dp[i][j] && j - i > right - left) {
        left = i;
        right = j;
      }
    }
  }

  return s.substring(left, right + 1);
}

longestPalindrome("babad");

/**
 * Time complexity: O(n ^ 2)
 * Space complexity: O(n ^ 2)
 *
 * @param s
 */
function longestPalindromeVersion2(s: string): string {
  let left = 0, right = 0;
  const arr = Array.from(s),
        n   = arr.length

  for (let i = 0; i < n -1; i++) {
    const len = Math.max(expandAroundCenter(i, i), expandAroundCenter(i, i + 1))

    if (len > right - left + 1) {
      left = i - ((len - 1) >> 1)
      right = i + (len >> 1)
    }
  }

  return s.substring(left, right + 1);

  function expandAroundCenter(left: number, right: number): number {
    while (left >= 0 && right < n && arr[left] === arr[right]) {
      left--
      right++
    }
    return right - left - 1
  }
}

longestPalindrome("babad");