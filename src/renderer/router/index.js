import Vue from 'vue'
import Router from 'vue-router'
// 引入样式
import 'vue-easytable/libs/themes-base/index.css'
// 导入 table 和 分页组件
import {VTable, VPagination} from 'vue-easytable'
// 注册到全局
Vue.component(VTable.name, VTable)
Vue.component(VPagination.name, VPagination)
Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '/',
      component: require('@/components/overview').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
