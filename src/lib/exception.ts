import { StatusCodes } from 'http-status-codes'
import { PlainObject } from './types'

const errors = {
    UNKNOWN_ERROR: {
        errorCode: 'UNKNOWN_ERROR',
        statusCode: StatusCodes.INTERNAL_SERVER_ERROR,
        message: 'Unknown server error',
    },
    PARSE_ERROR: {
        errorCode: 'PARSE_ERROR',
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Invalid data',
    },
    INVALID_PAYLOAD: {
        errorCode: 'INVALID_PAYLOAD',
        statusCode: StatusCodes.BAD_REQUEST,
        message: 'Invalid payload',
    },
    NOT_FOUND: {
        errorCode: 'NOT_FOUND',
        statusCode: StatusCodes.NOT_FOUND,
        message: 'Record not found',
    },
    CONFLICT: {
        errorCode: 'CONFLICT',
        statusCode: StatusCodes.CONFLICT,
        message: 'Record already exists',
    },
    UNAUTHORIZED: {
        errorCode: 'UNAUTHORIZED',
        statusCode: StatusCodes.UNAUTHORIZED,
        message: 'Unauthorized access',
    },
    PERMISSION_DENIED: {
        errorCode: 'PERMISSION_DENIED',
        statusCode: StatusCodes.FORBIDDEN,
        message: 'Permission denied',
    },
    SEQUELIZE_VALIDATION_ERROR: {
        errorCode: 'SEQUELIZE_VALIDATION_ERROR',
        statusCode: StatusCodes.UNPROCESSABLE_ENTITY,
        message: 'Sequelize validation error',
    },
}

export default class Exception extends Error {
    static errors = errors

    statusCode: number
    errorCode: string
    details?: PlainObject

    constructor(
        code: keyof typeof errors,
        message?: string | null,
        details?: PlainObject,
    ) {
        const msg =
            message ||
            errors[code as keyof typeof errors]?.message ||
            errors.UNKNOWN_ERROR.message

        const status =
            errors[code as keyof typeof errors]?.statusCode ||
            errors.UNKNOWN_ERROR.statusCode

        super(msg)

        this.errorCode = code
        this.statusCode = status
        this.details = details
    }
}
