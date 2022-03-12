type ApiBase={
    [P in string]:(...args:any[])=>any
}
export interface ApiMap extends ApiBase{}
type Parameter<T extends (param:any) => any> = T extends (param: infer P) => any ? P : never;
export type Param<D extends keyof ApiMap>=Parameter<ApiMap[D]>
export interface Format<T> {
    statusCode: number
    desc: string
    result: T
}
export type Result<D extends keyof ApiMap>=ReturnType<ApiMap[D]>
export * from './example'
