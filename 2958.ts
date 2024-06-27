function maxSubarrayLength(nums: number[], k: number): number {
    let res = 1

    const map = {}

    let left = 0, right = 0

    while (right < nums.length) {
        map[nums[right]] = ((map[nums[right]] ?? 0) + 1)
        while (map[nums[right]] > k) {
            map[nums[left]] = map[nums[left]] - 1
            left++
        }

        res = Math.max(res, right - left + 1)
        right++
    }

    return res
};
