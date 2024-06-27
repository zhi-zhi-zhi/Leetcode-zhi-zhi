class Trie {
    children: Trie[]

    constructor() {
        this.children = []
    }
}

function longestCommonPrefix(arr1: number[], arr2: number[]): number {
    let res = 0
    const root = Array(10).fill(null)

    arr1.forEach(num => {
        const str = String(num)
        let parent = root
        for (const char of str) {
            if (parent[char])
                parent = parent[char]
            else {
                parent[char] = new Trie()
                parent = parent[char]
            }
        }
    })

    for (const num of arr2) {
        const str = String(num)

        let parent = root
        let count = 0
        for (const char of str) {
            if (parent[char]) {
                parent = parent[char]
                count++
            }
            else {
                break
            }
        }
        res = Math.max(res, count)
    }

    return res
};

// console.log(longestCommonPrefix([1,10,100, 5, 53], [1000]))