import React from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import { HeaderNavLink } from './HeaderNavLink'
import { darkTheme } from '../../../theme/darkTheme'
import { IconSearch } from '../Icons/Icons'
import { WidthFixer } from '../WidthFixer/WidthFixer'

interface Props {}

const useStyles = createUseStyles({
    container: {
        backgroundColor: darkTheme.backgroundLight,
        borderBottom: '1px solid black',
    },
    innerContainer: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        height: 55,
    },
    rightSpacer: {
        marginRight: 15,
    },
    part: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonLike: {
        backgroundColor: darkTheme.redLight,
        borderRadius: 4,
        padding: 8,
        fontSize: '0.8em',
        fontWeight: 700,
        color: darkTheme.textLight,

        '&:hover': {
            backgroundColor: darkTheme.red,
        },
    },
    searchInput: {
        backgroundColor: darkTheme.backgroundControl,
        color: darkTheme.textLight,
        border: 'none',
        padding: '5px 24px 5px 8px',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        width: 150,
        transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',

        '&:focus': {
            borderColor: '#66afe9',
            outline: 0,
            boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6)',
        },
    },
    searchButton: {
        backgroundColor: darkTheme.backgroundControl,
        color: darkTheme.text,
        border: 0,
        width: 30,
        height: 26,
        padding: '2px 0 0 4px',
        overflow: 'hidden',
        cursor: 'pointer',
        borderTopRightRadius: 4,
        borderBottomRightRadius: 4,

        '&:focus': {
            outline: 0,
        },
    },
})

export const PageHeader = () => {
    const classes = useStyles()
    const { t } = useTranslation('common')

    return (
        <nav className={classes.container}>
            <WidthFixer className={classes.innerContainer}>
                <div className={classes.part}>
                    <a href="/" className={classes.rightSpacer}>
                        <img
                            src="/images/ld-logo-ver-091EA8500E0CBCBECE1FACC3A785855B.png"
                            height="25"
                            alt={t('PageHeader.csld')}
                        />
                    </a>
                    <HeaderNavLink href="/">{t('PageHeader.games')}</HeaderNavLink>
                    <HeaderNavLink href="/">{t('PageHeader.events')}</HeaderNavLink>
                    <HeaderNavLink href="https://larpy.cz" target="_blank">
                        {t('PageHeader.blog')}
                    </HeaderNavLink>
                    <HeaderNavLink href="/">
                        <span className={classes.buttonLike}>{t('PageHeader.addEvent')}</span>
                    </HeaderNavLink>
                    <HeaderNavLink href="/">
                        <span className={classes.buttonLike}>{t('PageHeader.addGame')}</span>
                    </HeaderNavLink>
                </div>
                <div className={classes.part}>
                    <input placeholder={t('PageHeader.search.placeholder')} className={classes.searchInput} />
                    <button type="button" className={`${classes.searchButton} ${classes.rightSpacer}`}>
                        <IconSearch />
                    </button>
                    <HeaderNavLink href="/">{t('PageHeader.signIn')}</HeaderNavLink>
                    <HeaderNavLink href="/">{t('PageHeader.signUp')}</HeaderNavLink>
                </div>
            </WidthFixer>
        </nav>
    )
}
