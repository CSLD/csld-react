import React from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import { Game } from '../../../graphql/__generated__/typescript-operations'
import { DetailListHeader } from '../DetailListHeader/DetailListHeader'
import { darkTheme } from '../../../theme/darkTheme'
import { GameRatingBox } from '../GameRatingBox/GameRatingBox'
import { getGameRoute } from '../../../utils/routeUtils'

interface Props {
    readonly titleKey?: string
    readonly games?: Array<Pick<Game, 'id' | 'name' | 'averageRating' | 'amountOfRatings' | 'year'>>
}

const useStyles = createUseStyles({
    wrapper: {
        padding: 15,
        marginBottom: 12,
    },
    game: {
        display: 'flex',
        alignItems: 'center',
    },
    gameName: {
        minWidth: 0,
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        color: darkTheme.textOnLightDark,
        fontSize: '0.75rem',
        padding: '4px 6px',

        '&:hover': {
            color: darkTheme.textOnLight,
        },
    },
})

export const GameListPanel = ({ titleKey, games }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')

    return (
        <>
            {titleKey && <DetailListHeader>{t(titleKey)}</DetailListHeader>}
            {games && (
                <div className={classes.wrapper}>
                    {games.map(game => (
                        <a className={classes.game} href={getGameRoute(game)} key={game.id}>
                            <GameRatingBox
                                amountOfRatings={game.amountOfRatings}
                                rating={game.averageRating}
                                size="tiny"
                            />
                            <span className={classes.gameName}>
                                {game.name} ({game.year})
                            </span>
                        </a>
                    ))}
                </div>
            )}
        </>
    )
}
