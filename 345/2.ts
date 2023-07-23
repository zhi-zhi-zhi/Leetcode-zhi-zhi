function doesValidArrayExist(derived: number[]): boolean {
  const n = derived.length

  if (n === 1) {
    return derived[0] === 0
  }

  const origin = Array(n).fill(false)
  if (derived[0] === 1) {
    origin[0] = false
    origin[1] = true
  }

  for (let i = 1; i < derived.length; i++) {
    if (i === n - 1) {
      if (derived[i] === 1) {
        return origin[0] !== origin[i];
      } else {
        return origin[0] === origin[i]
      }
    }

    if (derived[i] === 1) {
      origin[i+1] = !origin[i]
    } else {
      origin[i+1] = origin[i]
    }
  }

  return true
};
