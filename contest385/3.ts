/**
 *
 * m == mat.length
 * n == mat[i].length
 * 1 <= m, n <= 6
 * 1 <= mat[i][j] <= 9
 *
 * @param mat
 */
function mostFrequentPrime(mat: number[][]): number {
    const m = mat.length, n = mat[0].length
    if (m === 1 && n === 1) return -1

    const primeMap = new Map<string, number>()

    for (let i = 0; i < m; i++) {
        const str = mat[i].join('')
        const strRe = mat[i].reverse().join('')

        for (let len = 2; len <= str.length; len++) {
            for (let start = 0; start <= str.length - len; start++) {
                const x = str.substring(start, start + len)
                if (primeMap.has(x)) {
                    primeMap.set(x, primeMap.get(x) + 1)
                } else if (isPrime(x)) {
                    primeMap.set(x, 1)
                }

                const y = x.split('').reverse().join('')
                if (primeMap.has(y)) {
                    primeMap.set(y, primeMap.get(y) + 1)
                } else if (isPrime(y)) {
                    primeMap.set(y, 1)
                }
            }
        }
    }

    for (let i = 0; i < n; i++) {
        const arr = []
        for (let j = 0; j < m; j++) {
            arr.push(mat[j][i])
        }
        const str = arr.join('')
        const strRe = arr.reverse().join('')
        for (let len = 2; len <= str.length; len++) {
            for (let start = 0; start <= str.length - len; start++) {
                const x = str.substring(start, start + len)
                if (primeMap.has(x)) {
                    primeMap.set(x, primeMap.get(x) + 1)
                } else if (isPrime(x)) {
                    primeMap.set(x, 1)
                }

                const y = x.split('').reverse().join('')
                if (primeMap.has(y)) {
                    primeMap.set(y, primeMap.get(y) + 1)
                } else if (isPrime(y)) {
                    primeMap.set(y, 1)
                }
            }
        }
    }

    for (let i = m - 1; i >= 0; i--) {
        const arr = []
        for (let j = 0; j < n && i + j < m; j++) {
            arr.push(mat[i+j][j])
        }
        const str = arr.join('')
        const strRe = arr.reverse().join('')

        for (let len = 2; len <= str.length; len++) {
            for (let start = 0; start <= str.length - len; start++) {
                const x = str.substring(start, start + len)
                if (primeMap.has(x)) {
                    primeMap.set(x, primeMap.get(x) + 1)
                } else if (isPrime(x)) {
                    primeMap.set(x, 1)
                }

                const y = x.split('').reverse().join('')
                if (primeMap.has(y)) {
                    primeMap.set(y, primeMap.get(y) + 1)
                } else if (isPrime(y)) {
                    primeMap.set(y, 1)
                }
            }
        }

    }

    for (let j = 1; j < n - 1; j++) {
        const arr = []
        for (let i = 0; i < m && i + j < n; i++) {
            arr.push(mat[i][j+i])
        }
        const str = arr.join('')
        const strRe = arr.reverse().join('')

        for (let len = 2; len <= str.length; len++) {
            for (let start = 0; start <= str.length - len; start++) {
                const x = str.substring(start, start + len)
                if (primeMap.has(x)) {
                    primeMap.set(x, primeMap.get(x) + 1)
                } else if (isPrime(x)) {
                    primeMap.set(x, 1)
                }

                const y = x.split('').reverse().join('')
                if (primeMap.has(y)) {
                    primeMap.set(y, primeMap.get(y) + 1)
                } else if (isPrime(y)) {
                    primeMap.set(y, 1)
                }
            }
        }

    }

    for (let i = m - 1; i >= 0; i--) {
        const arr = []
        for (let j = n - 1; j >= 0 && i + j < m; j--) {
            arr.push(mat[i+(n-1-j)][j])
        }
        const str = arr.join('')
        const strRe = arr.reverse().join('')

        for (let len = 2; len <= str.length; len++) {
            for (let start = 0; start <= str.length - len; start++) {
                const x = str.substring(start, start + len)
                if (primeMap.has(x)) {
                    primeMap.set(x, primeMap.get(x) + 1)
                } else if (isPrime(x)) {
                    primeMap.set(x, 1)
                }

                const y = x.split('').reverse().join('')
                if (primeMap.has(y)) {
                    primeMap.set(y, primeMap.get(y) + 1)
                } else if (isPrime(y)) {
                    primeMap.set(y, 1)
                }
            }
        }

    }

    for (let j = n-2; j > 0; j--) {
        const arr = []
        for (let i = 0; i < m && i + j < n; i++) {
            arr.push(mat[i][j-i])
        }

        const str = arr.join('')
        const strRe = arr.reverse().join('')

        for (let len = 2; len <= str.length; len++) {
            for (let start = 0; start <= str.length - len; start++) {
                const x = str.substring(start, start + len)
                if (primeMap.has(x)) {
                    primeMap.set(x, primeMap.get(x) + 1)
                } else if (isPrime(x)) {
                    primeMap.set(x, 1)
                }

                const y = x.split('').reverse().join('')
                if (primeMap.has(y)) {
                    primeMap.set(y, primeMap.get(y) + 1)
                } else if (isPrime(y)) {
                    primeMap.set(y, 1)
                }
            }
        }

    }

    const arr = Array.from(primeMap.entries())
        .map(item => {
            return [Number.parseInt(item[0]), item[1]]
        })
        .sort((a, b) => {
            if (a[1] === b[1]) return b[0] - a[0]
            else return b[1] - a[1]
        })

    if (arr.length === 0) return -1
    else return Number(arr[0][0])
};

function isPrime(num: string) {
    if (num.length < 2) return false
    const number = Number(num)
    if (number <= 1) {
        return false;
    }
    if (number <= 3) {
        return true;
    }
    if (number % 2 === 0 || number % 3 === 0) {
        return false;
    }
    let i = 5;
    while (i * i <= number) {
        if (number % i === 0 || number % (i + 2) === 0) {
            return false;
        }
        i += 6;
    }
    return true;
}

// console.log(mostFrequentPrime([[1,1],[9,9],[1,1]]))
console.log(mostFrequentPrime([[9,9,2],[3,2,3]]))