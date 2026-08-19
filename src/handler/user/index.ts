export default {
    create: (await import('./user.create')).default,
    get: (await import('./user.get')).default,
    getById: (await import('./user.getById')).default,
    update: (await import('./user.update')).default,
    delete: (await import('./user.delete')).default,
    login: (await import('./user.login')).default,
    authorize: (await import('./user.authorize')).default,
    whoami: (await import('./user.whoami')).default,
    logout: (await import('./user.logout')).default,
}
