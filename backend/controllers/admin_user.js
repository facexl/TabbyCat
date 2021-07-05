const model  = require('../models')
const baseController = require('./baseController')
const { commonStatus }  = require('../constant')
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
            if(user.status!==commonStatus.active){
                this.$fail(ctx,'账户已被禁用')
                return
            }
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
        const { name,role,password } = ctx.request.body
        console.log({
            password,
            name,
            password_digest:model.admin_user.getPasswordHash(password),
            role,
            status:commonStatus.active
       })
        await model.admin_user.create({
             password,
             name,
             password_digest:model.admin_user.getPasswordHash(password),
             role,
             status:commonStatus.active
        })
        this.$success(ctx,{})
        await next()
     }
     list=async (ctx,next)=>{
        const { pageSize,page } = ctx.request.query
        const res = await model.admin_user.findAndCountAll(
            { 
                limit: +pageSize,
                offset: +(page-1)*pageSize,
                order:[
                    ['id', 'DESC']
                ],
            }
        )
        this.$success(ctx,{
            list:res.rows,
            count:res.count
        })
        await next()
     }
     setStatus=async (ctx,next)=>{
        const { id,status } = ctx.request.body
        await model.admin_user.update({ status }, {
            where: {
              id
            }
          });
          this.$success(ctx)
        await next()
     }
     update=async (ctx,next)=>{
        const { id,name,role } = ctx.request.body
        await model.admin_user.update({ name,role }, {
            where: {
              id
            }
          });
          this.$success(ctx)
        await next()
     }
}
module.exports = new adminUserController()