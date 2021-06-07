const model  = require('../models')
const baseController = require('./baseController')

class clientErrorController extends baseController{
    C = async (ctx,next)=>{
        const { jsonData } = ctx.request.query
        const data = JSON.parse(jsonData)
        ctx.body = null
        if(JSON.stringify(data.info)==='{"type":"window catch","message":"Script error.","source":"","lineno":0,"colno":0}'){
            return 
        }
        await model.client_error.create({
            platform:data.platform,
            operating:'',
            errString:JSON.stringify(data.info),
            environment:data.environment,
            uid:data.uid,
            url:data.url
        })
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

module.exports = new clientErrorController() 