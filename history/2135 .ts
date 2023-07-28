/**
 * 逆向思维：target word 删掉一个任意字符后，是否存在于 start words 中
 *
 * 1. 字符串无重复字符，且都为小写字母
 * 2. 任意排列 -> 字符串排序后再比较
 *   进阶：可用 bit 来存放 27 个小写字母的状态，不再需要排序
 * 3. 用 set 存放所有 start word
 * 4. target word 删掉任意一个字符，判断是否存在于 set 中
 * @param startWords
 * @param targetWords
 */
function wordCount(startWords: string[], targetWords: string[]): number {
  const set = new Set()
  let result = 0

  startWords.forEach(startWord => {
    // 用二进制掩码来表示由不重复小写字母组成的字符串
    let mask = 0

    // a -> 2^1, b -> 2^1 .... z -> 2^27
    for (let i = 0 ; i < startWord.length; i++) {
      mask |= (1 << (startWord.charCodeAt(i) - 97))
    }

    set.add(mask)
  })

  targetWords.forEach(targetWord => {
    let mask = 0

    // a -> 2^1, b -> 2^1 .... z -> 2^27
    for (let i = 0 ; i < targetWord.length; i++) {
      mask |= (1 << (targetWord.charCodeAt(i) - 97))
    }

    // 删掉任意一个字符，判断是否存在于 set 中
    for (let i = 0; i < targetWord.length; i++) {
      if (set.has(mask - (1 << (targetWord.charCodeAt(i) - 97)))) {
        result++
        break
      }
    }
  })

  return result
}