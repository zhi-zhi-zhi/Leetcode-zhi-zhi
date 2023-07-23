function smallestEvenMultiple(n: number): number {
  const x = gcd(n, 2)
  return n * 2 / x
};

function gcd(a: number, b: number): number {
  if (a % b === 0)
    return b
  return gcd(b, a % b)
}


