import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';
import router from './router/index'
import store from './store'
import 'normalize.css'
import 'element-ui/lib/theme-chalk/index.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'

Vue.use(mavonEditor)

Vue.config.productionTip = false

Vue.use(ElementUI);


new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
