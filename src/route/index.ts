import { Router } from 'express'
import Context from '@/lib/context'
import ping from '@/handler/ping'
import userCreate from '@/handler/user/userCreate.handler'
import userGetAll from '@/handler/user/userGetAll.handler'
import userGetById from '@/handler/user/userGetById.handler'
import userUpdate from '@/handler/user/userUpdate.handler'
import userDelete from '@/handler/user/userDelete.handler'

import userRoleGetAllHandler from '@/handler/userRole/userRoleGetAll.handler'
import userRoleGetByIdHandler from '@/handler/userRole/userRoleGetById.handler'
import userRoleCreateHandler from '@/handler/userRole/userRoleCreate.handler'
import userRoleUpdateHandler from '@/handler/userRole/userRoleUpdate.handler'
import userRoleDeleteHandler from '@/handler/userRole/userRoleDelete.handler'

import middleware from '@/middleware/middleware'

const router = Router()

router.get('/ping', Context.middleware(middleware), Context.handler(ping))

// api: users
router.get('/api/users', Context.handler(userGetAll))
router.get('/api/users/:id', Context.handler(userGetById))
router.post('/api/users/:id', Context.handler(userCreate))
router.put('/api/users/:id', Context.handler(userUpdate))
router.delete('/api/users/:id', Context.handler(userDelete))

// api: user_roles
router.get('/api/user_role', Context.handler(userRoleGetAllHandler))
router.get('/api/use_role/:id', Context.handler(userRoleGetByIdHandler))
router.post('/api/user_role/:id', Context.handler(userRoleCreateHandler))
router.put('/api/user_role/:id', Context.handler(userRoleUpdateHandler))
router.delete('/api/use_role/:id', Context.handler(userRoleDeleteHandler))

export default router
