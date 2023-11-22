function isReachableAtTime(sx: number, sy: number, fx: number, fy: number, t: number): boolean {
  const minimumSteps = Math.max(Math.abs(fx - sx), Math.abs(fy - sy))

  return minimumSteps === 0 ? t !== 1 : t >= minimumSteps
};