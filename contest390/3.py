import heapq
from collections import defaultdict

class Solution:
    def mostFrequentIDs(self, nums: List[int], freq: List[int]) -> List[int]:

        freq_dict = defaultdict(int)
        max_heap = []

        result = []

        for i in range(len(nums)):
            freq_dict[nums[i]] += freq[i]
            heapq.heappush(max_heap, (-freq_dict[nums[i]], nums[i])) # 将频率的负值和对应的 ID 入堆

            while max_heap and freq_dict[max_heap[0][1]] != -max_heap[0][0]: # 移除堆顶元素直到堆顶元素的频率与字典中对应的频率一致
                heapq.heappop(max_heap)

            result.append(-max_heap[0][0])

        return result
