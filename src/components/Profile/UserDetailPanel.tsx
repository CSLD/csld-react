import React from 'react'
import { createUseStyles } from 'react-jss'
import { darkTheme } from '../../theme/darkTheme'
import { WidthFixer } from '../common/WidthFixer/WidthFixer'
import { useTranslation } from 'react-i18next'
import { Maybe } from 'graphql/jsutils/Maybe'

interface UserData {
    readonly amountOfPlayed: number
    readonly amountOfCreated: number
    readonly person: {
        readonly name: string
        readonly email: string
        readonly nickname?: Maybe<string>
        readonly birthDate?: Maybe<string>
    }
}

interface Props {
    readonly id?: string
    readonly userData?: UserData
}

const useStyles = createUseStyles({
    wrapper: {
        backgroundColor: darkTheme.background,
        padding: '20px 0',
    },
    fixer: {
        display: 'flex',
    },
    image: {
        width: 80,
        height: 80,
        padding: 2,
        border: `solid 1px ${darkTheme.textOnLight}`,
        marginRight: 20,
        flexGrow: 0,
        flexShrink: 0,
    },
    header: {
        fontSize: '1.75rem',
        fontWeight: 'bold',
        marginBottom: '0.3rem',
        color: darkTheme.textGreen,
        lineHeight: '100%',
    },
    text: {
        fontSize: '0.75rem',
        color: darkTheme.textLighter,
    },
})

const computeAge = (birthDate: Maybe<string>) => {
    if (!birthDate) {
        return 0
    }

    return Math.round((new Date().getTime() - new Date(birthDate).getTime()) / (365.2425 * 24 * 60 * 60 * 1000))
}

const UserDetailPanel = ({ id, userData }: Props) => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const age = computeAge(userData?.person.birthDate)

    return (
        <div className={classes.wrapper}>
            <WidthFixer className={classes.fixer}>
                {id && <img src={`/user-icon?id=${id}`} className={classes.image} alt="" />}
                {!id && <div className={classes.image} />}
                {userData && (
                    <div>
                        <div className={classes.header}>
                            {userData.person.nickname} {userData.person.name} {userData.person.email}
                        </div>
                        <div className={classes.text}>
                            {t('UserDetail.player', { count: userData.amountOfPlayed ?? 0 })}
                            {t('UserDetail.author', { count: userData.amountOfCreated ?? 0 })}
                            {age > 0 ? t('UserDetail.age', { age }) : ''}
                        </div>
                    </div>
                )}
            </WidthFixer>
        </div>
    )
}

export default UserDetailPanel
