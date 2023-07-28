class Solution:
    def minRemoveToMakeValid(self, s: str) -> str:
        i, stack, s = 0, [], list(s)

        while i < len(s):
            if s[i] == '(':
                stack.append(i)
            elif s[i] == ")":
                if len(stack) > 0:
                    stack.pop()
                else:
                    s[i] = ''

            i += 1

        while len(stack) > 0:
            s[stack.pop()] = ''

        return ''.join(s)

