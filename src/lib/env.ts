import 'dotenv/config'
import { z } from 'zod'

const schema = z.object({
    NODE_ENV: z
        .enum(['development', 'test', 'production'])
        .default('development'),

    PORT: z.coerce.number().int().positive().default(3000),

    APP_URL: z.string(),
    DATABASE_URL: z.string(),

    AUTHORIZATION_TOKEN_SECRET: z.string(),
    AUTHORIZATION_TOKEN_VALIDITY: z.string(),
    AUTHORIZATION_TOKEN_COOKIE: z.string(),

    ACCESS_TOKEN_COOKIE: z.string(),
    ACCESS_TOKEN_SECRET: z.string(),
    ACCESS_TOKEN_VALIDITY: z.string(),
})

const env = schema.parse(process.env)

export default env
