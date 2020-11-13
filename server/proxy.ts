require('dotenv').config()

const proxy: { [key: string]: {} } = {
    '/graphql': {
        target: process.env.API_URL,
        pathRewrite: { '^/graphql': '/CSLD-1.0.0/CSLD/graphql' },
        // pathRewrite: { '^/graphql': '/CSLD_war/CSLD/graphql' },
        changeOrigin: true,
    },
    '/user-icon': {
        target: process.env.USER_ICON_BASE,
        changeOrigin: true,
    },
}

export default proxy
