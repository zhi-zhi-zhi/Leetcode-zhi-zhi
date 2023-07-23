class Solution:
    def rangeBitwiseAnd(self, left: int, right: int) -> int:
        """
        In one word, this problem is asking us to find
        the common prefix of m and n 's binary code.
        :param left:
        :param right:
        :return:
        """
        res = 0

        while left < right:
            res += (right & (right - 1))
            right = (right & (right - 1))

        return res


def rangeBitwiseAndVersion1(left: int, right: int) -> int:
    """
    the result of a range bitwise is
    the common 'left header' of m and n. of m and n 's binary code.
    :param left:
    :param right:
    :return:
    """
    while left < right:
        right &= (right - 1)

    return right


def rangeBitwiseAndVersion2(left: int, right: int) -> int:
    """
    the result of a range bitwise is the common 'left header' of m and n.
    :param left:
    :param right:
    :return:
    """
    b = 0

    while left != right:
        left >>= 1
        right >>= 1
        b += 1

    return left << b
