import { useLayoutEffect, useRef } from 'react'

/**
 * Since dialog shows by animation, inputs are not visible initially and so classic autoFocus attribute does not work.
 * This hook circumvents it by focusing some 100ms after component is rendered (you must place it to render in the same render form is shown).
 *
 * @param name Name of input element to focus
 *
 * @return Ref to place at some element around the form / desired input
 */
export const useFocusInput = <T extends Element>(name: string) => {
    const wrapperRef = useRef<T | null>(null)
    useLayoutEffect(() => {
        setTimeout(() => {
            if (wrapperRef.current) {
                const element = wrapperRef.current.getElementsByTagName('input').namedItem(name)
                if (element) {
                    element.focus()
                }
            }
        }, 100)
    }, [wrapperRef])

    return wrapperRef
}
