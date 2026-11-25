import { Hono } from 'hono'
import users from '../handler/users'
import auth from '../middlewares/auth'
import allow from '../middlewares/allow'
import userRoles from '@/lib/user.roles'

const routes = new Hono()

routes.post('/create', auth, allow(userRoles.DISTRIBUTOR_ADMIN), users.create)

export default routes
