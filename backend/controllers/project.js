const model  = require('../models')
const baseController = require('./baseController')
const md5 = require('md5');
const { md5ProjectTokenSalt } = require('../config/config')
const { Op } = require("sequelize");
const { commonStatus }  = require('../constant')

class projectController extends baseController{
    C = async (ctx,next)=>{
        const formData = ctx.request.body
        const { name,profile,id } = formData
        if(id){
            this.U(ctx,next)
            return
        }
        await model.project.create({
            name,
            profile
        })
        let project = await model.project.findOne(
            { 
                where: { name }
            }
        );
        const token = md5(`${md5ProjectTokenSalt}${project.id}`)
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
                where:{
                    status:{
                        [Op.not]:commonStatus.delete
                    }
                }
            }
        )
        this.$success(ctx,{
            list:res.rows,
            count:res.count
        })
    }
    U = async (ctx,next)=>{
        const formData = ctx.request.body
        console.log(213245675,formData)
        const { id } = formData
        await model.project.update({ ...formData }, {
            where: {
              id
            }
        });
        this.$success(ctx)
    }
    D = async (ctx,next)=>{
        const formData = ctx.request.body
        const { id } = formData
        await model.project.update({ status:commonStatus.delete }, {
            where: {
              id
            }
        });
        this.$success(ctx)
    }
}
module.exports = new projectController() 