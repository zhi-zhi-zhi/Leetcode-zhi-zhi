from typing import List


class Solution:
    def maxProfit(self, prices: List[int]) -> int:
        return maxProfitVersion1(prices)


def maxProfitVersion1(prices: List[int]) -> int:
    """
    Time complexity: O(n)
    Space complexity: O(1)
    :param prices:
    :return:
    """
    pre_sell, sell, buy = 0, 0, -10000

    for price in prices:
        buy = max(buy, pre_sell - price)
        temp = sell
        sell = max(sell, buy + price)
        pre_sell = temp

    return sell
