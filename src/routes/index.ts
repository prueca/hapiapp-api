import { Hono } from 'hono'

import login from '../handler/user/login'
import authorize from '../handler/user/authorize'

const routes = new Hono()

routes.post('/login', login)
routes.post('/authorize', authorize)

export default routes
