export default {
    create: (await import('./cabconCode.create')).default,
    get: (await import('./cabconCode.get')).default,
    getById: (await import('./cabconCode.getById')).default,
    update: (await import('./cabconCode.update')).default,
    delete: (await import('./cabconCode.delete')).default,
}