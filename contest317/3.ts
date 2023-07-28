/**
 *  显示英文描述
 * 通过的用户数0
 * 尝试过的用户数0
 * 用户总通过次数0
 * 用户总提交次数0
 * 题目难度Medium
 * 给你两个正整数 n 和 target 。
 *
 * 如果某个整数每一位上的数字相加小于或等于 target ，则认为这个整数是一个 美丽整数 。
 *
 * 找出并返回满足 n + x 是 美丽整数 的最小非负整数 x 。生成的输入保证总可以使 n 变成一个美丽整数。
 *
 * @param n
 * @param target
 */
function makeIntegerBeautiful(n: number, target: number): number {
  const nDigitSum = digitSum(n)
  if (nDigitSum === target)
    return 0

  
  

  function digitSum(num: number): number {
    let sum = 0

    while (num > 0) {
      sum += num % 10
      num = Math.floor(num / 10)
    }

    return sum
  }
}