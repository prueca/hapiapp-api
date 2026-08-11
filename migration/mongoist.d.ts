declare module 'mongoist' {
    interface Collection<T = any> {
        find(query?: Partial<T>): Promise<T[]>
        findOne(query?: Partial<T>): Promise<T | null>
        insert(doc: T): Promise<any>
        update(query: Partial<T>, update: any, options?: any): Promise<any>
        remove(query: Partial<T>, options?: any): Promise<any>
    }

    interface Database {
        [collection: string]: Collection
        close(): Promise<void>
    }

    interface Mongoist {
        (url: string, options?: any): Database
        ObjectId: typeof import('mongodb').ObjectId
    }

    const mongoist: Mongoist

    export = mongoist
    export { Collection, Database, Mongoist }
}
