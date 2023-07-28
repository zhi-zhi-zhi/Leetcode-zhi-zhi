from typing import List


class Solution:
    def trap(self, height: List[int]) -> int:
        left, right = 0, len(height) - 1
        left_max, right_max = height[0], height[-1]
        res = 0

        while left < right:
            if left_max <= right_max:
                left += 1
                res += max(0, left_max - height[left])
                left_max = max(left_max, height[left])
            else:
                right -= 1
                res += max(0, right_max - height[right])
                right_max = max(right_max, height[right])
        return res

Solution().trap([5,5,1,7,1,1,5,2,7,6])