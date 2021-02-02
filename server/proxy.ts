require('dotenv').config()

// Change cookie path to /graphql
const transformCookiePath = (cookie: string) => {
    if (cookie.startsWith('JSESSIONID') || cookie.startsWith('LoggedIn')) {
        const parts = cookie.split(';')
        const newParts = parts.map(part => {
            const iEq = part.indexOf('=')
            if (iEq < 0) {
                // No '='
                return part
            }
            let iStart = 0
            while (part[iStart] === ' ') {
                iStart += 1
            }
            if (part.substring(iStart, iEq).toLowerCase() === 'path') {
                // Use / path
                return ' Path=/'
            }

            // Not our cookie
            return part
        })
        return newParts.join(';')
    }

    return cookie
}

/**
 * We must rewrite JSESSION cookie path so that browser sends them in subsequent requests
 */
const onProxyRes = (proxyRes: any) => {
    const setCookie = proxyRes.headers['set-cookie']
    if (setCookie) {
        if (Array.isArray(setCookie)) {
            // eslint-disable-next-line no-param-reassign
            proxyRes.headers['set-cookie'] = setCookie.map(cookie => transformCookiePath(cookie))
        } else {
            // Just a string
            // eslint-disable-next-line no-param-reassign
            proxyRes.headers['set-cookie'] = transformCookiePath(setCookie)
        }
    }
}

const proxy: { [key: string]: {} } = {
    '/graphql': {
        target: process.env.API_URL,
        pathRewrite: { '^/graphql': process.env.API_PATH },
        changeOrigin: true,
        onProxyRes,
    },
    '/user-icon': {
        target: process.env.API_URL,
        pathRewrite: { '^/user-icon': process.env.USER_ICON_PATH },
        changeOrigin: true,
    },
    '/game-image': {
        target: process.env.API_URL,
        pathRewrite: { '^/game-image': process.env.GAME_IMAGE_PATH },
        changeOrigin: true,
    },
    '/ical': {
        target: process.env.API_URL,
        pathRewrite: { '^/ical': process.env.GAME_IMAGE_PATH },
        changeOrigin: true,
    },
}

export default proxy
