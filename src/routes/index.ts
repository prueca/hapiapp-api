import { Hono } from 'hono'

import login from '../handler/user/login'
import authorize from '../handler/user/authorize'
import accounts from './accounts'

const routes = new Hono()

routes.post('/login', login)
routes.post('/authorize', authorize)
routes.route('/accounts', accounts)

export default routes
