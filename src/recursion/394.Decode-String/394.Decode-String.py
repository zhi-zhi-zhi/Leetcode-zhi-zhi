class Solution:
    def decodeString(self, s: str) -> str:
        return decodeStringVersion2(s)


def decodeStringVersion1(s: str) -> str:
    """
    Recursion
    垃圾递归

    :param s:
    :return:
    """
    # i = 0
    #
    # def helper() -> str:
    #     num = 0
    #     word = ''
    #
    #     while i < len(s):
    #         i += 1
    #         char = s[i]
    #         if char.isdigit():
    #             num = num * 10 + int(char)
    #         elif char == "[":
    #             word += helper() * num
    #         elif char == "]":
    #             break
    #         else:
    #             word += char
    #
    #     return word
    #
    # return helper()


def decodeStringVersion2(s: str) -> str:
    """
    Stack

    :param s:
    :return:
    """
    res = ''
    stack = []
    num = 0

    for char in s:
        if char.isdigit():
            num = num * 10 + int(char)
        elif char == "[":
            stack.append(res)
            stack.append(num)
            num = 0
            res = ''
        elif char == "]":
            x = stack.pop()
            res = stack.pop() + res * x
        else:
            res += char

    return res


Solution().decodeString("3[a]2[bc]")
