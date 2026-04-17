import { Hono } from 'hono'
import freezerType from '@/handler/freezerType'

const routes = new Hono()

// Freezer Type
routes.post('/freezer_types', freezerType.create)
routes.get('/freezer_types/:id', freezerType.getById)
routes.post('/freezer_types/search', freezerType.search)
routes.put('/freezer_types/:id', freezerType.update)
routes.delete('/freezer_types/:id', freezerType.delete)

export default routes
