function repeatedCharacter(s: string): string {
  const set = new Set()

  for (const char of Array.from(s)) {
    if (set.has(char))
      return char
    set.add(char)
  }

  return ''
};
