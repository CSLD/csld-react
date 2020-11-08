import React from 'react'
import { EventBaseData } from './EventBaseDataPanel'
import { createUseStyles } from 'react-jss'
import { darkTheme } from '../../theme/darkTheme'
import { GameEventGrid } from './GameEventGrid'
import { useTranslation } from 'react-i18next'
import { GridHeader } from './GridHeader'

interface Props {
    readonly nextEvents: EventBaseData[]
}

const useStyles = createUseStyles({
    wrapper: {
        width: 570,
        margin: '0 -10px',
        overflow: 'hidden',
        backgroundColor: darkTheme.background,
    },
})

export const HomePageEventsPanel = ({ nextEvents }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')

    return (
        <div className={classes.wrapper}>
            <GridHeader>{t('HomePage.nextEvents')}</GridHeader>
            <GameEventGrid elements={nextEvents} />
        </div>
    )
}
