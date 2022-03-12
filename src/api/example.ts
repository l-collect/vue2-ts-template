import {request} from "@/utils/request"
import {Format, Pagination, Param, Result} from "@/api/index";
export interface User{
    name:string
    // 年龄
    age:number
    enable:boolean
    address:string
}
declare module '.'{
    interface ApiMap{
        '/user/info'(param:{id:string}):Format<User>
        '/user/update'(param:{id:string,update:Partial<User>}):Format<boolean>
        '/user/list'(param?:Partial<User>):Format<Pagination<User>>
    }
}
export function getUserInfo(param:Param<'/user/info'>):Promise<Result<'/user/info'>>{
    return request.get('/user/info',param)
}
export function updateUserInfo(param:Param<'/user/update'>):Promise<Result<'/user/update'>>{
    return request.post('/user/update',param)
}
export function getUserList(param:Param<'/user/list'>={}):Promise<Result<'/user/list'>>{
    return request.post('/user/list',param)
}
