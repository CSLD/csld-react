const nextRoutes = require('next-routes')

const routes = (module.exports = nextRoutes())

routes.add('homepage', '/')
routes.add('/larp/:name/:lng/:id', 'gameDetail')

export default routes
