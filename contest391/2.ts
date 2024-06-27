function maxBottlesDrunk(numBottles: number, numExchange: number): number {
  let res = numBottles
  let empty = numBottles

  while (empty >= numExchange) {
    res += 1
    empty -= numExchange
    empty++
    numExchange++
  }

  return res
};