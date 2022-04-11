

import { parse,babelParse } from 'vue/compiler-sfc'

const fileRegex = /\.vue$/

// Special compiler macros
const DEFINE_REACTIVE = 'defineReactive'

export default function defineReactiveVitePlugin() {
  return {
    name: DEFINE_REACTIVE,
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: compileFileToJS(src),
        }
      }
    }
  }
}


function compileFileToJS(src){
    const { descriptor } = parse(src)
    let { scriptSetup } = descriptor
    if(!scriptSetup){
        return
    }
    const shoter = scriptSetup.content.match(/defineReactive/g)
    if(!shoter)return
    if(shoter.length>1){
        throw new Error(`一个script文件只允许出现一次 ${DEFINE_REACTIVE} `)
    }
    let content = scriptSetup.content
    const plugins = []
    const scriptAst = babelParse(content, {
        plugins,
        sourceType: 'module'
    }).program
    const nodeBody = scriptAst.body
    const target = nodeBody.find(it=>{
        return it.type==='VariableDeclaration' && it.declarations.length===1 && it.declarations[0].type==="VariableDeclarator" && it.declarations[0].init.type==="CallExpression" && it.declarations[0].init.callee.name==="defineReactive"
    })
    const targetArguments = target.declarations[0].init.arguments
    if(targetArguments.length!==1){
        throw new Error(`${DEFINE_REACTIVE} 有且仅有一个参数`)
    }
    if(targetArguments[0].type!=="ObjectExpression"){
        throw new Error(`${DEFINE_REACTIVE} 参数必须是对象`)
    }
    const targetArgumentsProperties = targetArguments[0].properties
    if(targetArgumentsProperties.length===0){
        throw new Error(`${DEFINE_REACTIVE} 参数不能是空对象`)
    }
    if(targetArgumentsProperties.find(it=>it.key.type!=='Identifier')){
        throw new Error(`${DEFINE_REACTIVE} 参数对象的 key 异常`)
    }
    // defineReactive 参数内部 key
    const targetArgumentsKeys = targetArgumentsProperties.map(it=>it.key.name)
    // 顶层变量
    const allIdentifier = nodeBody.filter(it=>it.type==='VariableDeclaration').reduce((a,b)=>{
        if(b.declarations[0].id.type==='Identifier'){
            a.push(b.declarations[0].id.name)
        }
        if(b.declarations[0].id.type==='ObjectPattern'){
            a = a.concat(b.declarations[0].id.properties.map(it=>it.value.name))
        }
        return a
    },[])
    // 变量声明检查
    for(let i=0;i<allIdentifier.length;i++){
        if(targetArgumentsKeys.includes(allIdentifier[i])){
            throw new Error(`顶层变量 ${allIdentifier[i]} 和 ${DEFINE_REACTIVE} 参数对象的 key: ${allIdentifier[i]} 重叠`)
        }
    }
    const finallyStr = `\n const ${JSON.stringify(targetArgumentsKeys).replace(/\[/,'{').replace(/\]/,'}').replace(/\"/g,'')} = toRefs(${target.declarations[0].id.name})\n`
    const finallyScript = scriptSetup.content.replace(DEFINE_REACTIVE,'reactive') + finallyStr
    return src.replace(/(<script[^>]*>)[\s\S]*(\<\/script>)/m,'$1'+finallyScript+'$2')
}
