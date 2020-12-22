const nextRoutes = require('next-routes')

const routes = (module.exports = nextRoutes())

routes.add('homepage', '/')
routes.add('/larp/:name/:lng/:id', 'gameDetail')
routes.add('/profile/:id', 'profile')
routes.add('/group/:id', 'groupDetail')
routes.add('/recoverPassword/:token', 'recoverPassword')

export default routes
