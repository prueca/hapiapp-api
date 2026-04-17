import { Hono } from 'hono'
import freezerType from '@/handler/freezerType'

const main = new Hono()

// Freezer Type
main.post('/freezer_types', freezerType.create)
main.get('/freezer_types/:id', freezerType.getById)
main.post('/freezer_types/search', freezerType.search)

export default main
