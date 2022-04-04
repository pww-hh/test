<template>
  <div>
      <h1>广告位列表</h1>
      <!--表格数据-->
      <el-table :data="items">
         <el-table-column prop="_id" label="ID" width='230px'>
        </el-table-column>
        
        <el-table-column prop="name" label="名称">
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="180">
            <template slot-scope="scope">
                <!--编辑按钮-->
                <!--跳转路由，并从此组件携带参数前往下一个组件-->
                <el-button type="primary" size="small" 
                @click="$router.push(`/ads/edit/${scope.row._id}`)">
                编辑</el-button>
                <!--删除按钮-->
                <el-button type="primary" size="small" 
                @click="remove(scope.row)">
                删除</el-button>
            </template>
        </el-table-column>
      </el-table>
  </div>
</template>

<script>
export default {
    data(){
        return {
            items:[]
        }
    },
    methods:{
        async fetch(){
            //连接接口获取数据
            const res=await this.$http.get('rest/ads')
            this.items=res.data
        },
        async remove(row){
            //提示是否确认删除
            this.$confirm(`是否要删除"${row.name}"`, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
            })
            .then( async () => {
                //如果确认删除，则请求接口
                const res=await this.$http.delete(`rest/ads/${row._id}`)
                this.$message({
                    type: 'success',
                    message: '删除成功!'
            });
            //重新获取数据
            this.fetch()
            })   

        }
    },
    //创建时默认获取数据
    created(){
        this.fetch()
    }
}
</script>

<style>

</style>