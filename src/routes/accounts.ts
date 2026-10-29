import { Hono } from 'hono'
import accounts from '../handler/accounts'
import auth from '../middlewares/auth'

const routes = new Hono()

routes.post('/create', auth, accounts.create)
routes.post('/update', auth, accounts.update)

export default routes
