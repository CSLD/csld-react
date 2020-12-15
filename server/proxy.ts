require('dotenv').config()

const transformCookiePath = (cookie: string) => {
    if (cookie.startsWith('JSESSIONID')) {
        const parts = cookie.split(';')
        return `${parts[0]}; Path=/graphql;${parts[2]}`
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
        target: process.env.USER_ICON_BASE,
        changeOrigin: true,
    },
}

export default proxy
