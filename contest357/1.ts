function finalString(s: string): string {
  const str = []

  for (const char of s) {
    if (char === 'i') {
      str.reverse()
    } else {
      str.push(char)
    }
  }

  return str.join('')
};