/**
 * Get logged in user from graphql cache (relies on user being loaded by header)
 *
 * @returns Logged in user data, undefined when not logged in, Empty object when loading
 */
import { useContext } from 'react'
import { UserContext } from '../context/UserContext/UserContext'

export const useLoggedInUser = () => {
    const context = useContext(UserContext)
    return context ? context.value : {}
}
