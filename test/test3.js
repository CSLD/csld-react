/* global CustomError, getLikedBrands, getTopBrandsForGender */

const getLikedBrands = () =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Test1' },
                { id: 2, name: 'Test2' },
                { id: 3, name: 'Test3' },
                { id: 4, name: 'Test4' },
                { id: 5, name: 'Test5' },
            ])
        }, 5000)
    })

const getTopBrandsForGender = () =>
    new Promise(resolve => {
        setTimeout(() => {
            resolve([
                { id: 1, name: 'Test1' },
                { id: 6, name: 'Test6' },
                { id: 3, name: 'Test3' },
                { id: 7, name: 'Test7' },
                { id: 5, name: 'Test5' },
            ])
        }, 4000)
    })

function solution(U, N) {
    return new Promise((resolve, reject) => {
        const brandsPromise = getLikedBrands(U.id)
        const topPromise = getTopBrandsForGender(U.gender)

        brandsPromise
            .then(liked => {
                if (liked.length >= N) {
                    resolve(liked.slice(0, Math.max(0, N)).map(({ name }) => name))
                    return
                }

                topPromise.then(top => {
                    const result = []
                    const seenIds = {}
                    liked.forEach(brand => {
                        result.push(brand.name)
                        seenIds[brand.id] = true
                    })

                    for (const brand of top) {
                        if (!seenIds[brand.id]) {
                            result.push(brand.name)

                            if (result.length === N) {
                                resolve(result)
                                return
                            }
                        }
                    }

                    reject(new CustomError('Not enough data'))
                })
            })
            .catch(e => {
                console.log(e)
                reject(new CustomError('Error fetching data'))
            })
    })
}

solution({ id: 1, gender: 'TEST' }, 5).then(response => {
    console.log({ response })
})
