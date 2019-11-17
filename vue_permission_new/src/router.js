import Vue from 'vue'
import Router from 'vue-router'
import Login from './components/Login.vue'
import Home from './components/Home.vue'
//超级管理员才可以访问
import SuperRoute from './components/Super/SuperRoute.vue'
//普通管理员、超级管理员都可以访问
import PublicRoute from './components/Public/PublicRoute.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    { path: '/', redirect: '/login' },
    { path: '/login', component: Login, meta: { title: '登录页' } },
    { path: '/home', component: Home, meta: { title: '首页' } }
  ]
})

router.beforeEach((to, from, next) => {
  if (to.path == '/login') return next()
  if (!window.sessionStorage.getItem('token')) return next('/login')

  //根据用户的权限动态添加的路由
  const dynamicRoutesMap = [
    {
      path: "/home",
      component: Home,
      meta: { title: "首页" },
      children: [
        {
          path: "/public",
          component: PublicRoute,
          meta: { title: "public导航", roles: ["admin", "super"] }
        },
        {
          path: "/super",
          component: SuperRoute,
          meta: { title: "超级管理员导航", roles: ["super"] }
        }
      ]
    }
  ];
  var role = window.sessionStorage.getItem("role"); //获取用户的角色
  var isMenuSet = window.sessionStorage.getItem("isMenuSet"); //动态路由只能动态添加一次
  if (isMenuSet != 1) {
    //如果存在role
    dynamicRoutesMap[0].children = dynamicRoutesMap[0].children.filter(item => {
      return item.meta.roles.includes(role)
    })

    router.addRoutes(dynamicRoutesMap);
    window.sessionStorage.setItem('menus', JSON.stringify(dynamicRoutesMap[0].children))
    window.sessionStorage.setItem("isMenuSet", 1);
  }
next()
})


export default router