function passThePillow(n: number, time: number): number {
  const x = Math.floor(time / (n - 1))
  const y = time % (n - 1)

  if (x % 2 === 0) return  1 + y
  else return n - y
};
