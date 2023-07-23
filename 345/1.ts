function circularGameLosers(n: number, k: number): number[] {
    const flagArr = Array(n).fill(false)
    let i = 0
    let count = 0

    while (true) {
        if (flagArr[i]) break
        flagArr[i] = true
        count++
        i = (i + count * k) % n
    }

    return flagArr.map((flag, index) => ({
        flag,
        index
    })).filter(item => item.flag === false)
        .map(item => item.index + 1)
};
