import { Hono } from 'hono'
import account from '@/handler/account'
import cabcon from '@/handler/cabcon'
import cabconCode from '@/handler/cabconCode'
import freezerType from '@/handler/freezerType'
import freezerStatusType from '@/handler/freezerStatusType'
import freezer from '@/handler/freezer'
import freezerStatus from '@/handler/freezerStatus'
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

// Freezer Status
routes.post('/freezer_status', freezerStatus.create)
routes.get('/freezer_status/:id', freezerStatus.getById)
routes.put('/freezer_status/:id', freezerStatus.update)
routes.post('/freezer_status/search', freezerStatus.search)

// Account
routes.post('/accounts', account.create)
routes.get('/accounts/:id', account.getById)
routes.get('/accounts', account.get)
routes.put('/accounts/:id', account.update)
routes.delete('/accounts/:id', account.delete)

// Cabcon Code
routes.post('/cabcon_codes', cabconCode.create)
routes.get('/cabcon_codes/:id', cabconCode.getById)
routes.get('/cabcon_codes', cabconCode.get)
routes.put('/cabcon_codes/:id', cabconCode.update)
routes.delete('/cabcon_codes/:id', cabconCode.delete)

// Cabcon
routes.post('/cabcons', cabcon.create)
routes.get('/cabcons/:id', cabcon.getById)
routes.get('/cabcons', cabcon.get)
routes.put('/cabcons/:id', cabcon.update)
routes.delete('/cabcons/:id', cabcon.delete)

// User
routes.post('/users', user.create)
routes.get('/users/:id', user.getById)
routes.get('/users', user.get)
routes.put('/users/:id', user.update)
routes.delete('/users/:id', user.delete)
routes.post('/users/login', user.login)
routes.post('/users/authorize', user.authorize)
routes.post('/users/logout', user.logout)
routes.post('/users/whoami', user.whoami)

export default routes
