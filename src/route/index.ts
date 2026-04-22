import { Hono } from 'hono'
import accountType from '@/handler/accountType'
import freezerType from '@/handler/freezerType'
import userRole from '@/handler/userRole'
import user from '@/handler/user'

const routes = new Hono()

// Freezer Type
routes.post('/freezer_types', freezerType.create)
routes.get('/freezer_types/:id', freezerType.getById)
routes.post('/freezer_types/search', freezerType.search)
routes.put('/freezer_types/:id', freezerType.update)
routes.delete('/freezer_types/:id', freezerType.delete)

// User Role
routes.post('/user_roles', userRole.create)
routes.get('/user_roles/:id', userRole.getById)
routes.post('/user_roles/search', userRole.search)
routes.put('/user_roles/:id', userRole.update)
routes.delete('/user_roles/:id', userRole.delete)

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

export default routes
