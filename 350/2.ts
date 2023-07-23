function findValueOfPartition(nums: number[]): number {
    nums.sort((a, b) => a - b)

    let min = nums[1] - nums[0]
    for (let i = 1; i < nums.length - 1; i++) {
        min = Math.min(min, nums[i + 1] - nums[i])
    }

    return min
};
