import { darkTheme } from '../theme/darkTheme'

export const formSectionHeader = {
    backgroundColor: darkTheme.backgroundRealWhite,
    fontSize: '1.25rem',
    color: darkTheme.textOnLight,
    borderBottom: '1px solid rgba(0,0,0,.1)',
    margin: '0 0 12px -18px',
    padding: '8px 8px 8px 18px',
}

export const formSectionHeaderRight = {
    ...formSectionHeader,
    margin: '0 -18px 12px -18px',
}

/**
 * Common classes to be used in game / event edit form
 */
export const formClasses = {
    row: {
        backgroundColor: darkTheme.backgroundNearWhite,
        padding: '16px 0',
    },
    body: {
        backgroundColor: darkTheme.backgroundWhite,
    },
    form: {
        color: darkTheme.textOnLight,
    },
    helpText: {
        fontSize: '0.75rem',
    },
    header: formSectionHeader,
    headerRight: {
        margin: '0 -18px 12px -18px',
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
}
