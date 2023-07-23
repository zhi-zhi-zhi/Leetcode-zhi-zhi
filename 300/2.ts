function peopleAwareOfSecret(n: number, delay: number, forget: number): number {
  const module = 1e9 + 7;

  // dp[i] = sum[i-delay] - sum[i-forget]
  const dp = Array(n + 1).fill(0);
  const sum = Array(n + 1).fill(0);

  dp[1] = 1;
  sum[1] = 1;

  for (let i = 2; i <= n; i++) {
    if (i - delay >= 0) {
      dp[i] = sum[i-delay] % module
    }
    if (i - forget >= 0)
      dp[i] = (dp[i] - sum[i-forget] + module) % module

    sum[i] = (sum[i-1] + dp[i]) % module
  }

  let res = sum[n]
  if (n >= forget)
    res = (res - sum[n-forget] + module) % module
  return res;
}


// console.log(peopleAwareOfSecret(6, 2, 4));
// console.log(peopleAwareOfSecret(4, 1 ,3 ));
