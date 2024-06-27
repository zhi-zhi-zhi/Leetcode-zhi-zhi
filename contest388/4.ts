import {endianness} from "node:os";

/**
 * 1 <= n <= 104
 * -10^9 <= nums[i] <= 10^9
 * 1 <= k <= n
 * 1 <= n * k <= 10^6
 * k 是奇数。
 *
 * @param nums
 * @param k
 */
function maximumStrength(nums: number[], k: number): number {
    /**
     * 贪心！
     * 找出递增序列、递减序列
     */
    const n = nums.length
    const preSum = Array(n + 1).fill(0)
    const positivePartitions: [number, number][] = []
    const zeroPartitions: [number, number][] = []
    const negativePartitions: [number, number][] = []

    for (let i = 0; i < n; i++)
        preSum[i + 1] = preSum[i] + nums[i]

    // 找出递增序列，递减序列
    let flag = 0, left = 0
    for (let i = 0; i < n; i++) {
        const num = nums[i]

        if (num > 0) {
            if (flag === -1)
                negativePartitions.push([left, i - 1])
            if (flag !== 1)
                left = i
            flag = 1
        } else if (num === 0) {
            if (flag === -1)
                negativePartitions.push([left, i - 1])
            if (flag === 1)
                positivePartitions.push([left, i - 1])
            zeroPartitions.push([i, i])
            flag = 0
        } else {
            if (flag === 1)
                positivePartitions.push([left, i - 1])
            if (flag !== -1)
                left = i
            flag = -1
        }
    }
    if (flag === -1)
        negativePartitions.push([left, n - 1])
    if (flag === 1)
        positivePartitions.push([left, n - 1])



    let res = 0
    // for (let i = 0; i < k; i++) {
    //     res += ((-1) ** (i)) * (Math.abs(getSum(partitions[i]))) * (k - i)
    // }

    return res

    function getSum([a,b]: [number, number]) {
        return preSum[b+1] - preSum[a]
    }
};

maximumStrength([1, 2, 3, 0, -1, -2, 1, 2, 3, -1, -2, -3, 0, 1, 0, 0, -1], 3)
maximumStrength([1,2,3], 3)