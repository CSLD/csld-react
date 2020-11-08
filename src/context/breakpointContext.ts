import React from 'react'
import { Breakpoint } from '../hooks/useBreakpoint'

/**
 * Context holding current breakpoint value
 */
export const breakpointContext = React.createContext<Breakpoint>('md')
