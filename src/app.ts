import 'dotenv/config'
import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import onError from './handler/onError'
import routes from './route'

export const app = new Hono()

app.use(cors())
app.route('/api', routes)
app.onError(onError)

serve(app, (info) => {
    console.log(`App is running on http://localhost:${info.port}`)
})
