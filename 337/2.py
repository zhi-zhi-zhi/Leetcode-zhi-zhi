# function divisibilityArray(word: string, m: number): number[] {
#   let num = BigInt(word)
#   let n = word.length
#   const res = Array(n).fill(0)
#   const mBig = BigInt(m)
#
#   for (let i = 0; i < n; i++) {
#     if (num % mBig === BigInt(0)) res[n-1-i] = 1
#     num = num / BigInt(10)
#   }
#
#   return res
# };
from typing import List


class Solution:
    def divisibilityArray(self, word: str, m: int) -> List[int]:
        n = len(word)
        res = [0 for i in range(n)]
        num = int(word)

        for i in range(n):
            if (num % m == 0):
                res[n-1-i] = 1
            num = num // 10

        return res

x