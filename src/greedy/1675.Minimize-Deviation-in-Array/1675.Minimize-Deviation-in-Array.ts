/**
 * 贪心
 *
 * 本题思路：先确定最大值、最小值上限，然后不断缩小最大值直至无法缩小，过程中同时一直维护最小值。
 * 整个过程中的 Math.min(max - min) 即为结果
 *
 * 1. 所有的奇数 * 2，确定最大值的上限，最小值上限
 * @param nums
 */
import {PriorityQueue} from "../../util";

function minimumDeviation(nums: number[]): number {
  if (nums.length < 1) return 0

  const compareFun = (a: number, b: number) => b - a
  const priorityQueue: PriorityQueue<number> = new PriorityQueue(compareFun)
  let minDevi = 1e10,
      min = 1e10

  nums.forEach(num => {
    if (num % 2 === 1)
      num *= 2

    min = Math.min(min, num)
    priorityQueue.add(num)
  })

  // @ts-ignore
  while (priorityQueue.size() > 0 && priorityQueue.top() % 2 === 0) {
    // @ts-ignore
    minDevi = Math.min(minDevi, priorityQueue.top() - min)
    // @ts-ignore
    min = Math.min(min, priorityQueue.top() / 2)
    // @ts-ignore
    priorityQueue.replaceTopAndAdjustment(priorityQueue.top() / 2)
  }

  // @ts-ignore
  minDevi = Math.min(minDevi, priorityQueue.top() - min)

  return minDevi
}

minimumDeviation([2,10,8])