const jwt = require('jsonwebtoken')
const { jwtSecret,jwtExpiresIn } = require('../config/config')
class baseController{
    $success(ctx,data){
        ctx.body = {
            code:0,
            data,
            message:'success'
        }
    }
    $fail(ctx,message){
        ctx.body = {
            code:999,
            message
        }
    }
    $token(user){
        return jwt.sign(
            {id:user.id},
            jwtSecret,
            {expiresIn:jwtExpiresIn}
        )
    }
}

module.exports = baseController