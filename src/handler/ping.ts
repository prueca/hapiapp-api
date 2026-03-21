import Context from '@/lib/context'
import Exception from '@/lib/exception'
import * as db from '@/lib/db'

export default async (ctx: Context) => {
    /**
     * This is how to get either query param, route param or from request body.
     */

    const { role, username, email, password } = ctx.params

    /**
     * CRUD with User model
     */

    await db.User.create({
        role,
        username,
        email,
        password,
    })

    /**
     * To access Request object
     */

    ctx.req

    /**
     * To access Response object
     */

    ctx.res

    /**
     * To access, set or remove request header
     */

    ctx.headers['key'] // same as ctx.headers.key
    ctx.setHeaders({ headerName: '' })
    ctx.removeHeaders(['key', 'key'])

    /**
     * This is how to throw an error in case needed.
     */

    const hasError = false

    if (hasError) {
        throw new Exception('UNAUTHORIZED', 'Refresh token is required')
    }

    /**
     * To return a json with a different status code,
     * use ctx.send()
     */

    ctx.send({ message: 'pong' }, 404)

    /**
     * When executed, the returned object will be the JSON response.
     * This defaults to 200 http status code
     */

    return { message: 'pong' }
}
