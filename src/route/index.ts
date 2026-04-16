import { Hono } from 'hono'
import freezerType from '@/handler/freezerType'

const main = new Hono()

// Freezer Type
main.post('/freezer_types', freezerType.create)

export default main
