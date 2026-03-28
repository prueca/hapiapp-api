import { Router } from 'express'
import Context from '@/lib/context'
import ping from '@/handler/ping'
import userCreate from '@/handler/user/userCreate.handler'
import userGetAll from '@/handler/user/userGetAll.handler'
import userGetById from '@/handler/user/userGetById.handler'

import middleware from '@/middleware/middleware'

const router = Router()

router.get('/ping', Context.middleware(middleware), Context.handler(ping))

// api: users
router.get('/api/users', Context.handler(userGetAll))
router.get('/api/users/:id', Context.handler(userGetById))
router.post('/api/users', Context.handler(userCreate))

export default router
