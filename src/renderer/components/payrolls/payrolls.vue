<template>
  <div class="overview">
    <div class="overview__titlebar">
      <h1 class="overview__titlebar__text">薪資條</h1>
      <button class="btn btn--white" @click="print">列印</button>
    </div>
    
    <hr class="hr--one">
    <div class="payroll--container" id="print-rayroll">
      <app-payroll v-for="(tableData, index) in tableDatas" 
                  :staff="tableData"
                  :staffIndex="index"
                  :extColumnsArrs="extColumnsArrs"
                  :year="year"
                  :month="month"
                  :key="index"
                  @delData="delData">
      </app-payroll>
    </div>
    
  </div>
</template>

<script>
import store from '../../electronStore'
import appPayroll from './payroll.vue'
export default {
  components: {
    appPayroll
  },
  mounted () {
    const date = this.$route.params.date
    if (date === 'null') {
      this.gotoIndex()
      return
    }
    const dbTableData = store.get(`database.${date}.datakeyin`)
    this.tableDatas = dbTableData
    if (Object.keys(this.tableDatas[0]).length > 18) {
      this.extColumnsArrs = this.filterExtColumns('extra-')
    }
  },
  methods: {
    filterExtColumns (query) {
      return Object.keys(this.tableDatas[0]).filter(function (el) {
        return el.indexOf(query) > -1
      })
    },
    async gotoIndex () {
      await this.$swal('無指定日期', '請至概況點選新增年月年月或指定日期', 'warning')
      this.$router.push({path: '/'})
    },
    async print () {
      const ipc = require('electron').ipcRenderer
      ipc.on('wrote-pdf', (event, path) => {
        this.$swal('存檔成功', `存檔路徑為: ${path}`, 'success')
      })
      ipc.send('print-to-pdf', this.$route.params.date)
      // ipc.send('select-path')
    },
    delData (index) {
      this.tableDatas.splice(index, 1)
    }
  },
  computed: {
    year () {
      return this.$route.params.date.substr(0, 4) - 1911
    },
    month () {
      return this.$route.params.date.substr(5, 2)
    }
  },
  data () {
    return {
      tableDatas: [],
      extColumnsArrs: []
    }
  }
}
</script>


<style lang="scss">
  .payroll {
    position: relative;
    font-size: .12rem;
    width: 2.251rem;
    margin: .1rem;
    border: .015rem solid black;
    padding: .02rem;
    &--container {
      display: flex;
      align-items: flex-start;
      align-content: flex-start;
      flex-wrap: wrap;
      background-color: #FFF;
    }
    &--delete::before {
      display: none;
      position: absolute;
      top: -.2rem;
      right: -.12rem;
      content: '\2716';
      color: red;
      font-size: .25rem;
      cursor: pointer;
    }
    &:hover > &--delete::before {
      display: block;
    }
    &--left {
      display: inline-block;
      width: 1.413rem;
      margin: 0;
      text-align: right;
    }
    &--right {
      display: inline-block;
      width: calc(100% - 1.413rem - .04rem);
      margin: 0;
      text-align: right;
    }
    &--full {
      width: calc(100% - .04rem);
      text-align: right;
      white-space: pre-wrap;
    }
    &__title, &__subtotal, &__attn {
      border-bottom: .015rem solid black;
    }
    &__insurance {
      border-bottom: .015rem dashed black;
    }
  }
  @media print{
    .titlebar, .leftside, .overview__titlebar, hr{
      display: none;
    }
    #print-rayroll {
      width: 100%;
      padding: 0;
      display: block;
      text-align: left;
      padding: .2rem;
    }
    .overview {
      width: 21cm;
      min-height: 29.7cm;
    }
    .payroll {
      vertical-align : top;
      display: inline-block;
      page-break-inside: avoid;
    }
  
  }
</style>


