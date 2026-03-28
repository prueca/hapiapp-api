import { Router } from 'express'
import Context from '@/lib/context'
import ping from '@/handler/ping'
import userGetAll from '@/handler/user/userGetAll.handler'
import middleware from '@/middleware/middleware'

const router = Router()

router.get('/ping', Context.middleware(middleware), Context.handler(ping))

// api: users
router.get('/users', Context.handler(userGetAll))

export default router
