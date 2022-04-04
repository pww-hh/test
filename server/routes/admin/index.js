//后端的路由
//向外暴露一个函数
module.exports=app=>{
    const express=require('express')
    const assert=require('http-assert')
    const jwt = require('jsonwebtoken')
    const AdminUser=require('../../models/AdminUser')
    // 定义路由方法，将我们定义的路由挂载到express
    const router = express.Router({
        //使父级里的参数，在router中可以访问到
        mergeParams:true
    })
    
    

    /*新建分类*/
    router.post('/',async(req,res)=>{
        const model=await req.Model.create(req.body)
        res.send(model)
    })

    /*更新*/
    router.put('/:id',async(req,res)=>{
        const model=await req.Model.findByIdAndUpdate(req.params.id,req.body)
        res.send(model)
    })


    /*获取全部信息*/
    router.get('/',async(req,res)=>{
        //判断是否需要获得关联数据
        const queryOptions={}
        //目前只有Category数据模型需要一起查找关联对象
        if(req.Model.modelName==='Category'){
            queryOptions.populate='parent'
        }
        //把数据库中的信息发送给客户端
        const items=await req.Model.find().setOptions(queryOptions).limit(100)
        res.send(items)
    })

     /*获取某个id的信息*/
     router.get('/:id',async(req,res)=>{
        //把数据库中的信息发送给客户端
        const model=await req.Model.findById(req.params.id)
        res.send(model)
    })

    /*删除某个id的信息*/
    router.delete('/:id',async(req,res)=>{
        await req.Model.findByIdAndDelete(req.params.id,req.body)
        res.send({
            success:true
        })
    })

    //资源处理中间件
    const resoureMiddleware=require('../../middleware/resoure')

    //登录校验中间件
    const authMiddleware=require('../../middleware/auth')

    //添加路由到/admin/api上，当使用路由的时候就可以不带前面的/admin/api路径了
    //添加一个前缀，作为增删改查的接口,连接动态数据,添加中间件处理
    app.use('/admin/api/rest/:resoure',
    authMiddleware(),resoureMiddleware(),router)


    //图片上传接口
    const multer=require('multer')
    //上传到uploads文件夹
    const upload=multer({dest:__dirname+'/../../uploads'})
    
    app.post('/admin/api/upload',authMiddleware(),upload.single('file'),async(req,res)=>{
        const file=req.file
        file.url=`http://localhost:3000/uploads/${file.filename}`
        res.send(file)
    })

    //登录的接口
    app.post('/admin/api/login',async(req,res)=>{
        const {username,password}=req.body
        //1，根据用户名找用户
        const user=await AdminUser.findOne({username}).select('+password')
        assert(user,422,"用户不存在")

        //2,校验密码
        const isValid=require('bcrypt').compareSync(password,user.password)
        assert(isValid,422,"密码错误")
    
        //3，返回token
        const token=jwt.sign({id:user._id},app.get('secret'))
        res.send({token})
    })

    
    
    //错误处理,抛出http异常的错误处理
    app.use(async(err,req,res,next)=>{
        res.status(err.statusCode || 500).send({
            message:err.message
        })
    })
}