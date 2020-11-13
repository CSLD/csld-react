require('dotenv').config()

const proxy: { [key: string]: {} } = {
    '/graphql': {
        target: process.env.API_URL,
        // pathRewrite: { '^/graphql': '/CSLD-1.0.0/CSLD/graphql' },
        pathRewrite: { '^/graphql': process.env.API_PATH },
        changeOrigin: true,
    },
    '/user-icon': {
        target: process.env.USER_ICON_BASE,
        changeOrigin: true,
    },
}

export default proxy
