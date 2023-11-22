function countSymmetricIntegers(low: number, high: number): number {
  let res = 0

  for (let i = low; i <= high; i++) {
    const str = String(i)
    if (str.length % 2 === 0 &&
      sum(str.substring(0, str.length >> 1)) ===
      sum(str.substring(str.length >> 1)))
      res++
  }

  return res
};

function sum(str): number {
  const num = Number(str)
  let res = 0
  for (let i = 0 ; i < str.length; i++) {
    res += Number(str[i])
  }
  return res
}