export function merge<T extends object>(base:T,other:T){
    Object.entries(other).forEach(([key,value])=>{
        // @ts-ignore
        if(typeof base[key]==='undefined')return base[key]=other[key]
        // @ts-ignore
        if (typeof value === 'object' && typeof base[key] === 'object') {
            // @ts-ignore
            base[key] = merge(base[key], value)
        }
    })
    return base
}
