// const input = [2, 1, 3, 5, 4]
// const input = [2, 3, 4, 1, 5]
// const input = [1, 3, 4, 2, 5]

const input = []
for (let i = 1; i < 1000; i += 1) {
    input.push(i)
}

for (let n = 1; n < 10; n += 1) {
    const iA = Math.round(Math.random() * (input.length - 1)) + 1
    const iB = Math.round(Math.random() * (input.length - 1)) + 1

    console.log({ iA, iB })

    const orig = input[iA]
    input[iA] = input[iB]
    input[iB] = orig
}

const fast = a => {
    let max = 0
    let count = 0
    for (let i = 0; i < a.length; i += 1) {
        max = Math.max(max, a[i])
        if (max === i + 1) {
            count += 1
        }
    }

    return count
}

const slow = a => {
    const arr = new Array(a.length)
    let max = 0
    let count = 0

    for (let i = 0; i < a.length; i += 1) {
        max = Math.max(max, a[i])
        arr[a[i]] = true
        let foundFalse = false
        for (let n = 1; n <= max; n += 1) {
            if (!arr[n]) {
                foundFalse = true
                break
            }
        }

        if (!foundFalse) {
            count += 1
        }
    }

    return count
}

const resA = fast(input)
const resB = slow(input)

console.log({ resA, resB, same: resA === resB ? 'yes' : '****** NO ******' })
