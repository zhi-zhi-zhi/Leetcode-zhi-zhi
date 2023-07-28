/**
 * 1 <= pushed.length <= 1000
 * 0 <= pushed[i] <= 1000
 * All the elements of pushed are unique.
 *

 *
 * @param pushed
 * @param popped
 */
function validateStackSequences(pushed: number[], popped: number[]): boolean {
  return validateStackSequencesVersion2(pushed, popped)
}

/**
 * Time complexity: O(n)
 * Space complexity: O(n)
 * @param pushed
 * @param popped
 */
function validateStackSequencesVersion1(pushed: number[], popped: number[]): boolean {
  const stack = []
  let i = 0;

  for (let x of pushed) {
    stack.push(x)
    while (stack.length > 0 && stack[stack.length - 1] === popped[i]) {
      stack.pop()
      i++
    }
  }

  return stack.length === 0
}

/**
 * Time complexity: O(n)
 * Space complexity: O(1)
 *
 * @param pushed
 * @param popped
 */
function validateStackSequencesVersion2(pushed: number[], popped: number[]): boolean {
  let i = 0, j = 0

  for (let x of pushed) {
    pushed[i++] = x
    while (i > 0 && pushed[i - 1] === popped[j]) {
      --i;
      ++j
    }
  }

  return i == 0
}