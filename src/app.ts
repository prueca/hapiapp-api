import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'

import routes from './routes'
import onError from './handler/onError'

const app = new Hono()

app.use(
    cors({
        origin: process.env.APP_URL,
        credentials: true,
    }),
)

app.route('/api', routes)
app.onError(onError)

serve(
    {
        fetch: app.fetch,
        port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
    },
    (info) => {
        console.log(`App is running on http://localhost:${info.port}`)
    },
)
