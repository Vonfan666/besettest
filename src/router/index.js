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
      name:"Login",
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
      name:"Home",
      component:()=>import("@/components/Home/Home"),
      children:[
        {name:"infaterText",path:"/BesetTest/home/infater/text",component:()=>import("@/components/Home/Infater"),
        children:[
          {name:"infaterTextFile",path:"/BesetTest/home/infater/file",component:()=>import("@/components/Home/IntfaterContext")}
        ]
      },
        {path:"/BesetTest/home/infater/projectPop",component:()=>import("@/components/Home/ProjectPop")},
        {path:"/BesetTest/home/infater/globalVariables",component:()=>import("@/components/Home/GlobalVar")},
        {path:"/BesetTest/home/infater/history",component:()=>import("@/components/Home/History")}
      
      ]
    },


  ]
})



