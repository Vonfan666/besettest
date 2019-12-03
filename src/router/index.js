import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path:"/BesetTest/login",
      component:()=>import("@/components/Login/login")

    },
    // {  //注册--会注释
    //   path:"/BesetTest/regist",
    //   component:()=>import("@/components/Login/regist")
    // },
    // {
    //   path:"/BesetTest/test",
    //   component:()=>import("@/components/Login/test")
    // }
    {
      path:"/BesetTest/home",
      component:()=>import("@/components/Home/Home"),
      children:[
        {path:"/BesetTest/home/infater/text",component:()=>import("@/components/Home/Infater")},
        {path:"/BesetTest/home/infater/projectPop",component:()=>import("@/components/Home/ProjectPop")},
        {path:"/BesetTest/home/infater/globalVariables",component:()=>import("@/components/Home/GlobalVar")},
        {path:"/BesetTest/home/infater/history",component:()=>import("@/components/Home/History")}
      
      ]
    },


  ]
})



