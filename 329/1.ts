function alternateDigitSum(n: number): number {
  const arr = Array.from(String(n), (char, index) => {
    if (index % 2 === 0)
      return Number(char);
    else return -Number(char);
  });

  return arr.reduce((res, num, index) => res + num, 0);
};
