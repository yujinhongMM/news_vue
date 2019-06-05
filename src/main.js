// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'element-ui/lib/theme-chalk/index.css';
import Element from 'element-ui';
// 引入store
import store from './store';
// 引入粒子特效
import VueParticles from 'vue-particles'  
// 引入Axios
import http from './api/http'
import apiList from './api/apiList'
//使用编辑器
import VueQuillEditor from 'vue-quill-editor';
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

Vue.use(Element)
Vue.config.productionTip = false
Vue.use(VueParticles)

Vue.prototype.$http = http
Vue.prototype.$apiList = apiList
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,//使用store
  components: { App },
  template: '<App/>'
})
