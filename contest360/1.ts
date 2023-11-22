function furthestDistanceFromOrigin(moves: string): number {
  let count = 0
  let num = 0
  for (const char of moves) {
    if (char === 'L') count--
    else if (char === 'R') count++
    else num++
  }

  return count >= 0 ? count + num : Math.abs(count - num)
};