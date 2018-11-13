import Vue from 'vue'
import Router from 'vue-router'

//pc端
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
import report from '../page/report'
import chain from '../page/comment_chain'
import chaindetail from '../page/chaindetail'
import chainuser from '../page/chainuser'
import chainusedapp from '../page/chainuse'
import chaintrade from '../page/chaintrade'
import chaindata from '../page/chaindata'
import pdf from '../page/pdf'
import empty from '../page/empty'
import Pcnotfond from '../page/notfound'

//移动端
import phlayout from '../components/phone/layout'
import phall from '../page/phone/all.vue'
import phrank from '../page/phone/rank.vue'
import phusernum from '../page/phone/usernum.vue'
import phtrade from '../page/phone/trade.vue'
import phcall from '../page/phone/call.vue'
import phdetail from '../page/phone/detail.vue'
import phuseraly from '../page/phone/user_aly.vue'
import phtradealy from '../page/phone/trade_aly.vue'
import phusedappaly from '../page/phone/usedapp_aly.vue'
import phreport from '../page/phone/report.vue'
import phsearch from '../page/phone/search.vue'

Vue.use(Router)

var chooseroute = []
var myroutelist = [
  [
    {
      path: '/pdf',
      component: pdf,
      meta: {
        title: 'DappData'
      }
    },
    {
      path: '/',
      name: 'layout',
      component: layout,
      redirect: '/',
      children: [
        {
          path: '/',
          component: all,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/rank',
          component: rankb,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/num',
          component: number,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/money',
          component: money,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/use',
          component: use,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/report',
          component: report,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/search',
          component: search,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/detail',
          component: detail,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/user',
          component: user,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/trade',
          component: trade,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/usedapp',
          component: usedapp,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/empty',
          component: empty,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chain',
          component: chain,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chaindetail',
          component: chaindetail,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chainuser',
          component: chainuser,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chainusedapp',
          component: chainusedapp,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chaintrade',
          component: chaintrade,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chaindapp',
          component: chaindata,
          meta: {
            title: 'DappData'
          }
        }
      ]
    },
    {
      path: '*',
      component: Pcnotfond,
      meta: {
        title: 'DappData'
      }
    }
  ],
  [
    {
      path: '/',
      name: 'phlayout',
      component: phlayout,
      redirect: '/',
      children: [
        {
          path: '/',
          component: phall,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/rank',
          component: phrank,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/num',
          component: phusernum,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/money',
          component: phtrade,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/use',
          component: phcall,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/report',
          component: phreport,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/detail',
          component: phdetail,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/user',
          component: phuseraly,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/trade',
          component: phtradealy,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/usedapp',
          component: phusedappaly,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/empty',
          component: empty,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chain',
          component: chain,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chaindetail',
          component: chaindetail,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chainuser',
          component: chainuser,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chainusedapp',
          component: chainusedapp,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chaintrade',
          component: chaintrade,
          meta: {
            title: 'DappData'
          }
        },
        {
          path: '/chaindapp',
          component: chaindata,
          meta: {
            title: 'DappData'
          }
        }
      ]
    },
    {
      path: '/search',
      component: phsearch,
      meta: {
        title: 'DappData'
      }
    },
    {
      path: '*',
      component: Pcnotfond,
      meta: {
        title: 'DappData'
      }
    }
  ]
]

if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  /*window.location.href="你的手机版地址";*/
  chooseroute = myroutelist[1]
} else {
  /*window.location.href="你的电脑版地址";    */
  chooseroute = myroutelist[0]
}

const router = new Router({
  // mode: 'history',
  routes: chooseroute

})

//导航守卫
router.beforeEach((to, from, next) => {
  //这里能够跟踪路径的变化
  window.scrollTo(0, 0)
  //最后通过钩子继续页面的跳转
  next();
});

export default router