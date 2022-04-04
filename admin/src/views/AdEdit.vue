<template>
  <div class='about'>
      <h1>{{id ? '编辑':'新建'}}广告位</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
      <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
      </el-form-item>

        <el-form-item label="广告">
             <el-button  size="small" @click="model.items.push({})">
            <i class="el-icon-plus"></i> 添加广告
          </el-button>

        <el-row type="flex" style="flex-wrap: wrap">

            <el-col :md="24" v-for="(item, i) in model.items" :key="i">
        
              <el-form-item label="跳转连接">
                <el-input v-model="item.url"></el-input>
              </el-form-item>

            <el-form-item label="图片" style="margin-top:0.5rem">
                <!--action:上传地址-->
                <el-upload
                    class="avatar-uploader"
                    :action="$http.defaults.baseURL+'upload'"
                    :show-file-list="false"
                    :on-success="res=>$set(item,'image',res.url)">
                    <!--图片地址-->
                    <img v-if="item.image" :src="item.image" class="avatar">
                    <!--默认图标-->
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                    </el-upload>
            </el-form-item>
              
              

              <el-form-item >
                <el-button type="danger" size="small"
                @click="model.items.splice(i,1)"
                >删除</el-button>
              </el-form-item>
              

                </el-col>
            </el-row>
        </el-form-item>

      <el-form-item>
           <el-button type="primary" native-type="submit">保存</el-button>
      </el-form-item>
      </el-form>
  </div>
</template>

<script>
export default {
    //获取到list组件跳转时携带的参数
    props:{
        id:{}
    },
    data(){
        return{
            model:{
               items:[] 
            },
           
        }
    },
    methods:{
        //请求一个接口，提交数据
        async save(){
            let res   
            if(this.id){
                //更新
                 res=await this.$http.put(`rest/ads/${this.id}`,this.model) 
            }else{
                //添加
                 res=await this.$http.post('rest/ads',this.model)
            }
        
           //编程式路由导航，跳转到下一个组件
            this.$router.push('/ads/list')
            //提示信息
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            //发送请求获取该id的数据（传送参数id过去）
            const res=await this.$http.get(`rest/ads/${this.id}`)
            this.model=Object.assign({},this.model, res.data)
        }
       
    },
    //编辑的时候，如果该数据存在，则获取添加到input框
    created(){
        this.id && this.fetch()
    }
}
</script>

<style>

</style>