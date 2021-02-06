import { IncomingMessage } from 'http'

export const getBaseUrl = (req: IncomingMessage | undefined) => {
    const host = req?.headers.host

    if (!host) {
        return ''
    }

    return `${host.startsWith('localhost') ? 'http://' : 'https://'}${host}`
}
