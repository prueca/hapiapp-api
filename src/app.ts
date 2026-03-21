import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import Context from '@/lib/context'
import routes from './route'
import cookieParser from 'cookie-parser'

const start = async () => {
    const app = express()
    const PORT = process.env.PORT || '8000'

    app.use(
        cors({
            origin: process.env.FRONTEND_URL,
            credentials: true,
        }),
    )

    app.use(cookieParser())
    app.use(express.json())
    app.use(Context.attach())
    app.use(routes)
    app.listen(PORT, () => console.log(`App running on port ${PORT}`))
}

start()
