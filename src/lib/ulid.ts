import { monotonicFactory, isValid } from 'ulid'

const ulid = monotonicFactory()
const generate = () => ulid()

export default {
    isValid,
    generate,
}
