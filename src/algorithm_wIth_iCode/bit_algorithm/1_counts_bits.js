/**
 * Time complexity: O(1)
 * Space complexity: O(1)
 *
 * @param n 整数
 * @return result 整数 n的二进制表示中，1的个数
 */
function countsBits(n) {
  let result = 0;
  // temp 用以表示 2^i 次方，初始为 2^0 = 1
  let temp = 1;

  // 在 JS 中，number是64位浮点数类型，整数由带符号32位表示
  for (let i = 0; i < 31; i++) {
    if ((n & temp) === 1) {
      result++;
    }

    // 很多博客都说位移操作，效率高于乘法，实际上已经是老黄历，
    // 各种语言的编译器的自动优化基本覆盖了这类场景
    // 等价于 temp *= 2；
    temp <<= 1;
  }

  return result;
}

/**
 * Time complexity: O(1) 循环次数为n中1的个数，最多32个，常量级
 * Space complexity: O(1)
 *
 * @param n 整数
 * @return result 整数 n的二进制表示中，1的个数
 */
function countsBits(n) {
  let result = 0;

  while (n !== 0) {
    n &= n - 1;
    result++;
  }

  return result;
}
