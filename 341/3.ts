function addMinimum(word: string): number {
  let allStack: string[][] = []
  let stack: string[] = []

  let res = 0
  for (let i = 0; i < word.length; i++) {
    const char = word[i]

    if (char === 'a') {
      stack.push(char)
    } else if (char === 'b') {
      if (stack.length > 0 && stack.at(-1) === 'a') {
        stack.push(char)
      } else {
        res++
        stack.push('a', char)
      }
    } else {
      if (stack.length > 0) {
        if (stack.at(-1) === 'b') {
          stack.pop()
          stack.pop()
        } else if (stack.at(-1) === 'a') {
          stack.pop()
          res++
        } else {
          res += 2
        }
      } else {
        res += 2
      }
      allStack.push([...stack])
      stack = []
    }
  }

  allStack.push(stack)
  while (allStack.length > 0) {
    let stack = allStack.pop()!
    while (stack.length > 0) {
      if (stack.at(-1) === 'a') {
        stack.pop()
        res +=2
      } else {
        stack.pop()
        stack.pop()
        res++
      }
    }
  }

  return res
};
// console.log(addMinimum("aaaacb"));
