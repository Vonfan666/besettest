// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUi  from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
import "../static/icon/iconfont.css"

import JsonViewer from 'vue-json-viewer'
Vue.config.productionTip = false


Vue.use(JsonViewer)


// 在调用 Vue.use 前，给 Message 添加 install 方法


// 和所有组件一样，一并进行use

// Vue.use(Message)
Vue.use(ElementUi)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
});

Vue.prototype.bus = new Vue;
