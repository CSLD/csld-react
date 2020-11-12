import { zonedTimeToUtc } from 'date-fns-tz'
import { format } from 'date-fns'

export const parseDateTime = (isoString?: string | null) => {
    if (!isoString) {
        return undefined
    }

    return zonedTimeToUtc(isoString, 'Europe/Prague')
}

export const hasTimePart = (date?: Date) => date && (date.getHours() !== 0 || date.getMinutes() !== 0)

export const formatTimeRange = (from?: string | null, to?: string | null) => {
    const fromDate = parseDateTime(from)
    const toDate = parseDateTime(to)
    const justDates = !hasTimePart(fromDate) && !hasTimePart(toDate)
    const fromFormatted = fromDate && format(fromDate, justDates ? 'd.M.yyy' : 'd.M.yyy HH:mm')
    const toFormatted = toDate && format(toDate, justDates ? 'd.M.yyy' : 'd.M.yyy HH:mm')
    const justOneDate = fromFormatted === toFormatted

    return { justOneDate, fromFormatted, toFormatted }
}
