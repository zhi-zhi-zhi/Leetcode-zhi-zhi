function dividePlayers(skill: number[]): number {
  skill.sort((a, b) => a - b)
  const n = skill.length
  const average = skill.reduce((sum, val) => sum + val, 0) / n * 2
  let res = 0
  const arr = skill

  for (let i = 0; i < n / 2; i++) {
    if (arr[i] + arr[n-1-i] !== average) {
      return -1
    }

    res += arr[i] * arr[n-1-i]
  }


  return res
}

// dividePlayers([3,2,5,1,3,4])