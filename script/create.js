const fs = require('fs')
const path = require('path')
const {CAC}=require('cac')
const basePath=path.resolve(__dirname,'../src')
const templatePath=__dirname
const cli=new CAC('add')
function deepen(modifyString) {
    function modifyObject(source){
        if (typeof source !== 'object' || !source) return source
        if (Array.isArray(source)) return source.map(modifyObject)
        const result = {}
        for (const key in source) {
            result[modifyString(key)] = modifyObject(source[key])
        }
        return result
    }

    return function(source){
        if (typeof source === 'string') {
            return modifyString(source)
        } else {
            return modifyObject(source)
        }
    }
}
cli.command('create [name]>')
    .option('-t, --type <type>','component type (route or component,default:component)',{default:'component'})
    .action((name='',options)=>{
        switch (options.type){
            case 'component':
                return createComponent(name)
            case 'route':
                return createRoute(name)
            default:return
        }
    })
cli.parse()
function camelCase(source){
    return source.replace(source[0],source[0].toUpperCase()).replace(/[_-][a-z]/g, str => str.slice(1).toUpperCase())
}
function replaceName(template,name){
    return template.replaceAll('__name__',name)
        .replaceAll('__Name__',camelCase(name))
}
function createRoute(name){
    let dirArr=[]
    let dir=basePath+'/views'
    if(name.includes('/')){
        const pathWithName=name.split('/')
        name=pathWithName.pop()
        dirArr=[...pathWithName]
        while (dirArr.length){
            dir+=`/${dirArr.shift()}`
            fs.mkdirSync(dir)
        }
    }
    if(name.length===0)name='index'
    const routeTemplate=fs.readFileSync(path.resolve(templatePath,'route.vue'),{encoding:'utf-8'})
    fs.writeFileSync(path.resolve(dir,`${camelCase(name)}.vue`),replaceName(routeTemplate,name),{encoding:'utf-8'})
}
function createComponent(name){
    let dirArr=[]
    let dir=basePath+'/components'
    if(name.includes('/')){
        const pathWithName=name.split('/')
        name=pathWithName.pop()
        dirArr=[...pathWithName]
        while (dirArr.length){
            dir+=`/${dirArr.shift()}`
            fs.mkdirSync(dir)
        }
    }
    if(name.length===0)name='index'
    const componentTemplate=fs.readFileSync(path.resolve(templatePath,'component.vue'),{encoding:'utf-8'})
    fs.writeFileSync(path.resolve(dir,`${camelCase(name)}.vue`),replaceName(componentTemplate,name),{encoding:'utf-8'})
}
