function sumOfSquares(nums: number[]): number {
    return nums.reduce((res, num, index) => {
        return res + (nums.length % (index + 1) === 0 ? (num ** 2) : 0)
    }, 0)
};
