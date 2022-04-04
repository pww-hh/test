//物品

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    //用于保存图片的地址
    icon: { type: String }
    
  })


module.exports = mongoose.model('Item', schema)