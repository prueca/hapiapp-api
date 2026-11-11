import { Context, Next } from 'hono'
import Boom from '@hapi/boom'

export default (...allowedRoles: string[]) =>
    async (c: Context, next: Next) => {
        const authUser = c.get('user')

        if (!authUser) {
            throw Boom.unauthorized('Authenticated user not found in context.')
        }

        if (!allowedRoles.includes(authUser.role)) {
            throw Boom.forbidden(
                'User does not have permission to perform this action.',
            )
        }

        await next()
    }
