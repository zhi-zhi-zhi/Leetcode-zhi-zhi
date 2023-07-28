function subsetsWithDup(nums: number[]): number[][] {
  const numsLength = nums.length;
  const result: number[][] = [[]];

  nums.sort((a, b) => a - b);
  // record num index
  // const map = {} as any;
  let flagIndex = 0;

  core(0);

  return result;

  function core(index: number) {
    if (index >= numsLength) return;

    const resultLength = result.length

    let i: number;
    if (index > 0 && nums[index] === nums[index - 1]) {
      i = flagIndex;
    } else {
      i = 0;
    }

    flagIndex = result.length;
    while (i < resultLength) {
      result.push(result[i++].concat(nums[index]))
    }

    core(index + 1);
  }

  function swap(i: number, j: number) {
    const temp = nums[i] as number;
    nums[i] = nums[j] as number;
    nums[j] = temp;
  }
}