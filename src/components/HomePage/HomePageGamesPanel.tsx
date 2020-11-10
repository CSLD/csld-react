import React, { useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import { GameBaseData } from '../common/GameBaseDataPanel/GameBaseDataPanel'
import { GridHeader } from './GridHeader'
import { IconMoveLeft, IconMoveRight } from '../common/Icons/Icons'
import { GameEventGrid } from './GameEventGrid'
import { darkTheme } from '../../theme/darkTheme'

interface Props {
    readonly lastGames?: (GameBaseData | undefined)[]
    readonly topGames?: (GameBaseData | undefined)[]
}

const useStyles = createUseStyles({
    wrapper: {
        width: 570,
        overflow: 'hidden',
        backgroundColor: darkTheme.background,
    },
    iconButton: {
        cursor: 'pointer',
        padding: 5,
        margin: '0 10px',
        border: 0,
        color: darkTheme.text,
        backgroundColor: darkTheme.background,

        '&:focus': {
            outline: 0,
        },
    },
    inner: {
        width: 1180,
        display: 'flex',
        position: 'relative',
        transition: 'left 0.3s ease-out',
    },
    item: {
        width: 590,
    },
})

const gamesLoading = [undefined, undefined, undefined, undefined, undefined, undefined]

export const HomePageGamesPanel = ({ lastGames = gamesLoading, topGames = gamesLoading }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const [carouselPage, setCarouselPage] = useState(0)

    const handleChangePage = () => setCarouselPage(old => 1 - old)

    return (
        <div className={classes.wrapper}>
            <div className={classes.inner} style={{ left: -10 - carouselPage * 590 }}>
                <div className={classes.item}>
                    <GridHeader>
                        <button type="button" className={classes.iconButton} onClick={handleChangePage}>
                            <IconMoveLeft />
                        </button>
                        {t('HomePage.lastAddedGames')}
                        <button type="button" className={classes.iconButton} onClick={handleChangePage}>
                            <IconMoveRight />
                        </button>
                    </GridHeader>
                    <GameEventGrid elements={lastGames} />
                </div>
                <div className={classes.item}>
                    <GridHeader>
                        <button type="button" className={classes.iconButton} onClick={handleChangePage}>
                            <IconMoveLeft />
                        </button>
                        {t('HomePage.bestGames')}
                        <button type="button" className={classes.iconButton} onClick={handleChangePage}>
                            <IconMoveRight />
                        </button>
                    </GridHeader>
                    <GameEventGrid elements={topGames} />
                </div>
            </div>
        </div>
    )
}
