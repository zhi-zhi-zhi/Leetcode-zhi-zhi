function resultArray(nums: number[]): number[] {
  let arr1 =[nums[0]], arr2= [nums[1]]

  for (let i = 2 ; i< nums.length; i++) {
    if (arr1.at(-1) > arr2.at(-1)) {
      arr1.push(nums[i])
    } else {
      arr2.push(nums[i])
    }
  }

  return [...arr1,...arr2]
};