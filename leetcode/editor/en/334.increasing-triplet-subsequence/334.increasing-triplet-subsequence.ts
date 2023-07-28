//Given an integer array nums, return true if there exists a triple of indices (
//i, j, k) such that i < j < k and nums[i] < nums[j] < nums[k]. If no such 
//indices exists, return false. 
//
// 
// Example 1: 
//
// 
//Input: nums = [1,2,3,4,5]
//Output: true
//Explanation: Any triplet where i < j < k is valid.
// 
//
// Example 2: 
//
// 
//Input: nums = [5,4,3,2,1]
//Output: false
//Explanation: No triplet exists.
// 
//
// Example 3: 
//
// 
//Input: nums = [2,1,5,0,4,6]
//Output: true
//Explanation: The triplet (3, 4, 5) is valid because nums[3] == 0 < nums[4] == 
//4 < nums[5] == 6.
// 
//
// 
// Constraints: 
//
// 
// 1 <= nums.length <= 5 * 10⁵ 
// -2³¹ <= nums[i] <= 2³¹ - 1 
// 
//
// 
//Follow up: Could you implement a solution that runs in O(n) time complexity 
//and O(1) space complexity? Related Topics Array Greedy 👍 3644 👎 204

/**
 * Time complexity： O(n)
 * Space complexity: O(1)
 * @param nums
 */
//leetcode submit region begin(Prohibit modification and deletion)
function increasingTriplet(nums: number[]): boolean {
    let first = Number.MAX_SAFE_INTEGER, second = Number.MAX_SAFE_INTEGER

    for (let num of nums)
        if (num <= first)
            first = num
        else if (num <= second)
            second = num
        else
            return true
        // if (num > second)
        //     return true
        // else if (num > first)
        //     second = num
        // else
        //     first = num

    return false
}
//leetcode submit region end(Prohibit modification and deletion)
