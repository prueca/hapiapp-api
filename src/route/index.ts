import { Hono } from 'hono'
import freezerType from '@/handler/freezerType'

const routes = new Hono()

// Freezer Type
routes.post('/freezer_types', freezerType.create)

export default routes
