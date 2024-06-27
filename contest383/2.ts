/**
 *
 * 1 <= word.length <= 50
 * 1 <= k <= word.length
 * word仅由小写英文字母组成。
 *
 * 考虑暴力法，因为 word length 最大是 50
 *
 * @param word
 * @param k
 */
function minimumTimeToInitialState(word: string, k: number): number {
    let cost = Math.ceil(word.length / k)
    let left = 1, right = Math.ceil(word.length / k)

    for (let i = 1; i <= cost; i++) {
        if (word.startsWith(word.substring(i * k)))
            return i
    }

    return cost
};

// console.log(minimumTimeToInitialState("babab", 1))