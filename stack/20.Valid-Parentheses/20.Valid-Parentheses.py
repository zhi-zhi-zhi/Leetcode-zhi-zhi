class Solution:
    def isValid(self, s: str) -> bool:
        stack = []

        for char in s:
            if char == '[' or char == '{' or char == '(':
                stack.append(char)
            elif char == ']':
                if len(stack) == 0 or stack[-1] != '[':
                    return False
                else:
                    stack.pop()
            elif char == '}':
                if len(stack) == 0 or stack[-1] != '{':
                    return False
                else:
                    stack.pop()
            elif char == ')':
                if len(stack) == 0 or stack[-1] != '(':
                    return False
                else:
                    stack.pop()

        return len(stack) == 0


Solution().isValid("({[]})")