import jwt from 'jsonwebtoken'
import type { SignOptions } from 'jsonwebtoken'
import assert from 'assert'

const generate = (payload: Record<string, any>) => {
    assert.ok(
        process.env.ACCESS_TOKEN_SECRET,
        'ACCESS_TOKEN_SECRET is not defined',
    )

    assert.ok(
        process.env.ACCESS_TOKEN_VALIDITY,
        'ACCESS_TOKEN_VALIDITY is not defined',
    )

    return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn:
            `${process.env.ACCESS_TOKEN_VALIDITY}d` as SignOptions['expiresIn'],
    })
}

const verify = (token: string) => {
    assert.ok(
        process.env.ACCESS_TOKEN_SECRET,
        'ACCESS_TOKEN_SECRET is not defined',
    )

    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
}

const decode = (token: string) => {
    return jwt.decode(token, { json: true })
}

export default {
    generate,
    verify,
    decode,
}
