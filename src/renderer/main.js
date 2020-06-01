import Vue from 'vue'
import App from './App'
import router from './router'
import VueSwal from 'vue-swal'
import VueResource from 'vue-resource'
// vue-table css
import 'vue-easytable/libs/themes-base/index.css'
// vue table component
import {VTable, VPagination} from 'vue-easytable'
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(VueSwal)
Vue.use(VueResource)
Vue.http.options.root = 'your fibase api'
if (!process.env.IS_WEB) Vue.use(require('vue-electron'))
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  components: { App },
  router,
  template: '<App/>'
}).$mount('#app')
