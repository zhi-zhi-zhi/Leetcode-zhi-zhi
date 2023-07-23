function garbageCollection(garbage: string[], travel: number[]): number {
  let endOfGlass = 0
  let endOfPaper = 0
  let endOfMental = 0
  let res = 0
  let sumOfGlass = 0
  let sumOfPaper = 0
  let sumOfMental = 0

  for (let i = 0; i < garbage.length; i++) {
    let curMentalCount = 0
    let curPaperCount = 0
    let curGlassCount = 0

    for (const char of garbage[i]) {
      if (char === 'M')
        curMentalCount++
      else if (char === 'P')
        curPaperCount++
      else
        curGlassCount++
    }

    if (curMentalCount > 0) {
      endOfMental = i
      sumOfMental += curMentalCount
    }
    if (curPaperCount > 0) {
      endOfPaper = i
      sumOfPaper += curPaperCount
    }
    if (curGlassCount > 0) {
      endOfGlass = i
      sumOfGlass += curGlassCount
    }
  }

  const preSum = Array(travel.length + 1).fill(0)
  for (let i = 1; i <= travel.length; i++)
    preSum[i] = preSum[i-1] + travel[i-1]
  sumOfPaper += preSum[endOfPaper]
  sumOfMental += preSum[endOfMental]
  sumOfGlass += preSum[endOfGlass]


  return sumOfGlass + sumOfMental + sumOfPaper
}
