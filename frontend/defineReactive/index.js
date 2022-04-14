

import { parse,babelParse } from 'vue/compiler-sfc'
import { str,str2 } from './testStr'

const fileRegex = /\.vue$/

// Special compiler macros
const DEFINE_REACTIVE = 'defineReactive'

export default function defineReactiveVitePlugin(userOptions) {
  const options = {
      debug:false,
      ...userOptions
  }
  return {
    name: DEFINE_REACTIVE,
    transform(src, id) {
      if (fileRegex.test(id)) {
        return {
          code: compileFileToJS(src,options),
        }
      }
    }
  }
}

// compileFileToJS(str2,{debug:true})

function compileFileToJS(src,options){
    if(!src.includes(DEFINE_REACTIVE))return

    const log = function(a,b){
        options.debug && console.log(...arguments)
    }

    const { descriptor } = parse(src)

    // log('vue/compiler-sfc parse 之后',descriptor)

    let { scriptSetup } = descriptor

    if(!scriptSetup){
        throw new Error(`${DEFINE_REACTIVE} 只能用于script setup`)
    }

    let content = scriptSetup.content

    const scriptAst = babelParse(content, {
        plugins:[],
        sourceType: 'module'
    }).program

    log('babelParse 转换的 ast',scriptAst)

    const nodeBody = scriptAst.body

    const targets = nodeBody.filter(it=>{
        return it.type==='VariableDeclaration' && it.declarations.length===1 && it.declarations[0].type==="VariableDeclarator" && it.declarations[0].init.type==="CallExpression" && it.declarations[0].init.callee.name===DEFINE_REACTIVE||
        it.type==='ExpressionStatement' && it.expression && it.expression.callee.name===DEFINE_REACTIVE
    })

    if(!targets.length){
        log('ast 没有命中')
        return
    }

    const resTargets = targets.map(target=>{
        const needIdentifier = target.type==='ExpressionStatement'
        let targetArguments = [];
        if(needIdentifier){
            targetArguments = target.expression.arguments
        }else{
            targetArguments = target.declarations[0].init.arguments
        }
        if(targetArguments.length!==1){
            throw new Error(`${DEFINE_REACTIVE} 有且仅有一个参数`)
        }
        if(targetArguments[0].type!=="ObjectExpression"){
            throw new Error(`${DEFINE_REACTIVE} 参数必须是对象字面量`)
        }
        const targetArgumentsProperties = targetArguments[0].properties
        if(targetArgumentsProperties.find(it=>it.key.type!=='Identifier')){
            throw new Error(`${DEFINE_REACTIVE} 参数对象的 key 异常`)
        }
        // defineReactive 参数内部 key
        const argumentsKeys = targetArgumentsProperties.map(it=>it.key.name) 
        const newIdentifier = `auto_identifier__v_${target.start}`
        return {
            needIdentifier,
            newIdentifier,
            target,
            argumentsKeys,
            finallyStr:targetArgumentsProperties.length?`\n const ${JSON.stringify(argumentsKeys).replace(/\[/,'{').replace(/\]/,'}').replace(/\"/g,'')} = toRefs(${needIdentifier?newIdentifier:target.declarations[0].id.name})\n`:''
        }
    })

    log('待处理对象 resTargets',resTargets)

    const combinResTargets = resTargets.reduce((a,b)=>{
        a = a.concat(b.argumentsKeys)
        return a
    },[])

    if([...new Set(combinResTargets)].length!==combinResTargets.length){
        throw new Error(`多个${DEFINE_REACTIVE}参数对象使用了相同的key`)
    }

    // 顶层变量
    const allVariableDeclaration = nodeBody.filter(it=>it.type==='VariableDeclaration').reduce((a,b)=>{
        if(b.declarations[0].id.type==='Identifier'){
            a.push(b.declarations[0].id.name)
        }
        if(b.declarations[0].id.type==='ObjectPattern'){
            a = a.concat(b.declarations[0].id.properties.map(it=>it.value.name))
        }
        return a
    },[])

    // 变量声明检查
    for(let i=0;i<allVariableDeclaration.length;i++){
        if(combinResTargets.includes(allVariableDeclaration[i])){
            throw new Error(`顶层变量 ${allVariableDeclaration[i]} 和 ${DEFINE_REACTIVE} 参数对象的 key: ${allVariableDeclaration[i]} 冲突 Duplicate`)
        }
    }

    let finallyScript = scriptSetup.content

    // 倒序为了从后面修改字符串 避免影响到 ast 坐标  
    resTargets.reverse().forEach(it=>{
        if(it.needIdentifier){
            finallyScript = finallyScript.substring(0,it.target.start)+`\n const ${it.newIdentifier}=`+finallyScript.substring(it.target.start,finallyScript.length)
        }
        finallyScript = finallyScript + it.finallyStr
    })
    const reg = new RegExp(DEFINE_REACTIVE,'g')
    finallyScript = finallyScript.replace(reg,'reactive') 
    log(
        '转换结果:',
        ['template','script','scriptSetup']
            .filter(it=>descriptor[it])
            .map(it=>revertTopTags(descriptor[it],it==='scriptSetup'?finallyScript:false))
            .concat(descriptor.styles.map(it=>revertTopTags(it)))
            .sort((a,b)=>a.offset-b.offset)
            .map(it=>it.content)
            .join('\n')
    )
    return ['template','script','scriptSetup']
            .filter(it=>descriptor[it])
            .map(it=>revertTopTags(descriptor[it],it==='scriptSetup'?finallyScript:false))
            .concat(descriptor['styles'].map(it=>revertTopTags(it)))
            .sort((a,b)=>a.offset-b.offset)
            .map(it=>it.content)
            .join('\n')
}

function revertTopTags(obj,content){
    const res = Object.keys(obj.attrs).reduce((a,b)=>{
        const str = obj.attrs[b]===true?` ${b}`:` ${b}="${obj.attrs[b]}"`
        a = a + str
        return a
    },'')
    return {
        content:`<${obj.type}${res}>${content || obj.content}</${obj.type}>`,
        offset:obj.loc.start.offset
    }
}
