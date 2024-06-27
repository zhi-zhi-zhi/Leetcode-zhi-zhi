function maximumHappinessSum(happiness: number[], k: number): number {
    let res = 0
    happiness.sort((a, b) => b - a)

    for (let i = 0; i < happiness.length; i++) {
        res += Math.max(happiness[i] - i, 0)
        if (i + 1 >= k) break
    }

    return res
};
