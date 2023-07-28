function scoreOfParentheses(s: string): number {
  let res = 0,
    stack: number[][] = [[]],
    left = 0,
    right = 0,
    again = false

  for (let char of s) {
    if (char === '(') {
      stack.push([])
    } else if (char === ')'){
      const sum = stack[stack.length-1].reduce((sum, a) => sum += a, 0)
      stack.pop()
      stack[stack.length-1].push(sum === 0 ? 1 : sum * 2)
    }
  }

  return stack[stack.length-1].reduce((sum, a) => sum += a, 0)
}


console.log(scoreOfParentheses("(()) ( (()()()) (()()()) (()()()) (()) )"))