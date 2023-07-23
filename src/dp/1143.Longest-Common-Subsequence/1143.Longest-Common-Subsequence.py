class Solution:
    def longestCommonSubsequence(self, text1: str, text2: str) -> int:
        return longestCommonSubsequenceVersion1(text1, text2)


def longestCommonSubsequenceVersion1(text1: str, text2: str) -> int:
    """
    Time complexity: O(n * m)
    Space complexity: O(m)
    :param text1:
    :param text2:
    :return:
    """
    n, m = len(text1), len(text2)
    dp = [0] * (m + 1)

    for i in range(n):
        pre_temp = dp[0]
        for j in range(m):
            temp, pre_temp = pre_temp, dp[j + 1]
            if text1[i] == text2[j]:
                dp[j + 1] = temp + 1
            else:
                dp[j + 1] = max(dp[j], dp[j + 1])

    return dp[m]
