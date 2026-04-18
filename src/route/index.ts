import { Hono } from 'hono'
import freezerType from '@/handler/freezerType'
import userRole from '@/handler/userRole'

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

export default routes
