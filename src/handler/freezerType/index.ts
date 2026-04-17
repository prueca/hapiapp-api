export default {
    create: (await import('./freezerType.create')).default,
    getById: (await import('./freezerType.getById')).default,
    search: (await import('./freezerType.search')).default,
}
