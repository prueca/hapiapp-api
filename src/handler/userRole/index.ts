export default {
    create: (await import('./userRole.create')).default,
    getById: (await import('./userRole.getById')).default,
    search: (await import('./userRole.search')).default,
    update: (await import('./userRole.update')).default,
    delete: (await import('./userRole.delete')).default,
}