import Request,{RequestConfig} from './request'
import config from '@/config'
import {Param,Result, ApiMap,Format} from "@/api";
interface Req<T> extends RequestConfig {
    data?: T
}

const r=new Request({
    baseURL:config.baseUrl,
    timeout: 1000 * 60 * 5,
    interceptors: {
        // 请求拦截器
        requestInterceptors: config => {
            console.log('实例请求拦截器')

            return config
        },
        // 响应拦截器
        responseInterceptors: result => {
            console.log('实例响应拦截器')
            return result
        },
    },
})
export const request= {
    request<D, T = any>(config: Req<D>) {
        const {method = 'GET'} = config
        if (method === 'get' || method === 'GET') {
            config.params = config.data
        }
        return r.request<Format<T>>(config)
    },
    get<U extends keyof ApiMap>(url:U,params:Param<U>,config:RequestConfig={}){
        return r.request<Result<U>>(<Req<Param<U>>>{
            ...config,
            url,
            params
        })
    },
    post<U extends keyof ApiMap>(url:U,data:Param<U>,config:RequestConfig={}){
        return r.request<Result<U>>(<Req<Param<U>>>{
            ...config,
            url,
            data,
            method:'post'
        })
    },
    put<U extends keyof ApiMap>(url:U,data:Param<U>,config:RequestConfig={}){
        return r.request<Result<U>>(<Req<Param<U>>>{
            ...config,
            url,
            data,
            method:'put'
        })
    },
    delete<U extends keyof ApiMap>(url:U,params:Param<U>,config:RequestConfig={}){
        return r.request<Result<U>>(<Req<Param<U>>>{
            ...config,
            url,
            params,
            method:'delete'
        })
    },
    options<U extends keyof ApiMap>(url:U,params:Param<U>,config:RequestConfig={}){
        return r.request<Result<U>>(<Req<Param<U>>>{
            ...config,
            url,
            params,
            method:'options'
        })
    },
    cancelAllRequest(){
        return r.cancelAllRequest()
    },
    cancelRequest(url: string | string[]){
        return r.cancelRequest(url)
    },
}
