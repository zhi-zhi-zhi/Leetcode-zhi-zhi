/**
 * Time complexity: O(b) 共循环了 b 次
 * Space complexity: O(1)
 *
 * @param a
 * @param b
 * @param p
 * @return result (a * b) % p
 */
function bigDataMultiplication(a, b, p) {
  let result = 0;
  let temp = a;

  // 等价于 while (b !== 0) {
  while (b) {
    // 等价于 if ((b & 1) !== 0) {
    if (b & 1) {
      result = (result + temp) % p;
    }

    temp = (temp << 1) % p;
    // 为什么用 >>>：避免 b = 2^31 的情况
    b = b >>> 1;
  }

  return result
}

/**
 * Time Complexity: O(log_n)
 * Space complexity: O(1)
 *
 * 本算法不考虑大数问题
 * 快速幂
 *
 * @param x -100.0 <= x <= 100.0
 * @param n -(2^31) <= n <= 2^31 -1
 * @return result x^n
 */
var myPow = function(x, n) {
  if (n === 0) {
    return 1;
  }

  // -2^31 <= n <= 2^31-1
  // 考虑n的二进制与x的关系
  let result = 1;
  let temp = x;
  let absN = n < 0 ? -n : n;

  while (absN) {
    // - 若n当前位为1，则结果加上temp
    if ((absN & 1) === 1) {
      result *= temp;
    }

    // x^(2^3) = x^(2^2) * x^(2^2)
    temp *= temp;
    // 由于JS中整数由32位表示（-2^31 至 2^31-1）
    // 导致(2^31) >> 1 的结果是 -(2^30)（要理解的话，得理解补码），预期是 (2^30)
    // 下面是一种解决办法
    absN = absN >> 1 >= 0 ? absN >> 1 : -(absN >> 1);
    // 另一种办法：无符号位移 >>>
    // absN = absN >>> 1
  }

  if (n < 0) {
    result = 1 / result;
  }

  return result;
};
