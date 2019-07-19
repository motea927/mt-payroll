<template>
  <div class="overview">
    <div class="overview__titlebar">
      <h1 class="overview__titlebar__text">概況</h1>
      <button class="btn btn--blue" @click="addDate">新增年月 +</button>
      <button class="btn btn--white" @click="clearAllData">清除所有</button>
      <button class="btn btn--white" @click="saveData">備份</button>
      <button class="btn btn--white" @click="loadData">還原</button>
    </div>
    <hr class="hr--one">
    <v-table
            is-horizontal-resize
            is-vertical-resize
            even-bg-color="#f2f2f2"
            :vertical-resize-offset='10'
            style="width:80%; margin: .2rem auto;"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :row-click="selectedDate"
            @on-custom-comp="customCompFunc"
    ></v-table>
  </div>
</template>

<script>
import Vue from 'vue'
import bus from '../eventBus'
import store from '../electronStore'
export default {
  mounted () {
    this.loadLocalData()
  },
  data () {
    return {
      currentDateIndex: 0,
      tableData: [],
      columns: [
        {
          field: 'date',
          title: '年 - 月',
          width: 60,
          titleAlign: 'center',
          columnAlign: 'center',
          isResize: true,
          formatter: this.displayDate
        },
        {field: 'delete', title: '刪除', width: 60, titleAlign: 'center', columnAlign: 'center', componentName: 'table-delete', isResize: true},
        {field: 'save', title: '匯出', width: 60, titleAlign: 'center', columnAlign: 'center', isResize: true}
      ]
    }
  },
  methods: {
    async addDate () {
      const date = await this.$swal('請輸入年-月 如:2019-06', {content: 'input'})
      if (this.tableData.length !== 0) {
        this.currentDateIndex += 1
        let datakeyin = []
        datakeyin = store.get(`database.${this.tableData[0].date}.datakeyin`)
        store.set(`database.${date}`, {datakeyin: datakeyin})
      } else {
        store.set(`database.${date}`, {datakeyin: []})
      }
      this.tableData.unshift({
        'date': date,
        'delete': '',
        'save': ''
      })
      this.emitChangedDate()
    },
    noDataAlert () {
      this.$swal('無資料', '請點選新增年月新增資料', 'warning')
    },
    selectedDate (rowIndex, rowData, column) {
      this.currentDateIndex = rowIndex
      this.emitChangedDate()
      // alert(this.tableData[rowIndex].date)
    },
    displayDate (rowData, rowIndex, pagingIndex, field) {
      return rowIndex === this.currentDateIndex ? '<span><span class="star"></span>' + rowData.date + '</span>' : rowData.date
    },
    emitChangedDate () {
      if (this.tableData.length === 0) {
        bus.$emit('changedCurrentDate', null)
        this.noDataAlert()
        return
      }
      bus.$emit('changedCurrentDate', this.tableData[this.currentDateIndex].date)
    },
    customCompFunc (params) {
      if (params.type === 'delete') {
        if (params.index <= this.currentDateIndex && this.currentDateIndex !== 0) {
          this.currentDateIndex -= 1
        }
        store.delete(`database.${this.tableData[params.index]['date']}`)
        this.tableData.splice(params.index, 1)
      }
      this.emitChangedDate()
    },
    clearAllData () {
      this.tableData = []
      store.delete('database')
      this.emitChangedDate()
    },
    async saveData () {
      const localDatabase = store.get('database')
      if (!localDatabase || Object.keys(localDatabase).length === 0) {
        return
      }
      const saveData = JSON.stringify(JSON.stringify(localDatabase))
      await this.$http.put('data.json', saveData)
      this.$swal('成功', '資料備份成功!', 'success')
    },
    async loadData () {
      const data = await Vue.http.get('data.json')
      const localData = JSON.parse(data.body)
      store.set('database', localData)
      this.tableData = []
      this.loadLocalData()
      this.$swal('成功', '資料還原成功!', 'success')
    },
    loadLocalData () {
      const database = store.get('database')
      if (!database || Object.keys(database).length === 0) {
        this.noDataAlert()
        return
      }
      for (const date in database) {
        this.tableData.unshift({
          'date': date,
          'delete': '',
          'save': ''
        })
      }
      if (this.$route.params.date) {
        const routeDate = this.$route.params.date
        for (let i = 0; i < this.tableData.length; i++) {
          if (this.tableData[i].date === routeDate) {
            this.currentDateIndex = i
          }
        }
      }
      this.emitChangedDate()
    }
  }
}
Vue.component('table-delete', {
  template: `<span class="close" @click.stop.prevent="deleteRow()"></span>`,
  props: {
    index: {
      type: Number
    }
  },
  methods: {
    deleteRow () {
      // 参数根据业务场景随意构造
      let params = {type: 'delete', index: this.index}
      this.$emit('on-custom-comp', params)
    }
  }
})
</script>

<style lang="scss">
  .overview {
    // overflow: scroll;
    color: #2B343B;
    background-color: #FFFFFF;
    font-size: .17rem;
    height: calc(100% - .2rem);
    &__titlebar {
      display: flex;
      align-items: center;
      height: .50rem;
      margin: .2rem;
      &__text {
        margin-right: .2rem;
      }
    }
  }
  .star {
    display: inline-block;
    margin-left: -.25rem;
    height: .25rem;
    width: .25rem; 
    color: #758293;
    &::before {
      content: "\2714";
    }
  }
</style>

