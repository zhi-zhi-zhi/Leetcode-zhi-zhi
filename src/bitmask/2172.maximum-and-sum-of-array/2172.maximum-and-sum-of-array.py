from functools import lru_cache
from typing import List


class Solution:
    def maximumANDSum(self, nums: List[int], numSlots: int) -> int:
        return maximumANDSumVersion1(nums, numSlots)


def maximumANDSumVersion1(nums: List[int], numSlots: int) -> int:
    """
    Iterator

    Time complexity: O(3**numSlots * numSlots)
    Space complexity: O(3**numSlots)

    :param nums:
    :param numSlots:
    :return:
    """
    dp = [0 for _ in range(3 ** numSlots)]
    res, n = 0, len(nums)

    for mask in range(1, 3 ** numSlots):
        # 第 i 个数 (1-index)
        i = ternaryCount(mask)
        # 只需要算nums中的 n 个数
        if i > n:
            continue
        for j in range(numSlots):
            if 3 ** j > mask:
                break
            elif (mask // (3 ** j)) % 3 > 0:
                # 第 j 位为 1 or 2，代表第 j 个桶还能继续放
                dp[mask] = max(dp[mask], dp[mask - 3 ** j] + (nums[i - 1] & (j + 1)))
        res = max(res, dp[mask])
    return res


def maximumANDSumVersion2(nums: List[int], numSlots: int) -> int:
    """
    Recursion

    Time complexity: O(3**numSlots * numSlots)
    Space complexity: O(3**numSlots)

    :param nums:
    :param numSlots:
    :return:
    """
    @lru_cache(None)
    def dp(i, mask):
        res = 0
        if i == len(nums):
            return 0
        for slot in range(1, numSlots + 1):
            b = 3 ** (slot - 1)
            if mask // b % 3 > 0:
                res = max(res, (nums[i] & slot) + dp(i + 1, mask - b))
        return res

    return dp(0, 3 ** numSlots - 1)


def ternaryCount(num_base_ternary: int) -> int:
    res = 0
    while num_base_ternary > 0:
        res += num_base_ternary % 3
        num_base_ternary //= 3
    return res


def maximumANDSumVersion3(nums: List[int], numSlots: int) -> int:
    """
    Iterator

    Time complexity: O(2**(2*numSlots) * 2 * numSlots)
    Space complexity: O(2**(2(*numSlots))

    :param nums:
    :param numSlots:
    :return:
    """

