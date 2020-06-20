import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: () => import('@/pages/login/index.vue')
    },
    {
    	path: '/main',
      name: 'mainContent',
      component: () => import('@/pages/mainContent/index.vue'),
      children: [
      	{
      		path: 'caterers',
		      component: () => import('@/pages/caterers/index.vue')
      	},{
          path: 'caterersAdd',
          component: () => import('@/pages/caterersAdd/index.vue')
        },
        {
          path: 'traffic',
          component: () => import('@/pages/traffic/index.vue')
        },{
          path: 'trafficAdd',
          component: () => import('@/pages/trafficAdd/index.vue')
        },{
          path: 'attractions',
          component: () => import('@/pages/attractions/index.vue')
        },{
          path: 'attractionsAdd',
          component: () => import('@/pages/attractionsAdd/index.vue')
        },{
          path: 'hotel',
          component: () => import('@/pages/hotel/index.vue')
        },{
          path: 'hotelAdd',
          component: () => import('@/pages/hotelAdd/index.vue')
        },{
          path: 'travelLine',
          component: () => import('@/pages/travelLine/index.vue')
        },{
          path: 'traveLineSet',
          component: () => import('@/pages/traveLineSet/index.vue')
        },{
          path: 'travelLineAdd',
          component: () => import('@/pages/travelLineAdd/index.vue')
        },{
          path: 'wxUser',
          component: () => import('@/pages/wxUser/index.vue')
        },{
          path: 'userSetting',
          component: () => import('@/pages/userSetting/index.vue')
        },{
          path: 'userLine',
          component: () => import('@/pages/userLine/index.vue')
        },{
          path: 'userLineDetail',
          component: () => import('@/pages/userLineDetail/index.vue')
        },{
          path: 'traveLineClone',
          component: () => import('@/pages/traveLineClone/index.vue')
        },{
          path: 'banner',
          component: () => import('@/pages/banner/index.vue')
        },{
          path: 'banner/edit/:id',
          component: () => import('@/pages/banner/edit.vue')
        },{
          path: 'banner/add',
          component: () => import('@/pages/banner/add.vue')
        }
      ]
    }
  ]
})
