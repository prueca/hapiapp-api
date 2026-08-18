import type { Context } from 'hono'
import { setCookie } from 'hono/cookie'
import { StatusCodes } from 'http-status-codes'
import moment from 'moment'

const clearCookie = (c: Context, name: string) => {
    setCookie(c, name, '', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
        expires: moment().subtract(1, 'day').toDate(),
     })
}

export default async (c: Context) => {
    clearCookie(c, 'auth-token')
    clearCookie(c, 'access-token')

    return c.json({ success: true }, StatusCodes.OK)
}
