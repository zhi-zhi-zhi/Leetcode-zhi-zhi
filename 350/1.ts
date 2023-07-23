function distanceTraveled(mainTank: number, additionalTank: number): number {
    let res =  0

    while (mainTank > 0) {
        if (mainTank >= 5) {
            if (additionalTank > 0) {
                res += 50
                additionalTank--
                mainTank -= 4
            } else {
                res += 50
                mainTank -= 5
            }
        } else {
            res += mainTank * 10
            mainTank = 0
        }
    }

    return res
};
