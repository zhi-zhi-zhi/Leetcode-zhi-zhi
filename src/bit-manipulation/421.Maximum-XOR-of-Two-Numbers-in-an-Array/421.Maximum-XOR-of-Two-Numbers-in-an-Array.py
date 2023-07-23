from typing import List


class Solution:
    def findMaximumXOR(self, nums: List[int]) -> int:
        """
        greedy
        :param nums:
        :return:
        """
        max_res = 0

        # greedy try
        mask = 0
        for i in range(30, -1, -1):
            mask |= (1<< i)
            # greedyTry = max_res + (1<<i)
            greedy_try = max_res | (1<<i)

            left_bit_set = set([num & mask for num in nums])
            for left_bit in left_bit_set:
                if (greedy_try ^ left_bit) in left_bit_set:
                    max_res = greedy_try
                    break

        return max_res
