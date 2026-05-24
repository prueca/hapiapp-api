export default {
    create: (await import('./cabcon.create')).default,
    getById: (await import('./cabcon.getById')).default,
    get: (await import('./cabcon.get')).default,
    update: (await import('./cabcon.update')).default,
    delete: (await import('./cabcon.delete')).default,
}
