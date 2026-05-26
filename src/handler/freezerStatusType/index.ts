export default {
    create: (await import('./freezerStatusType.create')).default,
    getById: (await import('./freezerStatusType.getById')).default,
    get: (await import('./freezerStatusType.get')).default,
    update: (await import('./freezerStatusType.update')).default,
    delete: (await import('./freezerStatusType.delete')).default,
}
