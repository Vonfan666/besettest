import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: "/BesetTest/login",
      name: "Login",
      component: () => import("@/components/Login/login")

    },
    {
      path: "/BesetTest/home",
      name: "Home",
      component: () => import("@/components/Home/Home"),
      children: [
        {
          name: "infaterText", path: "/BesetTest/home/infater/text", component: () => import("@/components/Home/Infater"),
          children: [
            { name: "infaterTextFile", path: "/BesetTest/home/infater/file", component: () => import("@/components/Home/IntfaterContext") }
          ]
        },
        { path: "/BesetTest/home/infater/projectPop", component: () => import("@/components/Home/ProjectPop") },
        { path: "/BesetTest/home/infater/globalVariables", component: () => import("@/components/Home/GlobalVar") },
        { path: "/BesetTest/home/infater/history", component: () => import("@/components/Home/History") },
        {
          path: "/BesetTest/case",
          name: "case",
          component: () => import("@/components/Infater/manageCase")
        },
        {
          path: "/BesetTest/runCase",
          name: "runCase",
          component: () => import("@/components/Infater/runCase")
        },
        {
          path: "/BesetTest/runLog",
          name: "runLog",
          component: () => import("@/components/Infater/runLog")
        },
        {
          path: "/BesetTest/manageSql",
          name: "manageSql",
          component: () => import("@/components/Infater/manageSql")
        },
      ]

    },



  ]
})



