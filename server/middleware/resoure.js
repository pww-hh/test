module.exports=options=>{
    return async(req,res,next)=>{
        //把:resoure参数字段转化为类名
        const modelName=require('inflection').classify(req.params.resoure)
        //获得模型
        req.Model=require(`../models/${modelName}`)
        next()
    }
}