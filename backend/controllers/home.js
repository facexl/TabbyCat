const index = async(ctx,next)=>{
    console.log(ctx.request.body,ctx.request.query)
    ctx.body = {

    }
    await next();
}

module.exports =  {
    index
}