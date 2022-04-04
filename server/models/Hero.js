//物品

const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    name: { type: String },
    //用于保存图片的地址
    avatar: { type: String },
    banner: { type: String },
    title :{type:String},

    //关联Category数据库(一个英雄可以关联多个分类)
    categories:[{type:mongoose.SchemaTypes.ObjectId,ref:'Category'}],
    
    //评分
    scores:{
      difficult:{type:Number},
      skills:{type:Number},
      attack:{type:Number},
      survive:{type:Number},
    },
    //技能
    skills:[{
      icon:{type:String},
      name:{type:String},
      delay:{type:String},
      cost:{type:String},
      description:{type:String},
      tips:{type:String}
    }],
    //顺风出装
    items1:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    //逆风出装
    items2:[{type:mongoose.SchemaTypes.ObjectId,ref:'Item'}],
    //使用技巧
    usageTips:{type:String},
    //对抗技巧
    battleTips:{type:String},
    //团战思路
    teamTips:{type:String},
    //搭档
    partners:[{
      hero:{type:mongoose.SchemaTypes.ObjectId,ref:'Hero'},
      description:{type:String},
    }]

  })


module.exports = mongoose.model('Hero', schema,'heroes')