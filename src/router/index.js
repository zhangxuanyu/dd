import Vue from 'vue'
import Router from 'vue-router'
import layout from '../components/layout'
import rank from '../components/rank'
import all from '../page/all'
import detail from '../page/detail'
import money from '../page/money'
import number from '../page/number'
import rankb from '../page/rankb'
import search from '../page/search'
import trade from '../page/trade'
import use from '../page/use'
import usedapp from '../page/usedapp'
import user from '../page/user'
import empty from '../page/empty'
import Pcnotfond from '../page/notfound'

Vue.use(Router)

 
const router = new Router({
  // mode: 'history',
  routes: [
    { 
      path: '*', 
      component: Pcnotfond,
      meta:{
        title:'DappData'
      }
    },
    {
      path: '/',
      name: 'layout',
      component: layout,
      redirect:'/',
      children:[
        {
          path:'/',
          component: all,
          meta:{
            title:'DappData'
          }
        },
        {
          path:'/rank',
          component: rankb,
          meta:{
            title:'DappData'
          }
        },
        {
          path:'/num',
          component: number,
          meta:{
            title:'DappData'
          }
        },
        {
          path:'/money',
          component: money,
          meta:{
            title:'DappData'
          }
        },
        {
          path:'/use',
          component: use,
          meta:{
            title:'DappData'
          }
        },
        {
          path:'/search',
          component: search,
          meta:{
            title:'DappData'
          }
        },
        {
          path:'/detail',
          component: detail,
          meta:{
            title:'DappData'
          }
        },
        {
          path:'/user',
          component: user,
          meta:{
            title:'DappData'
          }
        },
        {
          path:'/trade',
          component: trade,
          meta:{
            title:'DappData'
          }
        },
        {
          path:'/usedapp',
          component: usedapp,
          meta:{
            title:'DappData'
          }
        },
        {
          path:'/empty',
          component: empty,
          meta:{
            title:'DappData'
          }
        }
      ]
    }
  ]
  
})

//导航守卫
router.beforeEach((to, from, next) => {
  //这里能够跟踪路径的变化
  window.scrollTo(0,0)
  //最后通过钩子继续页面的跳转
  next();
});

export default router