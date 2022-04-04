

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    username: { type: String },
    password:{ 
      type: String,
      //密码在查询是不能被查出
      select:false,
      set(val){
        //保存密码的散列值
        return require('bcrypt').hashSync(val,10)
      }
      }
    
  })

module.exports = mongoose.model('AdminUser', schema)