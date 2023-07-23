function longestContinuousSubstring(s: string): number {
  let max = 1

  let stack = []
  let curCount = 0

  Array.from(s, char => char.charCodeAt(0) - 97)
    .forEach(code => {
      if (stack.length > 0 && code - stack[stack.length-1] === 1) {
        stack.push(code)
        curCount++
      } else {
        stack.splice(0, stack.length, code)
        curCount = 1
      }

      max = Math.max(max, curCount)
  })

  return max
}
