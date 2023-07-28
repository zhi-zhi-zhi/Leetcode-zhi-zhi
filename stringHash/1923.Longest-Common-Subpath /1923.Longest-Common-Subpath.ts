// function longestCommonSubpath(n: number, paths: number[][]): number {
//   const pathCount = paths.length
//   const paths2: bigint[][] = paths.map(path => (path.map((num) => BigInt(num))))
//   let left = 0, right = Math.min(...paths.map(path => path.length))
//
//   while (left < right) {
//     const mid = right - Math.trunc((right - left) / 2)
//
//     if (check(mid))
//       left = mid
//     else
//       right = mid - 1
//   }
//
//   return left
//
//   function check(len: number): boolean {
//     const hashCountMap = new Map<string, number>()
//     const base1 = BigInt(n+3), modulo1 = BigInt(1e15 + 5)
//     // const base2 = BigInt(n+4), modulo2 = BigInt(1e16 + 6)
//     let base1Ex = BigInt(1)
//     // let base2Ex = BigInt(1)
//
//     for (let i = 0; i < len - 1; i++) {
//       base1Ex = (base1Ex * base1) % modulo1
//       // base2Ex = (base2Ex * base2) % modulo2
//     }
//
//     for (let i = 0; i < pathCount; i++) {
//       const hashSet = new Set<string>()
//       let hash1 = BigInt(0)
//       let hash2 = BigInt(0)
//
//       for (let j = 0; j < paths[i].length; j++) {
//         if (j >= len) {
//           hash1 = (hash1 - paths2[i][j - len] * base1Ex % modulo1 + modulo1) % modulo1
//           // hash2 = (hash2 - paths2[i][j - len] * base2Ex % modulo2 + modulo2) % modulo2
//         }
//
//         hash1 = (hash1 * base1 + paths2[i][j]) % modulo1
//         // hash2 = (hash2 * base2 + paths2[i][j]) % modulo2
//
//         // const key = `${hash1}_${hash2}`
//         const key = `${hash1}`
//         if (j >= len - 1 && !hashSet.has(key)) {
//           hashSet.add(key)
//           hashCountMap.set(key, (hashCountMap.get(key) ?? 0) + 1)
//         }
//       }
//     }
//
//
//     // @ts-ignore
//     for (const entries of (hashCountMap.entries() ?? []))
//       if (entries[1] === pathCount)
//         return true
//
//     return false
//   }
// }
//
//


function sumScores(s: string): number {
  const modulo = 1e7 + 9
  const base = 26
  const arr = Array.from(s, char => char.charCodeAt(0) - 96)
  const n = arr.length
  const prefixHashVal = Array(n+1).fill(0)
  const baseExArr = Array(n+1).fill(1)

  for (let i = 0; i < n; i++) {
    prefixHashVal[i+1] = ((prefixHashVal[i] * base) % modulo + arr[i]) % modulo
    baseExArr[i+1] = (baseExArr[i] * base) % modulo
  }

  let res = 0
  // iterate s[i]
  // s.substring(i, n)
  for (let i = 0; i < n; i++) {
    // can't score.
    if (s[0] !== s[i])
      continue

    let left = i, right = n - 1
    while (left <= right) {
      const mid = right - Math.trunc((right - left) / 2)

      const curHashVal = (prefixHashVal[mid + 1] - (prefixHashVal[i] * baseExArr[mid - i + 1]) % modulo + modulo) % modulo
      if (curHashVal === prefixHashVal[mid - i + 1]) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }

    res += left - i
  }

  return res
};
