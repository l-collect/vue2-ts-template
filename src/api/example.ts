import {request} from "@/utils/request"
import {Format, Param, Result} from "@/api/index";
export interface User{
    name:string
    age:number
    enable:boolean
    address:string
}
declare module './index'{
    interface ApiMap{
        '/user/info'(param:{id:string}):Format<User>
        '/user/update'(param:{id:string,update:Partial<User>}):Format<boolean>
    }
}
export function getUserInfo(param:Param<'/user/info'>):Promise<Result<'/user/info'>>{
    return request.get('/user/info',param)
}
export function updateUserInfo(param:Param<'/user/update'>):Promise<Result<'/user/update'>>{
    return request.post('/user/update',param)
}
