/**
 * There are n 1-indexed robots, each having a position on a line, health, and movement direction.
 *
 * You are given 0-indexed integer arrays positions, healths, and a string directions (directions[i] is either 'L' for left or 'R' for right). All integers in positions are unique.
 *
 * All robots start moving on the line simultaneously at the same speed in their given directions. If two robots ever share the same position while moving, they will collide.
 *
 * If two robots collide, the robot with lower health is removed from the line, and the health of the other robot decreases by one. The surviving robot continues in the same direction it was going. If both robots have the same health, they are both removed from the line.
 *
 * Your task is to determine the health of the robots that survive the collisions, in the same order that the robots were given, i.e. final heath of robot 1 (if survived), final health of robot 2 (if survived), and so on. If there are no survivors, return an empty array.
 *
 * Return an array containing the health of the remaining robots (in the order they were given in the input), after no further collisions can occur.
 *
 * Note: The positions may be unsorted.
 *
 * Constraints:
 *
 * 1 <= positions.length == healths.length == directions.length == n <= 10 ** 5
 * 1 <= positions[i], healths[i] <= 10 ** 9
 * directions[i] == 'L' or directions[i] == 'R'
 * All values in positions are distinct
 *
 * @param positions
 * @param healths
 * @param directions
 */
function survivedRobotsHealths(positions: number[], healths: number[], directions: string): number[] {
  const comb: [number, number, string, number][] = positions
    .map((_, index) => [positions[index], healths[index], directions[index], index])
  comb.sort((a, b) => a[0] - b[0])

  const res = []
  const leftStack = []

  const n = positions.length
  for (let i = 0; i < n; i++) {
    if (comb[i][2] === 'L') {
      leftStack.push(comb[i])
    } else if (comb[i][2] === 'R') {
      while (leftStack.length > 0 && leftStack[leftStack.length - 1][1] < comb[i][1]) {
        leftStack.pop()
        comb[i][1]--
      }

      if (leftStack.length > 0) {
        if (leftStack[leftStack.length - 1][1] === comb[i][1]
          || (--leftStack[leftStack.length - 1][1]) === 0)
          leftStack.pop()
      } else {
        res.push([comb[i][3], comb[i][1]])
      }
    }
  }

  for (const robot of leftStack) {
    res.push([robot[3], robot[1]])
  }

  return res.sort((a, b) => a[0] - b[0]).map(item => item[1])
}
