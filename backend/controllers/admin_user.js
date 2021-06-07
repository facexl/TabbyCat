const model  = require('../models')
const baseController = require('./baseController')
class adminUserController extends baseController{
    login = async(ctx,next)=>{
        const { name,password } = ctx.request.body
        const user = await model.admin_user.findOne({ 
            where: { name },
            // attributes: { exclude: ['password_digest'] } // 不能去掉 验证需求
        })
        if(!user){
            this.$fail(ctx,'账号不存在')
            return
        }
        if(user.authenticate(password)){
            const token = this.$token(user)
            const res = {
                ...user.toJSON(),
                token
            }
            delete res.password_digest
            this.$success(ctx,res)
        }else{
            this.$fail(ctx,'账号或密码错误')
        }
        await next();
    }
    info = async (ctx,next)=>{
        const { uid } = ctx.request.query
        let user = await model.admin_user.findOne(
            { 
                where: { id:uid },
                attributes: { exclude: ['password_digest'] }
            }
        );
        console.log(ctx.state)
        if(!user){
            this.$fail(ctx,'用户不存在')
            return
        }
        this.$success(ctx,user)
        await next();
    }
    signIn = async (ctx,next)=>{
        console.log(ctx.request.body,ctx.state)
        const { name,password,role } = ctx.request.body
        await model.admin_user.create({
             password,
             name,
             password_digest:model.admin_user.getPasswordHash(password),
             role
        })
        this.$success(ctx,{})
        await next()
     }
     constantList=async (ctx,next)=>{

     }
}
module.exports = new adminUserController()