import { Hono } from 'hono'
import accountType from '@/handler/accountType'
import account from '@/handler/account'
import freezerType from '@/handler/freezerType'
import freezerStatusType from '@/handler/freezerStatusType'
import freezer from '@/handler/freezer'
import userRole from '@/handler/userRole'
import user from '@/handler/user'

const routes = new Hono()

// Freezer Type
routes.post('/freezer_types', freezerType.create)
routes.get('/freezer_types/:id', freezerType.getById)
routes.put('/freezer_types/:id', freezerType.update)
routes.delete('/freezer_types/:id', freezerType.delete)
routes.post('/freezer_types/search', freezerType.search)

// Freezer Status Type
routes.post('/freezer_status_types', freezerStatusType.create)
routes.get('/freezer_status_types/:id', freezerStatusType.getById)
routes.put('/freezer_status_types/:id', freezerStatusType.update)
routes.delete('/freezer_status_types/:id', freezerStatusType.delete)
routes.post('/freezer_status_types/search', freezerStatusType.search)

// Freezer
routes.post('/freezers', freezer.create)
routes.get('/freezers/:id', freezer.getById)
routes.put('/freezers/:id', freezer.update)
routes.delete('/freezers/:id', freezer.delete)
routes.post('/freezers/search', freezer.search)
routes.put('/freezers/bulk_update', freezer.bulkUpdate)
routes.delete('/freezers/bulk_delete', freezer.bulkDelete)

// Account
routes.post('/accounts', account.create)
routes.get('/accounts/:id', account.getById)
routes.get('/accounts', account.get)
routes.put('/accounts/:id', account.update)
routes.delete('/accounts/:id', account.delete)

// Account Type
routes.post('/account_types', accountType.create)
routes.get('/account_types/:id', accountType.getById)
routes.get('/account_types', accountType.get)
routes.put('/account_types/:id', accountType.update)
routes.delete('/account_types/:id', accountType.delete)

// User
routes.post('/users', user.create)
routes.get('/users/:id', user.getById)
routes.get('/users', user.get)
routes.put('/users/:id', user.update)
routes.delete('/users/:id', user.delete)

// User Role
routes.post('/user_roles', userRole.create)
routes.get('/user_roles/:id', userRole.getById)
routes.post('/user_roles/search', userRole.search)
routes.put('/user_roles/:id', userRole.update)
routes.delete('/user_roles/:id', userRole.delete)

export default routes
