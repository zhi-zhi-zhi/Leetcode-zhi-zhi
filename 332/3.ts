function substringXorQueries(s: string, queries: number[][]): number[][] {
  const numMap = new Map<number, number[]>();

  for (let i = 0; i < s.length; i++) {
    let num = 0;

    // 对每个 i，最长可以找到 i + 30，组成长度为 31 的二进制序列
    for (let j = 0; j < 31 && i + j < s.length; j++) {
      num = (num << 1) + Number(s[i + j]);

      if (!numMap.has(num)) numMap.set(num, [i, i + j]);

      // 以 '0' 为前缀，可以直接跳过：'01'.length < '1'.length
      if (s[i] === "0") break;
    }
  }

  return queries.map(([a, b], index) => numMap.get(a ^ b) ?? [-1, -1]);
};
