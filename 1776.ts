import 'core-js';

function getCollisionTimes(cars: [number, number][]): number[] {
  const n = cars.length, res = Array<number>(n).fill(-1)
  const stack: [number, number][] = [[cars.at(-1)[1], 10 ** 7]]

  for (let i = n - 2; i >= 0; i--) {
    const [p, s] = cars[i]

    let baseGap = cars[i+1][0] - p, time = 0

    while (stack.length > 0) {
      const [frontSpeed, frontTime] = stack.at(-1)
      const selfMiles = s * frontTime, preMiles = baseGap + (frontSpeed * (frontTime - time))

      if (selfMiles >= preMiles) {
        const dt = (baseGap - s * time) / (s - frontSpeed)
        stack.push([s, dt + time])
        res[i] = dt + time
        break
      }

      baseGap = preMiles
      time = frontTime
      stack.pop()
    }

    if (stack.length === 0)
      stack.push([s, 10 ** 7])
  }

  return res
}

// console.log(getCollisionTimes([[1,2],[2,1],[4,3],[7,2]]))