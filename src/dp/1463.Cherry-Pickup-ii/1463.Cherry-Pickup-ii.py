from functools import lru_cache
from typing import List


class Solution:
    def cherryPickup(self, grid: List[List[int]]) -> int:
        return cherryPickupVersion1(grid)


def cherryPickupVersion1(grid: List[List[int]]) -> int:
    """
    Recursion

    Time complexity: O(n^2)
    Space complexity: O(n * (m^2))
    :param grid:
    :return:
    """
    n, m = len(grid), len(grid[0])

    @lru_cache(None)
    def dp(row, robot1, robot2):
        if row >= n:
            return 0

        _max = 0
        for i in (-1, 0, 1):
            for j in (-1, 0, 1):
                if 0 <= robot1 + i < m and 0 <= robot2 + j < m:
                    _max = max(_max, dp(row + 1, robot1 + i, robot2 + j))

        if robot1 == robot2:
            return _max + grid[row][robot1]
        else:
            return _max + grid[row][robot1] + grid[row][robot2]

    return dp(0, 0, m - 1)


Solution().cherryPickup([[3,1,1],[2,5,1],[1,5,5],[2,1,1]])