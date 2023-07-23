function minNumberOfHours(initialEnergy: number, initialExperience: number, energy: number[], experience: number[]): number {
  let res = 0

  let energySum = energy.reduce((sum, cur) => sum + cur, 0)
  res += Math.max(energySum - initialEnergy + 1, 0)

  let ex = initialExperience
  for (let i = 0; i < experience.length; i++) {
    if (ex <= experience[i]) {
      res += experience[i] - ex + 1
      ex = experience[i] + 1
    }

    ex += experience[i]
  }

  return res
}
