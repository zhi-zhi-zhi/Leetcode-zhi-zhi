# from typing import List
# import heapq
#
#
# class Solution:
#     def minimumDeviation(self, nums: List[int]) -> int:
#         res = 1e10
#         max_heap = [-(x * 2) if x % 2 else -x for x in nums]
#         heapq.heapify(max_heap)
#         mini = -max(max_heap)
#
#         while max_heap[0] % 2 == 0:
#             res = min(res, -max_heap[0] - mini)
#             mini = min(mini, -max_heap[0] // 2)
#             heapq.heappushpop(max_heap, max_heap[0] // 2)
#
#         res = min(res, -max_heap[0] - mini)
#
#         return res
from typing import List

from sortedcontainers import SortedList

class Solution:
    def resultArray(self, nums: List[int]) -> List[int]:
        # 创建一个空的 SortedList
        arr1 = SortedList()
        arr1.add(nums[0])
        array1 = [nums[0]]
        arr2 = SortedList()
        arr2.add(nums[1])
        array2 = [nums[1]]

        # 从下标2开始迭代数组
        for item in nums[2:]:
            len1 = len(arr1)
            len2 = len(arr2)
            greater1 = len1 - arr1.bisect_right(item)
            greater2 = len2 - arr2.bisect_right(item)
            if greater1 > greater2:
                arr1.add(item)
                array1.append(item)
            elif greater1 < greater2:
                arr2.add(item)
                array2.append(item)
            else:
                if (len1 <= len2):
                    arr1.add(item)
                    array1.append(item)
                else:
                    arr2.add(item)
                    array2.append(item)
        return array1 + array2

if __name__ == "__main__":
    a = Solution()
    a.resultArray([2,1,3,3])
    a.resultArray([5,14,3,1,2])
    a.resultArray([3,3,3,3])