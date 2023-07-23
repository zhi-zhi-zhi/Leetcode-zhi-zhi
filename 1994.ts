const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29];
const n = primes.length;
const MODULE = 1e9 + 7;

function numberOfGoodSubsets(nums: number[]): number {
  const dp = Array(1 << n).fill(0);
  dp[0] = 1;

  let res = 0;

  const countMap = new Map<number, number>();

  for (const num of nums)
    countMap.set(num, (countMap.get(num) ?? 0) + 1);

  for (let x = 2; x <= 30; x++) {
    const count = countMap.get(x);
    if (count === undefined) continue;

    const encode = encoding(x);
    if (encode === -1) continue;

    const newDp = [...dp];
    for (let state = 0; state < (1 << n); state++) {
      if ((state & encode) === 0)
        newDp[state | encode] = (newDp[state | encode] + (dp[state] * count) % MODULE) % MODULE;
    }


    dp.splice(0, dp.length, ...newDp);
  }


  for (let state = 1; state < (1 << n); state++) {
    res = (res + dp[state]) % MODULE;
  }

  for (let i = 0; i < countMap.get(1) ?? 0; i++) {
    res = (res * 2) % MODULE;
  }


  return res;


  function encoding(num: number): number {
    let encode = 0;

    for (let i = 0; i < primes.length; i++) {
      if (num % primes[i] === 0) {
        encode |= (1 << i);
        num /= primes[i];

        if (num % primes[i] === 0) return -1;
      }
    }

    return encode;
  }
};
