import React, { useMemo, useState } from 'react'
import { Toast } from 'react-bootstrap'
import { createUseStyles } from 'react-jss'
import classNames from 'classnames'
import { ToastContextShape, ToastContext, ToastKind } from './ToastContext'
import { darkTheme } from '../../theme/darkTheme'

const HIDE_DELAY = 3000

interface State {
    readonly content?: React.ReactNode
    readonly kind?: ToastKind
}

const useStyles = createUseStyles({
    toast: {
        position: 'fixed',
        left: '50vw',
        transform: 'translateX(-50%)',
        bottom: 32,
        opacity: 0.8,
        fontSize: '0.75rem',
        border: `1px solid ${darkTheme.textOnLightDark}`,
    },
    success: {
        backgroundColor: darkTheme.textGreen,
        color: darkTheme.textOnLightDark,
    },
    error: {
        backgroundColor: darkTheme.red,
        color: darkTheme.textLight,
    },
})

const ToastContextProvider: React.FC = ({ children }) => {
    const [value, setValue] = useState<State>({})
    const [toastShown, setToastShown] = useState(false)
    const classes = useStyles()

    const providerValue: ToastContextShape = useMemo(
        () => ({
            actions: {
                showToast: (content, kind = 'normal') => {
                    setValue({ content, kind })
                    setToastShown(true)
                },
            },
        }),
        [setValue, setToastShown],
    )

    const className = classNames(classes.toast, {
        [classes.success]: value.kind === 'success',
        [classes.error]: value.kind === 'alert',
    })

    return (
        <ToastContext.Provider value={providerValue}>
            {children}
            <Toast
                className={className}
                onClose={() => setToastShown(false)}
                show={toastShown}
                animation
                delay={HIDE_DELAY}
                autohide
            >
                <Toast.Body>{value.content}</Toast.Body>
            </Toast>
        </ToastContext.Provider>
    )
}

export default ToastContextProvider
