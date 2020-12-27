import React from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import Link from 'next/link'
import { HeaderNavLink } from './HeaderNavLink'
import { darkTheme } from '../../../theme/darkTheme'
import { WidthFixer } from '../WidthFixer/WidthFixer'
import { HeaderSearchForm } from './HeaderSearchForm'
import HeaderUser from './HeaderUser'
import { useRoutes } from '../../../hooks/useRoutes'

const useStyles = createUseStyles({
    placeholder: {
        height: 55,
    },
    container: {
        backgroundColor: darkTheme.backgroundLight,
        borderBottom: '1px solid black',
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
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
})

export const PageHeader = () => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const routes = useRoutes()

    return (
        <>
            <nav className={classes.container}>
                <WidthFixer className={classes.innerContainer}>
                    <div className={classes.part}>
                        <Link href={{ pathname: '/homepage' }} as="/">
                            {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                            <a className={classes.rightSpacer}>
                                <img
                                    src="/images/ld-logo-ver-091EA8500E0CBCBECE1FACC3A785855B.png"
                                    height="25"
                                    alt={t('PageHeader.csld')}
                                />
                            </a>
                        </Link>
                        <HeaderNavLink route={routes.games()}>{t('PageHeader.games')}</HeaderNavLink>
                        <HeaderNavLink route={routes.calendar()}>{t('PageHeader.calendar')}</HeaderNavLink>
                        <HeaderNavLink route="https://larpy.cz" target="_blank">
                            {t('PageHeader.blog')}
                        </HeaderNavLink>
                        <HeaderNavLink route={routes.eventCreate()}>
                            <span className={classes.buttonLike}>{t('PageHeader.addEvent')}</span>
                        </HeaderNavLink>
                        <HeaderNavLink route={routes.gameCreate()}>
                            <span className={classes.buttonLike}>{t('PageHeader.addGame')}</span>
                        </HeaderNavLink>
                    </div>
                    <div className={classes.part}>
                        <HeaderSearchForm />
                        <HeaderUser />
                    </div>
                </WidthFixer>
            </nav>
            <div className={classes.placeholder} />
        </>
    )
}
