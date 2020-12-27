import React from 'react'

export type ToastKind = 'normal' | 'success' | 'alert'

export interface ToastContextShape {
    readonly actions: {
        showToast: (content: React.ReactNode, kind?: ToastKind) => void
    }
}

export const defaultToastContextValue = { value: {}, actions: { showToast: () => {} } }

export const ToastContext = React.createContext<ToastContextShape>(defaultToastContextValue)
