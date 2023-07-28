/**
 @param
   {number[]}
   nums
 @param
   {number}k
 @return {number}
 **/
var maximumProduct = function(nums, k) {
  const MOD = 10 ** 9 + 7
  let pq = new MinPriorityQueue()
  for (const num of nums) {
    pq.enqueue(num, num)
  }

  for (let i = 0; i < k; i++) {
    let { element } = pq.dequeue()
    element++
    pq.enqueue(element, element)
  }
  let ans = 1
  for (let i = 0; i < nums.length; i++) {
    let { element } = pq.dequeue()
    ans =
      (ans * element) % MOD
  }
  return ans
}