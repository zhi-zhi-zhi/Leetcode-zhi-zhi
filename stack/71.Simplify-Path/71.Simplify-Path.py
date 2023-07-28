class Solution:
    def simplifyPath(self, path: str) -> str:
        res = []
        i = 0

        while i < len(path):
            cur = path[i]
            while i < len(path) and path[i] != '/':
                cur = cur + path[i]
                i += 1

            if cur == '/' or cur == '/.':
                continue
            elif cur == '/..':
                if len(res) == 1:
                    continue
                elif len(res) == 2:
                    res.pop()
            else:
                res.append(cur)

        return "".join(res)


print(Solution().simplifyPath('((()))'))