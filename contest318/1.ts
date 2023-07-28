function averageValue(nums: number[]): number {
  const arr = nums.filter(num => num % 3 === 0 && num % 2 === 0)
  
  return arr.length === 0 ? 0 : Math.floor(arr.reduce((sum, cur) => sum + cur, 0) / arr.length)
}

// console.log(averageValue([94,65,82,40,79,74,92,84,37,19,16,85,20,79,25,89,55,67,84,3,79,38,16,44,2,54,58,94,69,71,14,24,13,21]))