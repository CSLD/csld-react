import React from 'react'
import { render } from '@testing-library/react'
import { GameRatingBox } from '../GameRatingBox'
import { componentTestIds } from '../../../componentTestIds'

describe('GameRatingBox', () => {
    test('render with no rating', async () => {
        const tree = render(<GameRatingBox rating={0} />)

        const wrapper = await tree.findByTestId(componentTestIds.gameRatingBox.wrapper)
        expect(wrapper.className).toEqual(expect.stringContaining('notRated'))
        expect(wrapper.textContent).toBe('-')
    })

    test('render with mediocre rating', async () => {
        const tree = render(<GameRatingBox rating={37.6} />)

        const wrapper = await tree.findByTestId(componentTestIds.gameRatingBox.wrapper)
        expect(wrapper.className).toEqual(expect.stringContaining('mediocre'))
        expect(wrapper.textContent).toBe('3.8')
    })

    test('render with average rating', async () => {
        const tree = render(<GameRatingBox rating={59.3} />)

        const wrapper = await tree.findByTestId(componentTestIds.gameRatingBox.wrapper)
        expect(wrapper.className).toEqual(expect.stringContaining('average'))
        expect(wrapper.textContent).toBe('5.9')
    })

    test('render with great rating', async () => {
        const tree = render(<GameRatingBox rating={100} />)

        const wrapper = await tree.findByTestId(componentTestIds.gameRatingBox.wrapper)
        expect(wrapper.className).toEqual(expect.stringContaining('great'))
        expect(wrapper.textContent).toBe('10.0')
    })
})
