<template>
  <div class="overview">
    <div class="overview__titlebar">
      <h1 class="overview__titlebar__text">薪資條</h1>
      <button class="btn btn--white" @click="print">列印</button>
    </div>
    <hr class="hr--one">
    <div class="payroll--container" id="print-rayroll">
      <div class="payroll" v-for="tableData in tableDatas">
        <div class="payroll__title">
          <p class="payroll--left">{{ year }}年</p>
          <p class="payroll--right">{{ month }}月</p>

          <p class="payroll--left">姓名</p>
          <p class="payroll--right">{{ tableData.姓名 }}</p>
        </div>
        <div class="payroll__subtotal">
          <p class="payroll--left">月薪</p>
          <p class="payroll--right">{{ tableData['月薪'] }}</p>

          <template v-if="tableData['加班天數(外勞)'] != 0">
            <p class="payroll--left">加班費(天)</p>
            <p class="payroll--right">{{ overTimePayPerDay(tableData.月薪, tableData['加班天數(外勞)']) }}</p>
          </template>
          <p class="payroll--left">加班費(1.33)</p>
          <p class="payroll--right">{{ overTimePay133(tableData.月薪, tableData['加班1.33時數']) }}</p>
          <p class="payroll--left">加班費(1.66)</p>
          <p class="payroll--right">{{ overTimePay166(tableData.月薪, tableData['加班1.66時數']) }}</p>
          <template v-if="tableData['全勤獎金'] != 0">
            <p class="payroll--left">全勤獎金</p>
            <p class="payroll--right">{{ tableData['全勤獎金'] }}</p>
          </template>
          <template v-if="tableData['伙食天數'] != 0">
            <p class="payroll--left">伙食費</p>
            <p class="payroll--right">{{ mealExpenses(tableData['伙食天數']) }}</p>
          </template>
          <template v-if="tableData['交通天數'] != 0">
            <p class="payroll--left">交通費</p>
            <p class="payroll--right">{{ commutingCost(tableData['交通天數']) }}</p>
          </template>
          <template v-if="tableData['證照'] != 0">
            <p class="payroll--left">證照費</p>
            <p class="payroll--right">{{ tableData['證照'] }}</p>
          </template>
          <template v-if="tableData['戒菸費'] != 0">
            <p class="payroll--left">戒菸費</p>
            <p class="payroll--right">{{ tableData['戒菸費'] }}</p>
          </template>
          <template v-if="tableData['點心費'] != 0">
            <p class="payroll--left">點心費</p>
            <p class="payroll--right">{{ tableData['點心費'] }}</p>
          </template>
          <template v-if="extColumnsArrs.length > 0">
            <template v-for="extColumnsArr in extColumnsArrs">
              <template v-if="tableData[extColumnsArr] != 0 ">
                <p class="payroll--left">{{ extColumnsArr.replace(/extra-/i, '') }}</p>
                <p class="payroll--right">{{ tableData[extColumnsArr] }}</p>
              </template>
            </template>
          </template>
          <p class="payroll--left">小計</p>
          <p class="payroll--right">{{ subtotal(tableData) }}</p>
        </div>
        <div class="payroll__insurance">
          <p class="payroll--left">勞保</p>
          <p class="payroll--right">{{ tableData['勞保費'] }}</p>
          <p class="payroll--left">健保</p>
          <p class="payroll--right">{{ tableData['健保費'] }}</p>
          <template v-if="tableData['仲介費'] != 0">
            <p class="payroll--left">仲介費</p>
            <p class="payroll--right">{{ tableData['仲介費'] }}</p>
          </template>
          
          <p class="payroll--left">總計</p>
          <p class="payroll--right">{{ total(tableData) }}</p>
        </div>
        <div class="payroll__attn">
          <p class="payroll--left">出勤天數</p>
          <p class="payroll--right">{{ tableData['出勤天數'] }}</p>
          <p class="payroll--left">應到天數</p>
          <p class="payroll--right">{{ tableData['應到天數'] }}</p>
          <p class="payroll--left">加班時數(1.33)</p>
          <p class="payroll--right">{{ tableData['加班1.33時數'] }}</p>
          <p class="payroll--left">加班時數(1.66)</p>
          <p class="payroll--right">{{ tableData['加班1.66時數'] }}</p>
        </div>
        <div class="payroll__commit">
          <p>備註</p>
          <p class="payroll--full">{{ replaceCommit(tableData['備註']) }}</p>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import store from '../electronStore'
export default {
  mounted () {
    const date = this.$route.params.date
    if (date === 'null') {
      this.gotoIndex()
      return
    }
    const dbTableData = store.get(`database.${date}.datakeyin`)
    this.tableDatas = dbTableData
    console.log(this.tableDatas)
    if (Object.keys(this.tableDatas[0]).length > 18) {
      this.extColumnsArrs = this.filterExtColumns('extra-')
    }
    console.log(this.extColumnsArrs)
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
    overTimePayPerDay (monthSalary, days) {
      return Math.ceil((monthSalary / 30) * days)
    },
    overTimePay133 (monthSalary, times) {
      return Math.ceil((monthSalary / 30 / 8) * times * 1.33)
    },
    overTimePay166 (monthSalary, times) {
      return Math.ceil((monthSalary / 30 / 8) * times * 1.67)
    },
    mealExpenses (days) {
      return days * 80
    },
    commutingCost (days) {
      return days * 50
    },
    subtotal (tableData) {
      let sum = parseInt(tableData['月薪']) + this.overTimePayPerDay(tableData.月薪, tableData['加班天數(外勞)']) + this.overTimePay133(tableData.月薪, tableData['加班1.33時數']) + this.overTimePay166(tableData.月薪, tableData['加班1.66時數']) + parseInt(tableData['全勤獎金']) + this.mealExpenses(tableData['伙食天數']) + this.commutingCost(tableData['交通天數']) + parseInt(tableData['證照']) + parseInt(tableData['戒菸費']) + parseInt(tableData['點心費'])
      for (let i = 0; i < this.extColumnsArrs.length; i++) {
        let extPrice = parseInt(tableData[this.extColumnsArrs[i]])
        sum += extPrice
      }
      return sum
    },
    total (tableData) {
      let subtotal = this.subtotal(tableData)
      let sum = subtotal + parseInt(tableData['勞保費']) + parseInt(tableData['健保費']) + parseInt(tableData['仲介費'])
      return sum
    },
    replaceCommit (commit) {
      if (commit === '待輸入') {
        return ' '
      } else {
        return commit
      }
    },
    async print () {
      const ipc = require('electron').ipcRenderer
      ipc.on('wrote-pdf', (event, path) => {
        this.$swal('存檔成功', `存檔路徑為: ${path}`, 'success')
        console.log(path)
      })
      ipc.send('print-to-pdf', this.$route.params.date)
      // ipc.send('select-path')
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
      text-align: center;
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


