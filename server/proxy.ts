require('dotenv').config()

const devProxy: { [key: string]: {} } = {
    '/graphql': {
        target: process.env.API_URL,
        pathRewrite: { '^/graphql': '/CSLD_war/CSLD/graphql' },
        changeOrigin: true,
    },
}

export default devProxy
