// class Encrypter {
//   keys: string[]
//   keyMap: Map<string, number>
//   values: string[]
//   dictionarySet: Set<string>
//   helpDictionarySet: Set<string>
//   valuesMap: Map<string, number[]>
//   nextLevel: Map<string, any>
//
//   constructor(keys: string[], values: string[], dictionary: string[]) {
//     this.keys = keys
//     const keyMap = new Map<string, number>()
//     keys.forEach((key, index) => {
//       keyMap.set(key, index)
//     })
//     this.keyMap = keyMap
//
//     this.values = values
//     const valuesMap = new Map<string, number[]>()
//     values.forEach((value, index) => {
//       if (valuesMap.has(value))
//         valuesMap.get(value)!.push(index)
//       else
//         valuesMap.set(value, [index])
//     })
//     this.valuesMap = valuesMap
//
//     const dictionarySet = new Set<string>()
//     const helpDictionarySet = new Set<string>()
//     dictionary.forEach(item => {
//       dictionarySet.add(item)
//       for (let i = 1; i < item.length + 1; i++) {
//         helpDictionarySet.add(item.substring(0, i))
//       }
//     })
//     this.dictionarySet = dictionarySet
//     this.helpDictionarySet = helpDictionarySet
//   }
//
//   encrypt(word1: string): string {
//     const res: string[] = []
//     for (let char of word1)
//       res.push(this.values[this.keyMap.get(char)!])
//     return res.join('')
//   }
//
//   decrypt(word2: string): number {
//     const split = []
//     for (let i = 0; i < word2.length; i += 2) {
//       split.push(word2.substring(i, i + 2))
//     }
//
//     return this.dfs(split, 0)
//   }
//
//   private dfs(split: string[], index: number): number {
//     if (index >= split.length) {
//       if (this.dictionarySet.has(split.join('')))
//         return 1
//       else
//         return 0
//     }
//
//     let res = 0
//     const origin = split[index]
//     for (let j of (this.valuesMap.get(origin) ?? [])) {
//       split[index] = this.keys[j]
//       if (this.helpDictionarySet.has(split.slice(0, index + 1).join(''))) {
//         res += this.dfs(split, index + 1)
//       } else {
//       }
//     }
//     split[index] = origin
//
//     return res
//   }
// }
//
// const obj = new Encrypter(['a', 'b', 'c', 'd'], ['ei', 'zf', 'ei', 'am'], ['abcd', 'acbd', 'adbc', 'badc', 'dacb', 'cadb', 'cbda', 'abad'])
// console.log(obj.decrypt('eizfeiam'))
// /**
//  * Your Encrypter object will be instantiated and called as such:
//  * var obj = new Encrypter(keys, values, dictionary)
//  * var param_1 = obj.encrypt(word1)
//  * var param_2 = obj.decrypt(word2)
//  */

function longestDupSubstring(str: string): string {
  const arr = Array.from(str, (char) => char.charCodeAt(0) - 96)
  // 1. Rabin Karp algorithm and binary serach
  let left = 0, right = str.length - 1
  let start = 0, dupLen = 0

  while (left <= right) {
    const mid = left + Math.trunc((right - left) / 2)
    const [isFind, newStart] = RabinKarp(mid)

    if (isFind) {
      left = mid + 1

      // update len
      start = newStart
      dupLen = mid
    } else {
      right = mid - 1
    }
  }

  return str.substring(start, start + dupLen)


  function RabinKarp(searchLen: number): [success: boolean, start: number] {
    if (searchLen > str.length) return [false, 0]
    const n = str.length
    const modulo = 2 ** 31 - 1
    const map = new Map<number, number[]>()
    const p = 12
    let pEx = 1
    let rollHash = 0

    for (let i = 0; i < searchLen; i++) {
      rollHash = (rollHash * p + arr[i]) % modulo
      if (i !== searchLen -1)
        pEx = (pEx * p) % modulo
    }
    map.set(rollHash, [0])

    for (let i = searchLen; i < n; i++) {
      rollHash = (((rollHash - (arr[i - searchLen] * pEx) % modulo + modulo) % modulo) * p + arr[i]) % modulo

      // check for avoid hash collision
      for (const start of (map.get(rollHash) ?? [])) {
        let j = 0
        for (; j < searchLen; j++)
          if (arr[j + start] !== arr[j + i - searchLen + 1 ])
            break
        if (j === searchLen)
          return [true, start]
      }

      map.set(rollHash, (map.get(rollHash) ?? []).concat(i - searchLen + 1))
    }

    return [false, 0]
  }
}

console.log(longestDupSubstring('aa'))
