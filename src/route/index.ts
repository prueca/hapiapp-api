import { Router } from 'express'
import Context from '@/lib/context'
import ping from '@/handler/ping'
import middleware from '@/middleware/middleware'

const router = Router()

router.get('/ping', Context.middleware(middleware), Context.handler(ping))

export default router
