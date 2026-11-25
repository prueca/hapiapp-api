import { Hono } from 'hono'

import auth from './auth'
import accounts from './accounts'
import users from './users'

const routes = new Hono()

routes.route('/auth', auth)
routes.route('/accounts', accounts)
routes.route('/users', users)

export default routes
