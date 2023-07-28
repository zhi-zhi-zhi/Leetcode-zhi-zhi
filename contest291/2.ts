function minimumCardPickup(cards: number[]): number {
  const map = new Map<number, number[]>()
  cards.forEach((card, index) => {
    if (map.has(card)) {
      map.get(card).push(index)
    } else {
      map.set(card, [index])
    }
  })

  let res = Number.MAX_SAFE_INTEGER

  Array.from(map.values()).filter(value => {
    return value.length >= 2
  }).forEach(value => {
    let mini = value[1] - value[0]
    for (let i = 2; i < value.length; i++)
      mini = Math.min(mini, value[i] - value[i-1])
    res = Math.min(res, mini)
  })

  return res === Number.MAX_SAFE_INTEGER ? -1 : res + 1
}