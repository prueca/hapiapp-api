export default {
    create: (await import('./account.create')).default,
    get: (await import('./account.get')).default,
    getById: (await import('./account.getById')).default,
    update: (await import('./account.update')).default,
    delete: (await import('./account.delete')).default,
}