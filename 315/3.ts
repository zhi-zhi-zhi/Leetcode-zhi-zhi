function sumOfNumberAndReverse(num: number): boolean {
  for (let i = 0; i <= num; i++) {
    if (i + convert(i) === num)
      return true
  }

  return false

  function convert(num: number): number {
    return Number(Array.from(String(num)).reverse().join(''))
  }
};

