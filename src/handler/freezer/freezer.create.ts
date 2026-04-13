import Context from '@/lib/context'
import Exception from '@/lib/exception'
import z from 'zod'

const schema = z.object({
    freezerTypeId: z.ulid(),
    accountId: z.ulid(),
})

export default async (ctx: Context) => {
    const parsed = schema.safeParse(ctx.params)

    if (!parsed.success) {
        throw new Exception('PARSE_ERROR', null, parsed.error.issues)
    }

    try {
        const { freezerTypeId, accountId } = parsed.data
        const [freezerType] = await Promise.all([
            ctx.db.FreezerType.findByPk(freezerTypeId),
            // Todo: Fetch account record by accountId
        ])

        if (!freezerType) {
            throw new Exception('NOT_FOUND')
        }

        // Todo: Check if account exists

        return {
            data: await ctx.db.Freezer.create({
                freezerTypeId: freezerType.get('id'),
                accountId: accountId, // Todo: Use id from account record
            }),
        }
    } catch (error: any) {
        switch (error.name) {
            case 'SequelizeValidationError':
                throw new Exception('SEQUELIZE_VALIDATION_ERROR', error.message)
            default:
                throw error
        }
    }
}
