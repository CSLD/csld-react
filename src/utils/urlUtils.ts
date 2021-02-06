export const baseUrl = () => {
    if (process.env.SELF_URL) {
        return process.env.SELF_URL
    }

    return `${window.location.protocol}//${window.location.hostname}${
        window.location.port ? `:${window.location.port}` : ''
    }`
}
