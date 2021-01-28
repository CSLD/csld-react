import { Styles } from 'react-jss'
import { darkTheme } from '../theme/darkTheme'
import { breakPoints } from '../theme/breakPoints'

export const formSectionHeaderStyles: Styles<'header'> = {
    header: {
        backgroundColor: darkTheme.backgroundRealWhite,
        fontSize: '1.25rem',
        color: darkTheme.textOnLight,
        borderBottom: '1px solid rgba(0,0,0,.1)',
        padding: '8px 8px 8px 18px',
        margin: '0 0 12px -18px',
    },
}

/**
 * Common classes to be used in game / event edit form
 */
export const formClasses: Styles<string> = {
    row: {
        backgroundColor: darkTheme.backgroundNearWhite,
        padding: '16px 0',
    },
    form: {
        backgroundColor: darkTheme.backgroundWhite,
        color: darkTheme.textOnLight,
        padding: '0 15px',
    },
    helpText: {
        fontSize: '0.75rem',
    },
    ...formSectionHeaderStyles,
    headerRight: {
        margin: '0 0 12px -18px',
    },
    [`@media(min-width: ${breakPoints.md}px)`]: {
        headerRight: {
            margin: '0 -18px 12px -18px',
        },
    },
    subHeader: {
        color: darkTheme.textOnLight,
        borderBottom: '1px solid rgba(0,0,0,.1)',
        marginBottom: 20,
    },
    formError: {
        marginLeft: 16,
        color: darkTheme.red,
    },
    cancelButton: {
        marginRight: 16,
    },
    labelsCol: {},
    [`@media(max-width: ${breakPoints.md - 1}px)`]: {
        labelsCol: {
            marginTop: 16,
            marginBottom: 16,
        },
    },
}
