function findKthSmallest(coins: number[], k: number): number {
  coins.sort((a, b) => a - b)
  if (coins[0] === 1) {
    return k
  }

  const arr = []

  for (let i = 0; i < coins.length; i++) {
    const coin = coins[i]

    if (arr.every(num => coin % num !== 0))
      arr.push(coin)
  }

  // 数学问题：找第 k 个数
  // 要处理的情况：num 同事可以被 arr 中两个或多个数整除
};

function isPrime(n) {
  if (n === 1 || n === 0) {
    return false

  }
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i == 0) {
      return false;
    }
  }
  return true;
}
