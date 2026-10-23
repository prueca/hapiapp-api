const DISTRIBUTOR_ADMIN = 'distributor-admin'
const DISTRIBUTOR_USER = 'distributor-user'
const DEALER_ADMIN = 'dealer-admin'
const DEALER_USER = 'dealer-user'
const HAPISTORE_ADMIN = 'hapistore-admin'
const HAPISTORE_USER = 'hapistore-user'
const DIRECT_STORE_ADMIN = 'direct-store-admin'
const DIRECT_STORE_USER = 'direct-store-user'

const userRoles = {
    DISTRIBUTOR_ADMIN,
    DISTRIBUTOR_USER,
    DEALER_ADMIN,
    DEALER_USER,
    HAPISTORE_ADMIN,
    HAPISTORE_USER,
    DIRECT_STORE_ADMIN,
    DIRECT_STORE_USER,
} as const

export default userRoles
