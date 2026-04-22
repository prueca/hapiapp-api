export default {
    create: (await import('./accountType.create')).default,
    get: (await import('./accountType.get')).default,
    getById: (await import('./accountType.getById')).default,
    update: (await import('./accountType.update')).default,
    delete: (await import('./accountType.delete')).default,
}