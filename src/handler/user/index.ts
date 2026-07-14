export default {
    create: (await import('./user.create')).default,
    get: (await import('./user.get')).default,
    getById: (await import('./user.getById')).default,
    update: (await import('./user.update')).default,
    delete: (await import('./user.delete')).default,
    auth: (await import('./user.auth')).default,
    whoami: (await import('./user.whoami')).default,
}
