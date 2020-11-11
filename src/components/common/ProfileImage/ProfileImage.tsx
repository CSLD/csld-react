import React from 'react'
import { createUseStyles } from 'react-jss'
import { darkTheme } from '../../../theme/darkTheme'

interface Props {
    readonly imageUrl?: string
}

const useStyles = createUseStyles({
    profileImage: {
        width: 50,
        height: 50,
        padding: 2,
        margin: '0 15px',
        border: `solid 1px ${darkTheme.text}`,
        borderRadius: '50%',
        boxSizing: 'border-box',
    },
})

export const ProfileImage = ({ imageUrl = '/images/user-icon.png' }: Props) => {
    const classes = useStyles()

    return <img src={imageUrl} className={classes.profileImage} alt="" />
}
