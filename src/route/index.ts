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

import freezerTypeCreate from '@/handler/freezerType/freezer.type.create'
import freezerTypeGetById from '@/handler/freezerType/freezer.type.getById'
import freezerTypeList from '@/handler/freezerType/freezer.type.list'
import freezerTypeUpdate from '@/handler/freezerType/freezer.type.update'
import freezerTypeDelete from '@/handler/freezerType/freezer.type.delete'

import freezerStatusNameCreate from '@/handler/freezerStatusName/freezer.status.name.create'
import freezerStatusNameGetById from '@/handler/freezerStatusName/freezer.status.name.getById'
import freezerStatusNameList from '@/handler/freezerStatusName/freezer.status.name.list'
import freezerStatusNameUpdate from '@/handler/freezerStatusName/freezer.status.name.update'
import freezerStatusNameDelete from '@/handler/freezerStatusName/freezer.status.name.delete'

import freezerCreate from '@/handler/freezer/freezer.create'
import freezerGetById from '@/handler/freezer/freezer.getById'
import freezerUpdate from '@/handler/freezer/freezer.update'
import freezerBulkUpdate from '@/handler/freezer/freezer.update.bulk'
import freezerList from '@/handler/freezer/freezer.list'

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

// api: freezer_types
router.post('/api/freezer_types', Context.handler(freezerTypeCreate))
router.get('/api/freezer_types/:id', Context.handler(freezerTypeGetById))
router.get('/api/freezer_types/', Context.handler(freezerTypeList))
router.put('/api/freezer_types/:id', Context.handler(freezerTypeUpdate))
router.delete('/api/freezer_types/:id', Context.handler(freezerTypeDelete))

// api: freezer_status_name
router.post(
    '/api/freezer_status_name',
    Context.handler(freezerStatusNameCreate),
)
router.get(
    '/api/freezer_status_name/:id',
    Context.handler(freezerStatusNameGetById),
)
router.get('/api/freezer_status_name', Context.handler(freezerStatusNameList))
router.put(
    '/api/freezer_status_name/:id',
    Context.handler(freezerStatusNameUpdate),
)
router.delete(
    '/api/freezer_status_name/:id',
    Context.handler(freezerStatusNameDelete),
)

// api: freezer
router.post('/api/freezer', Context.handler(freezerCreate))
router.get('/api/freezer/:id', Context.handler(freezerGetById))
router.get('/api/freezer', Context.handler(freezerList))
router.put('/api/freezer/:id', Context.handler(freezerUpdate))
router.put('/api/freezer', Context.handler(freezerBulkUpdate))

export default router
