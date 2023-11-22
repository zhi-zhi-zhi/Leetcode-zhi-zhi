function findHighAccessEmployees(access_times: string[][]): string[] {
  const res: string[] = []

  const map = new Map<string, string[]>()

  for (const [name, time] of access_times) {
    const arr = map.get(name) ?? []
    arr.push(time)
    map.set(name, arr)
  }

  for (const key of Array.from(map.keys())) {
    const arr = map.get(key)
    arr.sort()

    for (let i = 0; i < arr.length - 2; i++) {
      if (inOneHour(arr[i], arr[i+2])) {
        res.push(key)
        break
      }
    }
  }

  return res
};

function inOneHour(a: string, b: string): boolean {
  const aHour = Number(a.substring(0, 2))
  const bHour = Number(b.substring(0, 2))

  if (aHour === bHour) return true
  else if (Math.abs(aHour - bHour) === 1) {
    const aMinutes = Number(a.substring(2))
    const bMinutes = Number(b.substring(2))

    if (aHour > bHour) {
      return aMinutes < bMinutes
    } else {
      return bMinutes < aMinutes
    }
  } else {
    return false
  }
}

// console.log(findHighAccessEmployees([["akuhmu","0454"],["aywtqh","0523"],["akuhmu","0518"],["ihhkc","0439"],["ihhkc","0508"],["akuhmu","0529"],["aywtqh","0530"],["aywtqh","0419"]]))