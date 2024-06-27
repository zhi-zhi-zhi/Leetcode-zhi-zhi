/**
 * n == arr.length
 * 2 <= n <= 100
 * 1 <= arr[i].length <= 20
 * arr[i] 只包含小写英文字母。
 * @param arr
 */
function shortestSubstrings(arr: string[]): string[] {
    const n = arr.length
    const res = Array(n).fill('')
    const subs = Array.from(Array(n), () => [])
    const map = new Map<string, number>()

    for (let i = 0; i < arr.length; i++) {
        const string = arr[i]
        const set = new Set<string>()
        for (let len = 1; len <= string.length; len++) {
            for (let start = 0; start + len <= string.length; start++) {
                const x = string.substring(start, len + start)
                set.add(x)
            }
        }

        const xx = Array.from(set)
        subs[i] = xx.sort((a, b) => {
            if (a.length < b.length) {
                return -1
            } else if (a.length > b.length) {
                return 1
            } else {
                return a <= b ? -1 : 1
            }
        })
        for (const x of xx) {
            map.set(x, (map.get(x) ?? 0) + 1)
        }
    }

    for (let i = 0; i < arr.length; i++) {
        for (const x of subs[i]) {
            map.set(x, (map.get(x) ?? 0) - 1)
        }

        for (const sub of subs[i]) {
            if (map.get(sub) === 0) {
                res[i] = sub
                break
            }
        }

        for (const x of subs[i]) {
            map.set(x, (map.get(x) ?? 0) + 1)
        }
    }


    return res
};

// console.log(shortestSubstrings(["cab","ad","bad","c"]))