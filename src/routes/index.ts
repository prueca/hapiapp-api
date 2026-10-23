import { Hono } from 'hono'

import userLogin from '../handler/user/login'

const routes = new Hono()

routes.post('/login', userLogin)

export default routes
