const prime = 1000000007 + 33;

function stringHash(str: string) {
    let hash = 0;
    const p = 31; // 取一个适当的质数作为基数

    for (let i = 0; i < str.length; i++) {
        hash = (hash * p + (str.charCodeAt(i) - 96)) % prime;
    }

    return hash;
}

/**
 *
 * 1 <= word.length <= 10^5
 * word 只包含小写英文字母。
 * 1 <= forbidden.length <= 10^5
 * 1 <= forbidden[i].length <= 10
 * forbidden[i] 只包含小写英文字母。
 * @param word
 * @param forbidden
 */
function longestValidSubstring(word: string, forbidden: string[]): number {
    let result = 0

    const set = new Set<number>()
    for (let str of forbidden)
        set.add(stringHash(str))

    let right = 0, left = 0

    while (right < word.length) {
        let maxIndex = -1

        for (let i = 0; i < 10 && (right - i) >= left; i++) {
            if (set.has(stringHash(word.substring(right - i, right + 1)))) {
                maxIndex = right - i
                break
            }
        }


        if (maxIndex !== -1)
            left = maxIndex + 1

        result = Math.max(result, (right - left + 1))
        right++
    }

    return result
}
