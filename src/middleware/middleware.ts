import Context from '@/lib/context'
import { NextFunction } from 'express'

export default async (ctx: Context, next: NextFunction) => {
    /**
     * Middleware logic goes here
     */
    next()
}
