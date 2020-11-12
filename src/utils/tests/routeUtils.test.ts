import { getGameRoute } from '../routeUtils'

describe('getGameRoute', () => {
    test('Ve znamení zla', () => {
        expect(getGameRoute({ id: '534', name: 'Ve znamení zla' })).toBe('/larp/ve-znameni-zla/cs/534')
    })

    test('De la Bête\n', () => {
        expect(getGameRoute({ id: '388', name: 'De la Bête' })).toBe('/larp/de-la-bete/cs/388')
    })

    test('Křížová výprava chudiny 1096 - premium', () => {
        expect(getGameRoute({ id: '1196', name: 'Křížová výprava chudiny 1096 - premium' })).toBe(
            '/larp/krizova-vyprava-chudiny-1096-premium/cs/1196',
        )
    })

    test('Bitva pěti armád [B5A, 2015]', () => {
        expect(getGameRoute({ id: '770', name: 'Bitva pěti armád [B5A, 2015]' })).toBe(
            '/larp/bitva-peti-armad-b5a-2015/cs/770',
        )
    })
})
