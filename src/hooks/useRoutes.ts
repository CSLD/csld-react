import { useRouter } from 'next/router'
import { useMemo } from 'react'
import { UrlObject } from 'url'
import { Event, Game, LadderType } from '../graphql/__generated__/typescript-operations'

const stripName = (name: string | null | undefined) =>
    (name ?? '')
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, '-')
        .replace(/-+/g, '-')
        .replace(/-$/g, '')

const getGameRoute = ({ id, name }: Pick<Game, 'id' | 'name'>) => `/larp/${stripName(name)}/cs/${id}`

const getEventRoute = ({ id, name }: Pick<Event, 'id' | 'name'>) => `/event/${stripName(name)}/${id}`

export interface Route {
    readonly href: UrlObject
    readonly as: string
}

const profileRoute = (id: string): Route => ({ href: { pathname: '/profile', query: { id } }, as: `/profile/${id}` })

/**
 * Return object with functions returning HREF / AS for router + utility push() to router.push() those.
 */
export const useRoutes = () => {
    const router = useRouter()

    return useMemo(
        () => ({
            /**
             * Utility function to push
             *
             * @param route Route to go to
             *
             * @returns Promise from router.push() (can be awaited / thened)
             */
            push: (route: Route) => router.push(route.href, route.as),

            /**
             * Home page route
             */
            homepage: (): Route => ({ href: { pathname: '/homepage' }, as: '/' }),

            /**
             * Game detail (SEO) route
             *
             * @param id Game id
             * @param name Game name
             */
            gameDetail: (id: string, name: string | undefined | null): Route => ({
                href: { pathname: '/gameDetail', query: { id } },
                as: getGameRoute({ id, name: name ?? '' }),
            }),

            /**
             * Event detail (SEO) route
             *
             * @param id Event id
             * @param name Event name
             */
            eventDetail: (id: string, name: string): Route => ({
                href: { pathname: '/eventDetail', query: { id } },
                as: getEventRoute({ id, name }),
            }),

            /**
             * Detail of a group
             *
             * @param id Group id
             */
            groupDetail: (id: string): Route => ({
                href: { pathname: '/group', query: { id } },
                as: `/group/${id}`,
            }),

            /**
             * Route to games lists
             */
            games: (
                ladderType: LadderType = LadderType.RecentAndMostPlayed,
                initialRequiredLabelIds?: string[],
                initialOptionalLabelIds?: string[],
            ): Route => ({
                href: { pathname: '/games', query: { ladderType, initialRequiredLabelIds, initialOptionalLabelIds } },
                as: `/games/${ladderType[0].toLowerCase()}${ladderType.substr(1)}`,
            }),

            /**
             * Route to event list
             */
            calendar: (initialRequiredLabelIds?: string[], initialOptionalLabelIds?: string[]): Route => ({
                href: { pathname: '/calendar', query: { initialRequiredLabelIds, initialOptionalLabelIds } },
                as: '/calendar',
            }),

            /**
             * Currently logged in user profile detail
             */
            currentProfile: (): Route => profileRoute('current'),

            /**
             * Profile detail of given user
             *
             * @param id User id
             */
            userProfile: (id: string): Route => profileRoute(id),

            /**
             * User settings form
             */
            userSettings: (): Route => profileRoute('settings'),

            /**
             * Change password form
             */
            changePassword: (): Route => profileRoute('changePassword'),

            /**
             * Recover password - first step
             */
            recoverPasswordStart: (): Route => ({ href: { pathname: '/recoverPassword' }, as: '/recoverPassword' }),

            /**
             * Form to sign in
             */
            signIn: (): Route => ({ href: { pathname: '/signIn' }, as: '/signIn' }),

            /**
             * Form to sign up
             */
            signUp: (): Route => ({ href: { pathname: '/signUp' }, as: '/signUp' }),

            /**
             * Form to create a new game
             */
            gameCreate: (): Route => ({ href: { pathname: '/gameEdit' }, as: '/gameEdit' }),

            /**
             * Form to edit a game
             */
            gameEdit: (id: string): Route => ({
                href: { pathname: '/gameEdit', query: { id } },
                as: `/gameEdit/${id}`,
            }),

            /**
             * Form to create a new event
             */
            eventCreate: (): Route => ({ href: { pathname: '/eventEdit' }, as: '/eventEdit' }),

            /**
             * Form to edit an event
             */
            eventEdit: (id: string): Route => ({
                href: { pathname: '/eventEdit', query: { id } },
                as: `/eventEdit/${id}`,
            }),

            /**
             * Administration main page / menu
             */
            adminIntro: (): Route => ({ href: { pathname: '/admin' }, as: '/admin' }),

            /**
             * User administration
             */
            adminUsers: (): Route => ({ href: { pathname: '/admin/users' }, as: '/admin/users' }),

            /**
             * Label administration
             */
            adminLabels: (): Route => ({ href: { pathname: '/admin/labels' }, as: '/admin/labels' }),

            /**
             * Statistics in admin
             */
            adminStats: (): Route => ({ href: { pathname: '/admin/stats' }, as: '/admin/stats' }),

            /**
             * Self rating overview in admin
             */
            adminSelfRated: (): Route => ({ href: { pathname: '/admin/selfRated' }, as: '/admin/selfRated' }),
        }),
        [router],
    )
}
