import React, { ChangeEvent, useRef, useState } from 'react'
import { createUseStyles } from 'react-jss'
import { useTranslation } from 'react-i18next'
import { useQuery } from '@apollo/client'
import classNames from 'classnames'
import { darkTheme } from '../../../theme/darkTheme'
import { IconLoading, IconSearch } from '../Icons/Icons'
import {
    BaseGameDataFragment,
    SearchGamesQuery,
    SearchGamesQueryVariables,
} from '../../../graphql/__generated__/typescript-operations'
import { GameBaseDataPanel } from '../GameBaseDataPanel/GameBaseDataPanel'

export const searchInputId = 'headerSearchInput'

const searchGamesQuery = require('./graphql/searchGamesQuery.graphql')

const useStyles = createUseStyles({
    wrapper: {
        display: 'flex',
        position: 'relative',
        transition: 'border-color ease-in-out .15s, box-shadow ease-in-out .15s',
        '&:focus-within': {
            borderColor: '#66afe9',
            outline: 0,
            boxShadow: 'inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6)',
        },
        marginRight: 15,
    },
    searchInput: {
        backgroundColor: darkTheme.backgroundControl,
        color: darkTheme.textLight,
        border: 'none',
        padding: '5px 24px 5px 8px',
        borderTopLeftRadius: 4,
        borderBottomLeftRadius: 4,
        width: 150,
        outline: 0,
        fontSize: '0.69rem',
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
        outline: 0,
    },
    results: {
        position: 'absolute',
        left: 0,
        width: 250,
        top: 28,
        zIndex: 1001,
        padding: 7,
        background: darkTheme.backgroundControl,
        border: `1px solid ${darkTheme.textOnLightDark}`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
    },
    resultsText: {
        padding: '10px 5px',
        alignSelf: 'center',
        color: darkTheme.text,
        fontSize: '0.75rem',
    },
    iconLoading: {
        fontSize: '1.25rem',
    },
    gameSpacer: {
        marginTop: 7,
    },
    gameLoading: {
        opacity: 0.8,
    },
})

const MAX_RESULTS = 5
const MIN_SEARCH_LENGTH = 3
const BLUR_TIMEOUT = 500
const CHANGE_TIMEOUT = 500

export const HeaderSearchForm = () => {
    const classes = useStyles()
    const { t } = useTranslation('common')
    const [query, setQuery] = useState('')
    const [focused, setFocused] = useState(false)
    const hideTimeoutRef = useRef(0)
    const changeTimeoutRef = useRef(0)
    const inputRef = useRef<HTMLInputElement | null>(null)
    const lastGames = useRef<BaseGameDataFragment[]>([])
    const searchActive = query.length >= 3
    const searchResult = useQuery<SearchGamesQuery, SearchGamesQueryVariables>(searchGamesQuery, {
        variables: {
            query,
            limit: MAX_RESULTS,
        },
        skip: !searchActive,
    })

    const games = searchResult.data?.games.byQuery || lastGames.current
    lastGames.current = games
    const haveGames = games && games.length > 0
    const loadingWithData = haveGames && searchResult.loading

    const handleFocus = () => {
        // When we were within hiding timeout, cancel it
        if (hideTimeoutRef.current) {
            window.clearTimeout(hideTimeoutRef.current)
        }
        hideTimeoutRef.current = 0
        inputRef.current?.focus() // Re-focus because we are called on menu focus too
        setFocused(true)
    }

    const handleBlur = () => {
        if (hideTimeoutRef.current) {
            window.clearTimeout(hideTimeoutRef.current)
        }
        hideTimeoutRef.current = window.setTimeout(() => setFocused(false), BLUR_TIMEOUT)
    }

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (changeTimeoutRef.current) {
            window.clearTimeout(changeTimeoutRef.current)
        }
        const newValue = event.target.value
        if (query.length < MIN_SEARCH_LENGTH && newValue.length >= MIN_SEARCH_LENGTH) {
            // Just went over limit - start searching right away
            setQuery(event.target.value)
            changeTimeoutRef.current = 0
        } else {
            // Set after a while to rate limit search queries
            changeTimeoutRef.current = window.setTimeout(() => setQuery(newValue), CHANGE_TIMEOUT)
        }
    }

    return (
        <div className={classes.wrapper}>
            <input
                id={searchInputId}
                placeholder={t('PageHeader.search.placeholder')}
                className={classes.searchInput}
                onChange={handleChange}
                onFocus={handleFocus}
                onBlur={handleBlur}
                ref={inputRef}
            />
            <button type="button" className={classes.searchButton}>
                <IconSearch />
            </button>
            {searchActive && focused && (
                <div className={classes.results} onFocus={handleFocus}>
                    {!haveGames && (
                        <div className={classes.resultsText}>
                            {searchResult.loading ? (
                                <IconLoading className={classes.iconLoading} />
                            ) : (
                                t('GameDetail.noSearchResults')
                            )}
                        </div>
                    )}
                    {haveGames &&
                        games?.map((game, n) => {
                            const gameClasses = classNames({
                                [classes.gameSpacer]: n > 0,
                                [classes.gameLoading]: loadingWithData,
                            })
                            return (
                                <GameBaseDataPanel key={game.id} game={game} className={gameClasses} variant="dark" />
                            )
                        })}
                </div>
            )}
        </div>
    )
}
