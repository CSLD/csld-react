import React from 'react'
import { createUseStyles } from 'react-jss'
import { Label } from '../../../graphql/__generated__/typescript-operations'
import { darkTheme } from '../../../theme/darkTheme'

interface Props {
    readonly labels: Array<Pick<Label, 'id' | 'name' | 'description'>>
}

const useStyles = createUseStyles({
    wrapper: {
        padding: '0 10px',
        display: 'flex',
        flexWrap: 'wrap',
    },
    label: {
        borderRadius: 3,
        padding: '3px 5px',
        margin: '0 5px 5px 0',
        backgroundColor: darkTheme.backgroundWhite,
        color: darkTheme.textOnLightDark,
        fontSize: '0.75rem',
        whiteSpace: 'nowrap',

        '&:hover': {
            backgroundColor: darkTheme.textGreen,
            color: darkTheme.backgroundWhite,
        },
    },
})

/**
 * Label list in game /event detail
 */
const DetailLabelList = ({ labels }: Props) => {
    const classes = useStyles()

    return (
        <div className={classes.wrapper}>
            {labels.map(label => (
                <a href="/" className={classes.label} key={label.id} title={label.description ?? undefined}>
                    {label.name}
                </a>
            ))}
        </div>
    )
}

export default DetailLabelList
