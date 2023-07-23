class Solution:
    def champagneTower(self, poured: int, query_row: int, query_glass: int) -> float:
        dp = [0] * (query_row + 1)
        dp[0] = poured

        for i in range(1, query_row + 1):
            for j in range(i, 0, -1):
                if dp[j - 1] > 1:
                    dp[j] += (dp[j - 1] - 1) / 2
                    dp[j - 1] = (dp[j - 1] - 1) / 2
                else:
                    dp[j] += 0
                    dp[j - 1] = 0

        return min(1, dp[query_glass])
