<template>
  <div class="datakeyin">
    <div class="datakeyin__titlebar">
      <h1 class="datakeyin__titlebar__text">資料輸入</h1>
      <button class="btn btn--blue" @click="addMember">新增員工 +</button>
      <button class="btn btn--white" @click="addColumns">新增欄位 +</button>
      <p>員工數: {{ tableData.length }}</p>
    </div>
    <hr>
    <v-table
            is-horizontal-resize
            is-vertical-resize
            even-bg-color="#f2f2f2"
            :vertical-resize-offset='30'
            style="width:95%; margin: .3rem auto;"
            :columns="columns"
            :table-data="tableData"
            row-hover-color="#eee"
            row-click-color="#edf7ff"
            :cell-edit-done="cellEditDone"
            @on-custom-comp="customCompFunc"
            :title-click="deleteColumns"
    ></v-table>
  </div>
</template>

<script>
import Vue from 'vue'
import store from '../electronStore'
export default {
  mounted () {
    const date = this.$route.params.date
    if (date === 'null') {
      this.gotoIndex()
      return
    }
    this.date = date
    const dbTableData = store.get(`database.${date}.datakeyin`)
    this.tableData = dbTableData
    if (this.tableData.length !== 0) {
      if (this.hasExtColumns) {
        const extColumnsArr = this.filterExtColumns('extra-')
        for (let i = 0; i < extColumnsArr.length; i++) {
          const newColumnsTemplete = {
            field: extColumnsArr[i],
            title: extColumnsArr[i].replace(/extra-/i, ''),
            width: 40,
            titleAlign: 'center',
            columnAlign: 'center',
            isResize: true,
            isEdit: true,
            titleCellClassName: 'custom-columns'
          }
          this.columns.splice(this.columns.length - 4, 0, newColumnsTemplete)
        }
      }
    }
  },
  methods: {
    async gotoIndex () {
      await this.$swal('無指定日期', '請至概況點選新增年月年月或指定日期', 'warning')
      this.$router.push({path: '/'})
    },
    addMember () {
      const nullMember = {}
      for (let i = 0; i < this.columns.length; i++) {
        console.log(this.columns[i]['field'])
        nullMember[this.columns[i]['field']] = '待輸入'
      }
      this.tableData.push(nullMember)
      this.autoSave()
    },
    async addColumns () {
      const columnsName = await this.$swal('請輸入欄位名稱', {content: 'input'})
      const newColumnsTemplete = {
        field: 'extra-' + columnsName,
        title: columnsName,
        width: 40,
        titleAlign: 'center',
        columnAlign: 'center',
        isResize: true,
        isEdit: true,
        titleCellClassName: 'custom-columns'
      }
      this.columns.splice(this.columns.length - 4, 0, newColumnsTemplete)
      for (let i = 0; i < this.tableData.length; i++) {
        this.$set(this.tableData[i], 'extra-' + columnsName, '待輸入')
      }
      this.autoSave()
    },
    deleteColumns (title, field) {
      console.log(this.tableData)
      if (this.columns.length === 18) {
        return
      }
      // end case: totalLength - 18 + 14
      for (let i = 14; i < this.columns.length - 4; i++) {
        if (this.columns[i]['field'] === field) {
          this.columns.splice(i, 1)
          for (let j = 0; j < this.tableData.length; j++) {
            this.$delete(this.tableData[j], field)
          }
          this.autoSave()
          return
        }
      }
    },
    customCompFunc (params) {
      if (params.type === 'delete') {
        this.tableData.splice(params.index, 1)
        this.autoSave()
      } else if (params.type === 'sort') {
        if (params.direction === 'forward') {
          const temp = this.tableData[params.index - 1]
          this.tableData.splice(params.index - 1, 1)
          this.tableData.splice(params.index, 0, temp)
          this.autoSave()
        } else {
          const temp = this.tableData[params.index]
          this.tableData.splice(params.index, 1)
          this.tableData.splice(params.index + 1, 0, temp)
          this.autoSave()
        }
      } else if (params.type === 'save') {
        this.tableData[params.index]['備註'] = params.commit
        console.log(this.tableData[params.index])
        console.log(params)
        this.autoSave()
      }
    },
    cellEditDone (newValue, oldValue, rowIndex, rowData, field) {
      this.tableData[rowIndex][field] = newValue
      this.autoSave()
    },
    autoSave () {
      store.set(`database.${this.date}.datakeyin`, this.tableData)
    },
    filterExtColumns (query) {
      return Object.keys(this.tableData[0]).filter(function (el) {
        return el.indexOf(query) > -1
      })
    },
    hasExtColumns () {
      const tableColumns = Object.keys(this.tableData[0]).length
      if (tableColumns > this.columns.length) {
        return true
      } else {
        return false
      }
    }
  },
  data () {
    return {
      tableData: [],
      columns: [
        {field: 'operation', title: '操作', width: 44, titleAlign: 'center', columnAlign: 'center', componentName: 'table-operation', isResize: true},
        {field: '姓名', title: '姓名', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '月薪', title: '月薪', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '出勤天數', title: '出勤天數', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '應到天數', title: '應到天數', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '加班天數(外勞)', title: '加班天數(外勞)', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '加班1.33時數', title: '加班1.33時數', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '加班1.67時數', title: '加班1.67時數', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '全勤獎金', title: '全勤獎金', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '伙食天數', title: '伙食天數', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '交通天數', title: '交通天數', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '證照', title: '證照', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '戒菸費', title: '戒菸費', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '點心費', title: '點心費', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '勞保費', title: '勞保費', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '健保費', title: '健保費', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '仲介費', title: '仲介費', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, isEdit: true},
        {field: '備註', title: '備註', width: 40, titleAlign: 'center', columnAlign: 'center', isResize: true, componentName: 'table-commit'}
      ],
      date: 'null'
    }
  }
}
Vue.component('table-operation', {
  template: `<span class="table-title">
    <span class="v-table-sort-icon">
      <i class="v-icon-up-dir checked" @click.stop.prevent="sort('forward')"></i> 
      <i class="v-icon-down-dir checked" @click.stop.prevent="sort('backward')"></i>
    </span>
    <span class="close" @click.stop.prevent="deleteRow()"></span>
  </span>`,
  props: {
    rowData: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  methods: {
    deleteRow () {
      let params = {type: 'delete', index: this.index}
      this.$emit('on-custom-comp', params)
    },
    sort (direction) {
      let params = {type: 'sort', index: this.index, direction: direction}
      this.$emit('on-custom-comp', params)
    }
  }
})
Vue.component('table-commit', {
  template: `<div @click="commit" style="width: .8rem;margin: 0;height:.4rem"> {{rowData.備註}}</div>`,
  props: {
    rowData: {
      type: Object
    },
    index: {
      type: Number
    }
  },
  data () {
    return {
      gg: '1234你說藍色是你最愛的顏色'
    }
  },
  methods: {
    async commit (personName) {
      let wrapper = document.createElement('div')
      let commitMessage = this.rowData.備註
      let CommitComponent = Vue.extend({
        data () {
          return {
            commit: commitMessage.toString()
          }
        },
        watch: {
          commit (newVal) { commitMessage = newVal }
        },
        template: `
        <textarea cols="20" rows="15" v-model="commit" style="font-size: .3rem;">{{ commit }}</textarea>`
      })
      let component = new CommitComponent().$mount(wrapper)
      await this.$swal({content: component.$el})
      this.rowData.備註 = commitMessage
      let params = {type: 'save', index: this.index, commit: this.rowData.備註}
      this.$emit('on-custom-comp', params)
    }
  }
})
</script>

<style lang="scss">
  .datakeyin {
    background-color: #FFFFFF;
    font-size: .17rem;
    height: calc(100% - .7rem);
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
  .custom-columns {
    color: #4971FF;
    cursor: pointer;
  }
</style>
