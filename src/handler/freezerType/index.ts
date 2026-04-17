export default {
    create: (await import('./freezerType.create')).default,
    getById: (await import('./freezerType.getById')).default,
}
