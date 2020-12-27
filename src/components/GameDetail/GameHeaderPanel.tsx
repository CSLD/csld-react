import React from 'react'
import { createUseStyles } from 'react-jss'
import { Game, User, Group, Label } from 'src/graphql/__generated__/typescript-operations'
import { useTranslation } from 'react-i18next'
import { i18n as Ti18n, TFunction } from 'i18next'
import { darkTheme } from '../../theme/darkTheme'
import UserLink from '../common/UserLink/UserLink'
import GroupLink from '../common/GroupLink/GroupLink'
import DetailLabelList from '../common/DetailLabelList/DetailLabelList'

interface Props {
    readonly game: Pick<
        Game,
        | 'id'
        | 'name'
        | 'players'
        | 'menRole'
        | 'womenRole'
        | 'bothRole'
        | 'hours'
        | 'days'
        | 'year'
        | 'web'
        | 'galleryURL'
        | 'photoAuthor'
        | 'description'
    > & {
        labels: Array<Pick<Label, 'id' | 'name' | 'description'>>
        authors: Array<Pick<User, 'id' | 'name' | 'nickname'>>
        groupAuthor: Array<Pick<Group, 'id' | 'name'>>
    }
}

const useStyles = createUseStyles({
    header: {
        fontSize: '1.8rem',
        color: darkTheme.textGreen,
        margin: '5px 0 15px',
    },
    row: {
        display: 'flex',
        marginBottom: -10,
    },
    left: {
        margin: '0 20px 0 0',
        width: '33%',
    },
    right: {
        width: '66%',
    },
    fact: {
        margin: '0 0 10px',
        color: darkTheme.textLighter,
        fontSize: '0.75rem',
        lineHeight: '150%',
    },
    factLink: {
        wordBreak: 'break-all',
    },
    divider: {
        margin: '15px 0',
        borderBottom: `1px solid ${darkTheme.textOnLightDark}`,
    },
    description: {
        color: darkTheme.textLighter,
        fontSize: '0.75rem',
        lineHeight: '140%',
    },
    link: {
        color: darkTheme.textGreen,

        '&:hover': {
            color: darkTheme.text,
        },
    },
})

const buildFacts = (t: TFunction, i18n: Ti18n, facts: Array<{ count?: number | null; key: string }>) =>
    facts.reduce((str, fact) => {
        if (fact.count) {
            return `${str}${str.length > 0 ? ', ' : ''}${t(fact.key, {
                count: fact.count,
            })}`
        }

        return str
    }, '')

export const GameHeaderPanel = ({ game }: Props) => {
    const classes = useStyles()
    const { t, i18n } = useTranslation('common')

    const playersFacts = buildFacts(t, i18n, [
        {
            key: 'Game.players',
            count: game.players,
        },
        {
            key: 'Game.menRole',
            count: game.menRole,
        },
        {
            key: 'Game.womenRole',
            count: game.womenRole,
        },
        {
            key: 'Game.bothRole',
            count: game.bothRole,
        },
    ])

    const timeFacts = buildFacts(t, i18n, [
        {
            key: 'Game.hours',
            count: game.hours,
        },
        {
            key: 'Game.days',
            count: game.days,
        },
        {
            key: 'Game.year',
            count: game.year,
        },
    ])

    return (
        <div>
            <h1 className={classes.header}>{game.name}</h1>
            <div className={classes.row}>
                <div className={classes.left}>
                    <p className={classes.fact}>{playersFacts}</p>
                    <p className={classes.fact}>{timeFacts}</p>
                    {game.web && (
                        <p className={`${classes.fact} ${classes.factLink}`}>
                            {`${t('Game.web')} `}
                            <a href={game.web} className={classes.link} target="_blank" rel="noreferrer">
                                {game.web}
                            </a>
                        </p>
                    )}
                    {game.galleryURL && (
                        <p className={`${classes.fact} ${classes.factLink}`}>
                            {`${t('Game.gallery')} `}
                            <a href={game.galleryURL} className={classes.link} target="_blank" rel="noreferrer">
                                {game.galleryURL}
                            </a>
                        </p>
                    )}
                    {game.photoAuthor && (
                        <p className={classes.fact}>
                            {`${t('Game.photoAuthor')} `}
                            {game.photoAuthor}
                        </p>
                    )}
                </div>
                <div className={classes.right}>
                    <p className={classes.fact}>
                        {t('Game.authors')}
                        &nbsp;
                        {game.authors.map((author, n) => (
                            <React.Fragment key={author.id}>
                                {n > 0 && ', '}
                                <UserLink userId={author.id} className={classes.link}>
                                    {author.nickname}
                                    {author.nickname && author.name ? ' ' : ''}
                                    {author.name}
                                </UserLink>
                            </React.Fragment>
                        ))}
                    </p>
                    <p className={classes.fact}>
                        {t('Game.groups')}
                        &nbsp;
                        {game.groupAuthor.length === 0 && <span>&mdash;</span>}
                        {game.groupAuthor.length > 0 &&
                            game.groupAuthor.map((group, n) => (
                                <React.Fragment key={group.id}>
                                    {n > 0 && ', '}
                                    <GroupLink groupId={group.id} className={classes.link}>
                                        {group.name}
                                    </GroupLink>
                                </React.Fragment>
                            ))}
                    </p>
                </div>
            </div>
            <div className={classes.divider} />
            {/* eslint-disable-next-line react/no-danger */}
            <p className={classes.description} dangerouslySetInnerHTML={{ __html: game.description ?? '' }} />
            <div className={classes.divider} />
            <DetailLabelList labels={game.labels} linkType="games" />
        </div>
    )
}
