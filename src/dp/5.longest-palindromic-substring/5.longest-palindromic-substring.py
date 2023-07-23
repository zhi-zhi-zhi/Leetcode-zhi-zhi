class Solution:
    def longestPalindrome(self, s: str) -> str:
        return longestPalindromeVersion2(s)


def longestPalindromeVersion1(s: str) -> str:
    """
    Time complexity: O(n^2)
    Space complexity: O(1)
    :param s:
    :return:
    """
    left, right, n = 0, 0, len(s)

    def expandAroundCenter(l: int, r: int) -> int:
        while l >= 0 and r < n and s[l] == s[r]:
            l -= 1
            r += 1
        return r - l - 1

    for i in range(n - 1):
        length = max(expandAroundCenter(i, i), expandAroundCenter(i, i + 1))
        if length > right - left + 1:
            left = i - (length - 1) // 2
            right = i + length // 2

    return s[left:right + 1]


def longestPalindromeVersion2(s: str) -> str:
    """
    Manacher algorithm
    Time complexity: O(n)
    Space complexity: O(n)
    :param s:
    :return:
    """
    t = "#" + "#".join(s) + "#"

    RL = [0] * len(t)
    max_right = 0
    pos = 0

    for i in range(len(t)):
        if i < max_right:
            RL[i] = min(RL[2 * pos - i], max_right - i)
        else:
            RL[i] = 1

        # 尝试扩展，注意处理边界
        while i - RL[i] >= 0 and i + RL[i] < len(t) and t[i - RL[i]] == t[i + RL[i]]:
            RL[i] += 1
        # 更新 MaxRight, pos
        if RL[i] + i - 1 > max_right:
            max_right = RL[i] + i - 1
            pos = i
    max_len, center_index = max((n-1, i) for i, n in enumerate(RL))
    return s[(center_index//2 - max_len//2):  (center_index//2 - max_len//2) + max_len ]

x = Solution()
# x.longestPalindrome("babad")
# x.longestPalindrome("cbbd")
x.longestPalindrome("a")