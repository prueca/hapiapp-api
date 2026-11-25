import { Hono } from 'hono'
import auth from '../handler/auth'

const routes = new Hono()

routes.post('/login', auth.login)
routes.post('/authorize', auth.authorize)

export default routes
