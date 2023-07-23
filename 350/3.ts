/**
 * 3. n dp 之间做位 dp
 * @param nums
 */
function specialPerm(nums: number[]): number {
    const n = nums.length
    const module = 1e9 + 7
    let res = 0
    nums.sort((a, b) => a - b)

    const map = new Map<string, number>()

    function dfs(dpNum: number, index: number) {
        if ((dpNum & (1 << index)) > 0) return 0

        if (map.has(`${dpNum}_${index}`)) return map.get(`${dpNum}_${index}`)

        // 用第 index 做结尾
        const newDpNum = dpNum + (1 << index)
        if (newDpNum === (1 << n) - 1) {
            return 1
        }

        let count = 0
        // map[newDpNum] = (map[newDpNum] + map[dpNum]) % module
        for (let i = 0; i < n; i++)
            if ((newDpNum & (1 << i)) === 0 && (nums[index] % nums[i] === 0 || nums[i] % nums[index] === 0))
                count = (count + dfs(newDpNum, i)) % module

        map.set(`${dpNum}_${index}`, count)
        return count
    }

    for (let i = 0; i < n; i++) {
        // map.fill(0)
        // map[0] = 1
        // dfs(0, i)
        res = (res + dfs(0, i)) % module
    }

    return res
};
// 1 2 6 3 15
// 1 2 6 30 3
// 1 2 30 3 6
// 1 2 30 6 3
// console.log(specialPerm([1, 2, 3, 6, 30]))
// console.log(specialPerm([2, 3, 6]))
