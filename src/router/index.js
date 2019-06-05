import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'hemoPage',
      component: r => require.ensure([], () => r(require('../page/hemoPage')), ' hemoPage')
    },
    {
      path:'/newsPage',
      name:'newsPage',
      component:r => require.ensure([], () => r(require('../page/newsPage')), ' newsPage')
    },
    {
      path:'/loginPage',
      name:'loginPage',
      component:r => require.ensure([], () => r(require('../page/loginPage')), ' loginPage')
    },
    {
      path:'/newsManagePage',
      name:'newsManagePage',
      component:r => require.ensure([], () => r(require('../page/newsManagePage')), ' newsManagePage')
    },
    {
      path:'/addModifyNewsPage',
      name:'addModifyNewsPage',
      component:r => require.ensure([], () => r(require('../page/addModifyNewsPage')), ' addModifyNewsPage')
    }
  ]
})
