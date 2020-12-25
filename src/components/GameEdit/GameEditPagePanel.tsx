import React from 'react'
import { createUseStyles } from 'react-jss'
import GameEditPanel from './GameEditPanel'
import { darkTheme } from '../../theme/darkTheme'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'

const useStyles = createUseStyles({
    row: {
        backgroundColor: darkTheme.backgroundNearWhite,
        padding: '16px 0',
    },
    body: {
        backgroundColor: darkTheme.backgroundWhite,
    },
})

const GameEditPage = () => {
    const classes = useStyles()

    return (
        <div className={classes.row}>
            <WidthFixer className={classes.body}>
                <GameEditPanel />
            </WidthFixer>
        </div>
    )
}

export default GameEditPage
