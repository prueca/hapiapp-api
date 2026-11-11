import { Hono } from 'hono'
import accounts from '../handler/accounts'
import auth from '../middlewares/auth'
import allow from '../middlewares/allow'
import userRoles from '@/lib/user.roles'

const routes = new Hono()

routes.post(
    '/create',
    auth,
    allow(userRoles.DISTRIBUTOR_ADMIN),
    accounts.create,
)

routes.post(
    '/update',
    auth,
    allow(userRoles.DISTRIBUTOR_ADMIN),
    accounts.update,
)

export default routes
