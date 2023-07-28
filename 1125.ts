function smallestSufficientTeam(req_skills: string[], people: string[][]): number[] {
  const len = req_skills.length;
  const skillsMap = new Map<string, number>()

  for (let i = 0; i < req_skills.length; i++)
    skillsMap.set(req_skills[i], i)

  const peopleNum: number[][] = Array.from(Array(people.length), () => [])

  for (let i = 0; i < people.length; i++)
    for (const skill of people[i])
      peopleNum[i].push(skillsMap.get(skill)!)

  const memo = new Map<string, number[] | false>()

  return dfs(0, 0) || []


  function dfs(bitMask: number, index: number): number[] | false {
    if (bitMask === (1 << len) - 1)
      return []
    if (index >= people.length) return false
    const key = `${bitMask}_${index}`

    if (memo.has(key)) return memo.get(key)!

    // 第 index 用
    let newMask = bitMask
    for (const num of peopleNum[index])
      newMask |= (1 << num)

    const a = dfs(newMask, index + 1)
    // 第 index 不用
    const b = dfs(bitMask, index + 1)


    let res: false | number[] = false
    if (a === false && b === false) res = false
    else if (a === false && b !== false) res = b
    else if (a !== false && b === false) res = a.concat(index)
    else res = (a as number[]).length <= (b as number[]).length - 1 ? (a as number[]).concat(index) : (b as number[])

    memo.set(key, res)

    return res
  }
}

// console.log(smallestSufficientTeam(["java","nodejs","reactjs"], [["java"],["nodejs"],["nodejs","reactjs"]]))
