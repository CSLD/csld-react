const withPlugins = require('next-compose-plugins')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
    enabled: ['client', 'server', 'both'].includes(process.env.BUNDLE_ANALYZE),
})
const nextRuntimeDotenv = require('next-runtime-dotenv')
const graphql = require('next-plugin-graphql')

const withConfig = nextRuntimeDotenv({ public: ['API_URL', 'API_KEY'] })

const nextConfig = {
    analyzeServer: ['server', 'both'].includes(process.env.BUNDLE_ANALYZE),
    analyzeBrowser: ['browser', 'both'].includes(process.env.BUNDLE_ANALYZE),
    bundleAnalyzerConfig: {
        server: {
            analyzerMode: 'static',
            reportFilename: '../bundles/server.html',
        },
        browser: {
            analyzerMode: 'static',
            reportFilename: '../bundles/client.html',
        },
    },
    publicRuntimeConfig: {
        PROXY_MODE: process.env.PROXY_MODE,
        API_URL: process.env.API_URL,
        API_KEY: process.env.API_KEY,
        STATIC_PATH: process.env.STATIC_PATH,
        SELF_URL: process.env.SELF_URL,
    },
}

module.exports = withConfig(withPlugins([withBundleAnalyzer, graphql], nextConfig))
