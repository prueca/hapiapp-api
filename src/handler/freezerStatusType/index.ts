export default {
    create: (await import('./freezerStatusType.create')).default,
    getById: (await import('./freezerStatusType.getById')).default,
    search: (await import('./freezerStatusType.search')).default,
    update: (await import('./freezerStatusType.update')).default,
    delete: (await import('./freezerStatusType.delete')).default,
}
