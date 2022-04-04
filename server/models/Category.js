//创建数据库模型

const mongoose = require('mongoose')

//对数据库中的表的结构的定义
const schema = new mongoose.Schema({
    name: { type: String },
    //添加父级结构,数据类型为数据库中的id
    parent: { type: mongoose.SchemaTypes.ObjectId,ref:'Category'}
    
  })

//导出模型
//第一个参数为数据库中某个集合的名字
//schema代表的是你刚刚创建的schema对象名。
module.exports = mongoose.model('Category', schema)