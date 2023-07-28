function appendCharacters(s: string, t: string): number {
  let indexS = 0, indexT = 0

  for (let i = 0; i < s.length; i++)
    if (indexT < t.length && s[i] === t[indexT])
      indexT++

  return t.length - indexT
}