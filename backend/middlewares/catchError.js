const { fuck } = require('../models/admin_user')
module.exports = async function(ctx,next){
    try {
        await next();
    } catch (err) {
        handleError(ctx,err)
    }
}

function handleError(ctx,err){
    const { code,errMsg } = normalizeError(err)
    // 真实 status 
    const status = err.status || 500
    ctx.state = {
        status: 200,
        currentUser: null,
    }
    ctx.body = {
        code,
        message:errMsg
    }
}
function normalizeError(err){
    console.log(err)
    let errMsg = err
    let code = 9999
    if(err.name && err.errors){
        const errInfo = err.errors[0]
        switch(errInfo.type){
            case 'notNull Violation':
                errMsg = `${errInfo.path}不能为空`
            case 'unique violation':
                errMsg = `${errInfo.path}已存在`
            break
        }
    }
    if(err==='NO_LOGIN'){
        errMsg = '未登录'
        code = 10010
    }
    if(err==='DISABLED'){
        errMsg = '账户已被禁用'
        code = 10010
    }
    return {
        code,
        errMsg
    }
}
