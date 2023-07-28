/**
 * Time complexity: O(n^2)
 * Space complexity (include function stack): O(n)
 * @param nums
 */
function subsets(nums: number[]): number[][] {
  const numsLength = nums.length;
  const result: number[][] = [[]];

  core(0);

  return result;

  function core(index: number) {
    if (index >= numsLength) return;

    const resultLength = result.length
    for (let i = 0; i < resultLength; i++) {
      result.push(result[i].concat(nums[index]))
    }

    core(index + 1);
  }

  function swap(i: number, j: number) {
    const temp = nums[i] as number;
    nums[i] = nums[j] as number;
    nums[j] = temp;
  }
}

console.log(subsets([1,2,3]))