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

import accountTypeGetAllHandler from '@/handler/accountType/accountTypeGetAll.handler'
import accountTypeGetByIdHandler from '@/handler/accountType/accountTypeGetById.handler'
import accountTypeCreateHandler from '@/handler/accountType/accountTypeCreate.handler'
import accountTypeUpdateHandler from '@/handler/accountType/accountTypeUpdate.handler'
import accountTypeDeleteHandler from '@/handler/accountType/accountTypeDelete.handler'

import freezerModelCreate from '@/handler/freezerModel/freezer.model.create'
import freezerModelGetById from '@/handler/freezerModel/freezer.model.getById'
import freezerModelUpdate from '@/handler/freezerModel/freezer.model.update'

import middleware from '@/middleware/middleware'

const router = Router()

router.get('/ping', Context.middleware(middleware), Context.handler(ping))

// api: users
router.get('/api/users', Context.handler(userGetAll))
router.get('/api/users/:id', Context.handler(userGetById))
router.post('/api/users', Context.handler(userCreate))
router.put('/api/users/:id', Context.handler(userUpdate))
router.delete('/api/users/:id', Context.handler(userDelete))

// api: user_roles
router.get('/api/user_role', Context.handler(userRoleGetAllHandler))
router.get('/api/use_role/:id', Context.handler(userRoleGetByIdHandler))
router.post('/api/user_role', Context.handler(userRoleCreateHandler))
router.put('/api/user_role/:id', Context.handler(userRoleUpdateHandler))
router.delete('/api/use_role/:id', Context.handler(userRoleDeleteHandler))

// api: account_types
router.get('/api/account_types', Context.handler(accountTypeGetAllHandler))
router.get('/api/account_types/:id', Context.handler(accountTypeGetByIdHandler))
router.post('/api/account_types', Context.handler(accountTypeCreateHandler))
router.put('/api/account_types/:id', Context.handler(accountTypeUpdateHandler))
router.delete(
    '/api/account_types/:id',
    Context.handler(accountTypeDeleteHandler),
)

// api: freezer_models
router.post('/api/freezer_models', Context.handler(freezerModelCreate))
router.get('/api/freezer_models/:id', Context.handler(freezerModelGetById))
router.put('/api/freezer_models/:id', Context.handler(freezerModelUpdate))

export default router
