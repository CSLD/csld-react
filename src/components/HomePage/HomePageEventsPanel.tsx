import React from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import { EventBaseData } from './EventBaseDataPanel'
import { darkTheme } from '../../theme/darkTheme'
import { GameEventGrid } from './GameEventGrid'
import { GridHeader } from './GridHeader'

interface Props {
    readonly nextEvents?: (EventBaseData | undefined)[]
}

const useStyles = createUseStyles({
    wrapper: {
        width: 570,
        margin: '0 -10px',
        overflow: 'hidden',
        backgroundColor: darkTheme.background,
    },
})

const loadingEvents = [undefined, undefined, undefined, undefined, undefined, undefined]

export const HomePageEventsPanel = ({ nextEvents = loadingEvents }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')

    return (
        <div className={classes.wrapper}>
            <GridHeader>{t('HomePage.nextEvents')}</GridHeader>
            <GameEventGrid elements={nextEvents} />
        </div>
    )
}
