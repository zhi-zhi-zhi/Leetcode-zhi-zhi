function removeStars(s: string): string {
  const stack = []

  for (const char of s) {
    if (char === '*')
      stack.pop()
    else
      stack.push(char)
  }

  return stack.join('')
}
