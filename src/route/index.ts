import { Hono } from 'hono'
import freezerType from '@/handler/freezerType'

const routes = new Hono()

// Freezer Type
routes.post('/freezer_types', freezerType.create)
routes.get('/freezer_types/:id', freezerType.getById)
routes.post('/freezer_types/search', freezerType.search)

export default routes
