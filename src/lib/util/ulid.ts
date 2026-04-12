import { monotonicFactory, isValid } from 'ulid'

const ulid = monotonicFactory()

export default {
    isValid,
    generate: () => ulid(),
}
