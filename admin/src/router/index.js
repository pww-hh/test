import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Main from '../views/Main.vue'
import CategoryEdit from '../views/CategoryEdit.vue'
import CategoryList from '../views/CategoryList.vue'
import ItemEdit from '../views/ItemEdit.vue'
import ItemList from '../views/ItemList.vue'
import HeroEdit from '../views/HeroEdit.vue'
import HeroList from '../views/HeroList.vue'
import ArticleEdit from '../views/ArticleEdit.vue'
import ArticleList from '../views/ArticleList.vue'
import AdEdit from '../views/AdEdit.vue'
import AdList from '../views/AdList.vue'
import AdminUserEdit from '../views/AdminUserEdit.vue'
import AdminUserList from '../views/AdminUserList.vue'

Vue.use(VueRouter)

const routes = [
  {
    path:'/login',name:'login',component:Login,meta:{isPublic:true}
  },

  {
    path: '/',
    name: 'main',
    component: Main,
    //子路由(新建分类)
    children:[

      //分类
      {path:'/categories/create',component:CategoryEdit,},
      {
        //使用占位符声明接收params参数
        path:'/categories/edit/:id',
        component:CategoryEdit,
        //Props为真，则会把收到的params参数传递给下一个组件
        props:true,
        },
      {
        path:'/categories/list',
        component:CategoryList,
        },
      
        //物品
        {path:'/items/create',component:ItemEdit,},
      {
        //使用占位符声明接收params参数
        path:'/items/edit/:id',
        component:ItemEdit,
        //Props为真，则会把收到的params参数传递给下一个组件
        props:true,
        },
      {
        path:'/items/list',
        component:ItemList,
        },

        //英雄
        
        {path:'/Heroes/create',component:HeroEdit,},
      {
        //使用占位符声明接收params参数
        path:'/Heroes/edit/:id',
        component:HeroEdit,
        //Props为真，则会把收到的params参数传递给下一个组件
        props:true,
        },
      {
        path:'/Heroes/list',
        component:HeroList,
        },

        //文章
        {path:'/articles/create',component:ArticleEdit,},
        {
          //使用占位符声明接收params参数
          path:'/articles/edit/:id',
          component:ArticleEdit,
          //Props为真，则会把收到的params参数传递给下一个组件
          props:true,
          },
        {
          path:'/articles/list',
          component:ArticleList,
          },

          //广告
        {path:'/ads/create',component:AdEdit,},
        {
          //使用占位符声明接收params参数
          path:'/ads/edit/:id',
          component:AdEdit,
          //Props为真，则会把收到的params参数传递给下一个组件
          props:true,
          },
        {
          path:'/ads/list',
          component:AdList,
          },

           //管理员
        {path:'/admin_users/create',component:AdminUserEdit,},
        {
          //使用占位符声明接收params参数
          path:'/admin_users/edit/:id',
          component:AdminUserEdit,
          //Props为真，则会把收到的params参数传递给下一个组件
          props:true,
          },
        {
          path:'/admin_users/list',
          component:AdminUserList,
          },
    ]
      
    
  },
  
]

const router = new VueRouter({
  routes
})
//全局守卫路由
router.beforeEach((to,from,next)=>{
  if(!to.meta.isPublic&&!localStorage.token){
    return next('/login')
  }
  next()
})

export default router
