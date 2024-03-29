import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
//添加全局样式
import './assets/css/global.css'
import ElementUI from 'element-ui';
import * as echarts from 'echarts'
import { Table } from 'element-ui';

import axios from 'axios'
//全局挂在axios
Vue.prototype.$http=axios
axios.defaults.baseURL="http://localhost:9000"

Vue.prototype.$echarts=echarts

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Table);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
