class Solution:
    def minimumTime(self, s: str) -> int:
        left, n, res = 0, len(s), len(s)

        for i, char in enumerate(s):
            if char == '1':
                left = min(i + 1, left + 2)

            res = min(res, left + n - (i + 1))

        return res


x = Solution()
print(x.minimumTime('010101'))