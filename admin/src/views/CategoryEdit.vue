<template>
  <div class='about'>
      <h1>{{id ? '编辑':'新建'}}分类</h1>
      <el-form label-width="120px" @submit.native.prevent="save">
          <!--上级分类-->
      <el-form-item label="上级分类">
          <el-select v-model="model.parent">
              <el-option v-for="item in parents"
              :key="item._id"
              :label="item.name"
              :value="item._id"></el-option>
            <!--把parents中的_id保存在model.parent中-->
          </el-select>
      </el-form-item>
      <el-form-item label="名称">
          <el-input v-model="model.name"></el-input>
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
            model:{},
            parents:[]
        }
    },
    methods:{
        //请求一个接口，提交数据
        async save(){
            let res   
            if(this.id){
                //更新
                 res=await this.$http.put(`rest/categories/${this.id}`,this.model) 
            }else{
                //添加
                 res=await this.$http.post('rest/categories',this.model)
            }
        
           //编程式路由导航，跳转到下一个组件
            this.$router.push('/categories/list')
            //提示信息
            this.$message({
                type:'success',
                message:'保存成功'
            })
        },
        async fetch(){
            //发送请求获取该id的数据（传送参数id过去）
            const res=await this.$http.get(`rest/categories/${this.id}`)
            this.model=res.data
        },
        //获得父级的数据parents
        async fetchParents(){
            //发送请求获取该id的数据（传送参数id过去）
            const res=await this.$http.get(`rest/categories`)
            this.parents=res.data
        }
    },
    //编辑的时候，如果该数据存在，则获取添加到input框
    created(){
        this.fetchParents()
        this.id && this.fetch()
    }
}
</script>

<style>

</style>