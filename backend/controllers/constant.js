const model  = require('../models')
const baseController = require('./baseController')
const { roles } = require('../constant/index')

class constantController extends baseController{
    roles = async (ctx,next)=>{
        this.$success(ctx,roles)
        await next()
    }
}

module.exports = new constantController()