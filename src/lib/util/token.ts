import jwt from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'

const generate = (payload: Record<string, any>) => {
    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
        expiresIn: process.env
            .ACCESS_TOKEN_VALIDITY as SignOptions['expiresIn'],
    })
}

const verify = (token: string) => {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!)
}

const decode = (token: string) => {
    return jwt.decode(token, { json: true })
}

export default {
    generate,
    verify,
    decode,
}
