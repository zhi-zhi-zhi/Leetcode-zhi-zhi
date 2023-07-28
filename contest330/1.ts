function distinctIntegers(n: number): number {
  let set = new Set<number>()
  set.add(n)

  const curSet = new Set<number>()
  curSet.add(n)
  const nextSet = new Set<number>()

  while (true) {
    for (const val of Array.from(curSet.values())) {
      for (let i = 1; i <= val; i++) {
        if (val % i === 1 && !set.has(i)) {
          set.add(i)
          nextSet.add(i)
        }
      }
    }

    if (nextSet.size === 0)
      break

    curSet.clear()
    nextSet.forEach(val => {
      curSet.add(val)
    })
    nextSet.clear()
  }

  return set.size
}