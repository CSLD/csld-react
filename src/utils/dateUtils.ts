import { zonedTimeToUtc } from 'date-fns-tz'

export const parseDateTime = (isoString?: string | null) => {
    if (!isoString) {
        return undefined
    }

    return zonedTimeToUtc(isoString, 'Europe/Prague')
}

export const hasTimePart = (date?: Date) => date && (date.getHours() !== 0 || date.getMinutes() !== 0)
