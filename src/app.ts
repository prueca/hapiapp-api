import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import env from './lib/env'
import routes from './routes'
import onError from './handler/onError'

const app = new Hono()

app.use(
    cors({
        origin: env.APP_URL,
        credentials: true,
    }),
)

app.route('/api', routes)
app.onError(onError)

serve(
    {
        fetch: app.fetch,
        port: env.PORT,
    },
    (info) => {
        console.log(`App is running on http://localhost:${info.port}.`)
    },
)
