function findTheLongestBalancedSubstring(s: string): number {
  let zeroCount = 0;
  let oneCount = 0;
  let res = 0;
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (char === "0") {
      if (oneCount !== 0) {
        zeroCount = 0;
        oneCount = 0;
      }
      zeroCount++;
    } else {
      oneCount++;
      res = Math.max(res, Math.min(oneCount, zeroCount) * 2)
    }

  }

  return res
};
