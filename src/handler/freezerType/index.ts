export default {
    create: (await import('./freezerType.create')).default,
    getById: (await import('./freezerType.getById')).default,
    search: (await import('./freezerType.search')).default,
    update: (await import('./freezerType.update')).default,
    delete: (await import('./freezerType.delete')).default,
}
