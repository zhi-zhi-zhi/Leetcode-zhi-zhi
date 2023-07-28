function robotWithString(s: string): string {
  const stack1 = Array.from(s).reverse()
  const stack2 = []
  const res = []

  while (stack1.length > 0 || stack2.length > 0) {
    while (stack1.length > 0 && (stack2.length === 0 || stack1.at(-1) <= stack2.at(-1)))
      stack2.push(stack1.pop())

    res.push(stack2.pop())
  }


  return res.join('')
}
