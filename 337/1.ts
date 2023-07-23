function evenOddBit(n: number): number[] {
  let even = 0, odd = 0

  for (let i = 0; i < 31; i++) {
    if ((n & (1 << i)) > 0) {
      if (i % 2 === 0) even++
      else odd++
    }
  }

  return [even, odd]
};
