class Solution:
    def minDistance(self, word1: str, word2: str) -> int:
        return minDistanceVersion2(word1, word2)


def minDistanceVersion1(word1: str, word2: str) -> int:
    """
    Time complexity: O(n * m)
    Space complexity: O(n * m)
    :param word1:
    :param word2:
    :return:
    """
    n, m = len(word1), len(word2)
    dp = [[0 for _ in range(m + 1)] for _ in range(n + 1)]

    for i in range(1, n + 1):
        dp[i][0] = i
    for j in range(1, m + 1):
        dp[0][j] = j

    for i in range(n):
        for j in range(m):
            if word1[i] == word2[j]:
                dp[i + 1][j + 1] = dp[i][j]
            else:
                # operate for i        replace,   delete,    insert
                dp[i + 1][j + 1] = 1 + min(dp[i][j], dp[i + 1][j], dp[i][j + 1])

    return dp[n][m]


def minDistanceVersion2(word1: str, word2: str) -> int:
    """
    Time complexity: O(n * m)
    Space complexity: O(m)
    :param word1:
    :param word2:
    :return:
    """
    n, m = len(word1), len(word2)
    # dp = [[0 for _ in range(m + 1)] for _ in range(n + 1)]
    dp = [j for j in range(m + 1)]

    # for i in range(1, n+1):
    #     dp[i][0] = i
    # for j in range(1, m+1):
    #     dp[0][j] = j

    for i in range(n):
        pre_temp = dp[0]
        dp[0] = i + 1
        for j in range(m):
            temp = pre_temp
            pre_temp = dp[j + 1]
            if word1[i] == word2[j]:
                # dp[i+1][j+1] = dp[i][j]
                dp[j + 1] = temp
            else:
                # operate for i        replace,   delete,    insert
                # dp[i+1][j+1] = 1 + min(dp[i][j], dp[i+1][j], dp[i][j+1])
                dp[j + 1] = 1 + min(temp, dp[j], dp[j + 1])

    # return dp[n][m]
    return dp[m]
