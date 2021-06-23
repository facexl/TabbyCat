const model  = require('../models')
const baseController = require('./baseController')
const md5 = require('md5');
const { md5ProjectTokenSalt } = require('../config/config')

class projectController extends baseController{
    C = async (ctx,next)=>{
        const formData = ctx.request.body
        console.log(formData)
        const { name,profile } = formData
        await model.project.create({
            name,
            profile
        })
        let project = await model.project.findOne(
            { 
                where: { name }
            }
        );
        await model.project.update({ token }, {
            where: {
              id:project.id
            }
        });
        this.$success(ctx)
    }
    R = async (ctx,next)=>{
        const { pageSize,page } = ctx.request.query
        const res = await model.project.findAndCountAll(
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
    }
    U = async (ctx,next)=>{

    }
    D = async (ctx,next)=>{

    }
}
module.exports = new projectController() 