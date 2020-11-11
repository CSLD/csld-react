import React from 'react'
import { GameRatingPanel } from '../GameRatingPanel'

export default { title: 'GameRatingPanel' }

const game = {
    totalRating: 80,
    amountOfRatings: 18,
    amountOfPlayed: 21,
    ratingStats: [
        {
            rating: 10,
            count: 10,
        },
        {
            rating: 9,
            count: 3,
        },
        {
            rating: 8,
            count: 5,
        },
    ],
}

export const Panel = () => <GameRatingPanel game={game} />
