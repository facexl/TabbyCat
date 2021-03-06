
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/config')
const { commonStatus }  = require('../constant')

module.exports = function(options={whitelist:[]}){
    return async function(ctx,next){
        const { whitelist } = options
        if(!whitelist.includes(ctx.originalUrl.split('?')[0])){
            try{
                const jwtInfo = jwt.verify(ctx.headers.authorization,jwtSecret)
                if(jwtInfo.status!==commonStatus.active){
                    throw 'DISABLED'
                }
                ctx.state.jwtInfo = jwtInfo
            }catch(err){
                throw 'NO_LOGIN'
            }
        }
        await next()
    }
}