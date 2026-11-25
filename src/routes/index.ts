import { Hono } from 'hono'

import auth from './auth'
import accounts from './accounts'

const routes = new Hono()

routes.route('/auth', auth)
routes.route('/accounts', accounts)

export default routes
