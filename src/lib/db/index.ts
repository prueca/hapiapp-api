import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

import env from '../env'

const pool = new Pool({
    connectionString: env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
})

const db = drizzle({ client: pool })

const authenticate = async () => {
    try {
        await db.execute('SELECT 1')
        console.log('Database connection established.')
    } catch (e: any) {
        console.log(`Error connecting to database: ${e.message}`)
        console.log(e.stack)
    }
}

authenticate()

export default db
