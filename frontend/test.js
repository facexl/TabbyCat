const eslint = require('eslint')
const fs = require('fs')
const { CLIEngine } = eslint

const cli = new CLIEngine({
  parserOptions: {
    ecmaVersion: 2018
  },
  rules: {
    complexity: [
      'error',
      { max: 0 }
    ]
  }
})
// console.log(cli)
const reports = cli.executeOnFiles(['./src']).results

const REG_FUNC_TYPE = /^(Method|Async function|Arrow function|Function)/g
const TYPE_ENUM = {
  Method: '类方法',
  Function: '普通方法',
  'Async function': '异步函数',
  'Arrow function': '箭头函数'
}
const MESSAGE_PREFIX = 'Maximum allowed is 1.'
const MESSAGE_SUFFIX = 'has a complexity of '
// console.log(reports);
const complexityData = []
for (let i = 0; i < reports.length; i++) {
  const { messages, filePath } = reports[i]
  const path = filePath.replace(process.cwd(), '').replace(/\\+/g, '/').trim()
  const item = {}
  item.path = path
  item.list = []
  console.log(path)
  for (let j = 0; j < messages.length; j++) {
    const { message, ruleId, line, endLine, column } = messages[j]
    if (ruleId === 'complexity') {
      const type = getFunctionType(message)
      const name = getFunctionName(message)
      const complexity = getComplexity(message)
      complexity >= 10 && console.log(type, name, line, '行', endLine, '列', '圈复杂度', Number(complexity))
      item.list.push({ type, name, complexity, line, endLine, column })
    }
  }
  complexityData.push(item)
  saveData()
}

function getFunctionType (message) {
  const hasFuncType = message.match(REG_FUNC_TYPE)
  return hasFuncType ? TYPE_ENUM[hasFuncType[0]] : '未知类型'
}

function getMain (message) {
  return message.replace(MESSAGE_PREFIX, '').replace(MESSAGE_SUFFIX, '')
}
function getFunctionName (message) {
  const main = getMain(message)
  const test = /'([a-zA-Z0-9_$]+)'/g.test(main)
  return test ? RegExp.$1 : '匿名函数'
}
function getComplexity (message) {
  const main = getMain(message);
  (/(\d+)\./g).test(main)
  return RegExp.$1
}
function saveData () {
  const path = './testRes.js'
  let content = fs.readFileSync(path, 'utf8')
  content = `const complexityData = ${JSON.stringify(complexityData)}\nexport default complexityData`
  fs.writeFileSync(path, content, 'utf8')
}
