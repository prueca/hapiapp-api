import path from 'path'
import { Request, Response, NextFunction } from 'express'
import _ from 'lodash'
import assert from 'assert'

import { Middleware, PlainObject, RequestHandler } from './types'
import Exception from './exception'

export default class Context {
    static _bindings = new WeakMap<Request, Context>()

    private _req: Request
    private _res: Response

    public params: PlainObject = {}
    public headers: PlainObject = {}
    public locals: PlainObject = {}

    public user: PlainObject = {}

    constructor(req: Request, res: Response) {
        this._req = req
        this._res = res
    }

    static attach() {
        return (req: Request, res: Response, next: NextFunction) => {
            const ctx = new Context(req, res)
            Context._bindings.set(req, ctx)

            next()
        }
    }

    static handler(method: RequestHandler) {
        const wrapper = async (req: Request) => {
            const ctx = Context.get(req)

            try {
                const response = await method(ctx)

                if (_.isPlainObject(response)) {
                    ctx._res.json(response)
                } else {
                    ctx._res.end()
                }
            } catch (e: any) {
                ctx.catch(e)
            }
        }

        return wrapper
    }

    static middleware(method: Middleware) {
        const wrapper = async (
            req: Request,
            _res: Response,
            next: NextFunction,
        ) => {
            const ctx = Context.get(req)

            try {
                await method(ctx, next)
            } catch (e: any) {
                ctx.catch(e)
            }
        }

        return wrapper
    }

    static get(req: Request): Context {
        const ctx = Context._bindings.get(req) as Context

        _.assign(
            ctx.params,
            _.mapKeys(req.query, (_v, k) => k),
            _.mapKeys(req.params, (_v, k) => k),
            _.mapKeys(req.body, (_v, k) => k),
        )

        ctx.headers = req.headers

        return ctx
    }

    setHeaders(headers: PlainObject) {
        this._res.set(headers)
    }

    removeHeaders(headers: string[]) {
        _.map(headers, (x) => this._res.removeHeader(x))
    }

    redirect(uri: string) {
        this._res.redirect(uri)
    }

    send(data: PlainObject, statusCode = 200) {
        assert.ok(_.isPlainObject(data))

        this._res.status(statusCode).json(data)
    }

    async download(file: string) {
        await new Promise<void>((resolve, reject) => {
            const filePath = path.join(__dirname, '../public', file)

            this._res.download(filePath, (err: Error) => {
                err ? reject(err) : resolve()
            })
        })
    }

    private catch(e: Exception) {
        const { UNKNOWN_ERROR } = Exception.errors
        const statusCode = e.statusCode || UNKNOWN_ERROR.statusCode
        const errorCode = e.errorCode || UNKNOWN_ERROR.errorCode
        const message = e.message || UNKNOWN_ERROR.message

        return this._res.status(statusCode).json({
            error: {
                code: errorCode,
                message: message,
            },
        })
    }

    get req() {
        return this._req
    }

    get res() {
        return this._res
    }
}
