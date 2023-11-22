function minimumSteps(s: string): number {
  let count = 0
  let step = 0

  for (let i = 0; i < s.length; i++) {
    if (s[i] === '0') {
      if (i !== count)
        step += (i - count)
      count++
    } else {
      continue
    }
  }

  return step
};