from typing import List


class Solution:
    def minMovesToMakePalindrome(self, s: str) -> int:
        return minMovesToMakePalindromeVersion1(s)


def minMovesToMakePalindromeVersion1(s: str) -> int:
    """
    Time complexity: O(n^2)
    Space complexity: O(n)
    :param s:
    :return:
    """
    res, n = 0, len(s)
    arr = list(s)

    def helper(start: int) -> int:
        for j in range(n - 1 - start, start, -1):
            if arr[start] == arr[j]:
                for k in range(j, n - 1 - start):
                    arr[k], arr[k + 1] = arr[k + 1], arr[k]
                return (n - 1 - start) - j
        return -1

    for i in range(n // 2):
        count = helper(i)
        # n 为奇数时，必有一个出现的次数为奇数，记为 x + 1
        # 最后一个是落单的，且在前半部分中时，需要额外处理一下
        # 此处取巧，反转后的操作数是一样的
        # 反转后，这最后一个就落到后半部分，就不影响结果了
        if count == -1:
            # return res + self.minMovesToMakePalindrome(s[n - i:i - 1:-1])
            return res + minMovesToMakePalindromeVersion1(str(arr[i:n - i][::-1]))
        else:
            res += count

    return res
