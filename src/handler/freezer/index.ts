export default {
    create: (await import('./freezer.create')).default,
    getById: (await import('./freezer.getById')).default,
    update: (await import('./freezer.update')).default,
    delete: (await import('./freezer.delete')).default,
    get: (await import('./freezer.get')).default,
    bulkUpdate: (await import('./freezer.bulkUpdate')).default,
    bulkDelete: (await import('./freezer.bulkDelete')).default,
}
