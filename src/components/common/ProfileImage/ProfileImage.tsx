import React from 'react'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { darkTheme } from '../../../theme/darkTheme'

interface Props {
    readonly imageUrl?: string
    readonly className?: string
}

const useStyles = createUseStyles({
    profileImage: {
        width: 50,
        height: 50,
        padding: 2,
        marginRight: 15,
        border: `solid 1px ${darkTheme.text}`,
        borderRadius: '50%',
        boxSizing: 'border-box',
    },
})

export const ProfileImage = ({ imageUrl = '/images/user-icon.png', className }: Props) => {
    const classes = useStyles()

    return <img src={imageUrl} className={classNames(classes.profileImage, className)} alt="" />
}
