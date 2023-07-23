class Solution:
    def countSubstrings(self, s: str, t: str) -> int:
        return countSubstringsVersion1(s, t)


def countSubstringsVersion1(s: str, t: str) -> int:
    """
    Time complexity: O(n ^ 3)
    Space complexity: O(1)
    """
    n, m, res = len(s), len(t), 0
    for i in range(n):
        for j in range(m):
            if s[i] != t[j]:
                left, right = 0, 0
                while i - left - 1 >= 0 and j - left - 1 >= 0 and s[i - left - 1] == t[j - left - 1]:
                    left = left + 1
                while i + right + 1 < n and j + right + 1 < m and s[i + right + 1] == t[j + right + 1]:
                    right = right + 1
                res += (left + 1) * (right + 1)
    return res


def countSubstringsVersion2(s: str, t: str) -> int:
    """
    Time complexity: O(n ^ m)
    Space complexity: O(n ^ m)
    """
    n, m, res = len(s), len(t), 0
    dp1 = [[0 for _ in range(m + 1)] for _ in range(n + 1)]
    dp2 = [[0 for _ in range(m + 1)] for _ in range(n + 1)]

    for i in range(n):
        for j in range(m):
            if s[i] != t[j]:
                dp1[i][j] = 0
            else:
                dp1[i][j] = dp1[i - 1][j - 1] + 1
    for i in range(n-1, -1, -1):
        for j in range(m-1, -1, -1):
            if s[i] != t[j]:
                dp2[i][j] = 0
            else:
                dp2[i][j] = dp2[i + 1][j + 1] + 1
    for i in range(n):
        for j in range(m):
            if s[i] != t[j]:
                res += (dp1[i-1][j-1] + 1) * (dp2[i+1][j+1] + 1)
    return res


def countSubstringsVersion3(s: str, t: str) -> int:
    """
    Time complexity: O(n ^ m)
    Space complexity: O(1)
    """
    res, n, m = 0, len(s), len(t)

    def helper(i: int, j: int) -> int:
        helper_res = pre = cur = 0
        for k in range(min(n - i, m - j)):
            cur += 1
            if s[i + k] != t[j + k]:
                pre, cur = cur, 0
            helper_res += pre
        return helper_res

    return sum(helper(i, 0) for i in range(n)) + sum(helper(0, j) for j in range(1, m))
