import React from 'react'
import { createUseStyles } from 'react-jss'
import { darkTheme } from '../../theme/darkTheme'
import { useTranslation } from 'react-i18next'
import { Button } from 'react-bootstrap'

interface Props {
    readonly onDismiss: () => void
}

const useStyles = createUseStyles({
    text: {
        fontSize: '0.70rem',
        color: darkTheme.text,
        width: 350,
        textAlign: 'left',
        marginBottom: 16,
    },
})

const AuthorWarningPanel = ({ onDismiss }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')

    return (
        <div>
            <p className={classes.text}>{t('GameDetail.ownRatingWarning')}</p>
            <Button variant="light" size="sm" onClick={onDismiss}>
                {t('GameDetail.ownRatingWarningDismiss')}
            </Button>
        </div>
    )
}

export default AuthorWarningPanel
