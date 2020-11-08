let current = Math.ceil(Math.random() * 20)
const input = []
for (let i = 0; i < 10000; i += 1) {
    input.push(current)
    current += Math.floor(Math.random() * 5)
}

function solution(A, X) {
    const N = A.length
    if (N === 0) {
        return -1
    }
    let l = 0
    let r = N - 1
    while (l < r) {
        const m = Math.ceil((l + r) / 2)
        // console.log({ l, r, m, A: A[m] })
        if (A[m] > X) {
            r = m - 1
        } else {
            l = m
        }
    }
    if (A[l] === X) {
        return l
    }
    return -1
}

console.log({ input })

for (let X = 0; X <= current + 1; X += 1) {
    const test = solution(input, X)
    if (test === -1) {
        if (input.some(n => n === X)) {
            console.error('Not found X!')
        }
    } else if (input[test] !== X) {
        console.error('X not at designated index!')
    } else {
        // console.log(`${X}: OK`)
    }
}
