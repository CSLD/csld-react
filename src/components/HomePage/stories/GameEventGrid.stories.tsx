import React from 'react'
import { GameBaseData } from '../../common/GameBaseDataPanel/GameBaseDataPanel'
import { GameEventGrid } from '../GameEventGrid'

export default { title: 'GameEventGrid' }

const mockBaseGame: GameBaseData = {
    id: '123',
    name: 'Florie',
    averageRating: 95,
    players: 150,
    amountOfComments: 12,
    amountOfRatings: 23,
}

const games = [
    { ...mockBaseGame, name: 'Florie 2000' },
    { ...mockBaseGame, name: 'Florie 2001' },
    { ...mockBaseGame, name: 'Florie 2002' },
    { ...mockBaseGame, name: 'Florie 2003' },
    { ...mockBaseGame, name: 'Florie 2004' },
    { ...mockBaseGame, name: 'Florie 2005' },
]

export const GameGrid = () => <GameEventGrid elements={games} />
