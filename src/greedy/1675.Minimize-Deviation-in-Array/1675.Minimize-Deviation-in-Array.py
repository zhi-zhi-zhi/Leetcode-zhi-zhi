from typing import List
import heapq


class Solution:
    def minimumDeviation(self, nums: List[int]) -> int:
        res = 1e10
        max_heap = [-(x * 2) if x % 2 else -x for x in nums]
        heapq.heapify(max_heap)
        mini = -max(max_heap)

        while max_heap[0] % 2 == 0:
            res = min(res, -max_heap[0] - mini)
            mini = min(mini, -max_heap[0] // 2)
            heapq.heappushpop(max_heap, max_heap[0] // 2)

        res = min(res, -max_heap[0] - mini)

        return res
