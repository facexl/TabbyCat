const model  = require('../models')
const baseController = require('./baseController')

class projectController extends baseController{
    C = async (ctx,next)=>{
        const formData = ctx.request.body
        console.log(formData)
        const { name,profile } = formData
        // await model.project.create({
        //     name:
        // })
    }
    R = async (ctx,next)=>{
        const { pageSize,page,platform=0 } = ctx.request.query
        const res = await model.client_error.findAndCountAll(
            { 
                limit: +pageSize,
                offset: +(page-1)*pageSize,
                where: {
                    platform
                },
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