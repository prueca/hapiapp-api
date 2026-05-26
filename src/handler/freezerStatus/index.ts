export default {
    create: (await import('./freezerStatus.create')).default,
    getById: (await import('./freezerStatus.getById')).default,
    update: (await import('./freezerStatus.update')).default,
    get: (await import('./freezerStatus.get')).default,
}
