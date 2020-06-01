<template>
  <div class="payroll">
    <div class="payroll--delete" @click="$emit('delData', staffIndex)"></div>
    <div class="payroll__title">
      <p class="payroll--left">{{ year }}年</p>
      <p class="payroll--right">{{ month }}月</p>
      <p class="payroll--left">姓名</p>
      <p class="payroll--right">{{ staff['姓名'] }}</p>
    </div>
    <div class="payroll__subtotal">
      <p class="payroll--left" contenteditable>月薪</p>
      <p class="payroll--right" contenteditable>{{ staff['月薪'] }}</p>
      <template v-if="staff['加班天數(外勞)'] != 0">
        <p class="payroll--left" contenteditable>加班費(天)</p>
        <p class="payroll--right" contenteditable>{{ overTimePayPerDay }}</p>
      </template>
      <p class="payroll--left" contenteditable>加班費(1.33)</p>
      <p class="payroll--right" contenteditable>{{ overTimePay(1.33) }}</p>
      <p class="payroll--left" contenteditable>加班費(1.66)</p>
      <p class="payroll--right" contenteditable>{{ overTimePay(1.67) }}</p>
      <template v-if="staff['全勤獎金'] != 0">
        <p class="payroll--left" contenteditable>全勤獎金</p>
        <p class="payroll--right" contenteditable>{{ staff['全勤獎金'] }}</p>
      </template>
      <template v-if="staff['伙食天數'] != 0">
        <p class="payroll--left" contenteditable>伙食費</p>
        <p class="payroll--right" contenteditable>{{ mealExpenses }}</p>
      </template>
      <template v-if="staff['交通天數'] != 0">
        <p class="payroll--left" contenteditable>交通費</p>
        <p class="payroll--right" contenteditable>{{ commutingCost }}</p>
      </template>
      <template v-if="staff['證照'] != 0">
        <p class="payroll--left" contenteditable>證照費</p>
        <p class="payroll--right" contenteditable>{{ staff['證照'] }}</p>
      </template>
      <template v-if="staff['戒菸費'] != 0">
        <p class="payroll--left" contenteditable>戒菸費</p>
        <p class="payroll--right" contenteditable>{{ staff['戒菸費'] }}</p>
      </template>
      <template v-if="staff['點心費'] != 0">
        <p class="payroll--left" contenteditable>點心費</p>
        <p class="payroll--right" contenteditable>{{ staff['點心費'] }}</p>
      </template>

      <template v-if="extColumnsArrs.length > 0">
        <template v-for="extColumnsArr in extColumnsArrs">
          <template v-if="staff[extColumnsArr] > 0">
            <p class="payroll--left" contenteditable>{{ extColumnsArr.replace(/extra-/i, '') }}</p>
            <p class="payroll--right" contenteditable>{{ staff[extColumnsArr] }}</p>
          </template>
        </template>
      </template>
      <p class="payroll--left" contenteditable>小計</p>
      <p class="payroll--right" contenteditable>{{ subtotal }}</p>
    </div>
    <div class="payroll__insurance">
        <p class="payroll--left" contenteditable>勞保</p>
        <p class="payroll--right" contenteditable>{{ staff['勞保費'] }}</p>
        <p class="payroll--left" contenteditable>健保</p>
        <p class="payroll--right" contenteditable>{{ staff['健保費'] }}</p>
        <template v-if="staff['仲介費'] != 0">
          <p class="payroll--left" contenteditable>仲介費</p>
          <p class="payroll--right" contenteditable>{{ staff['仲介費'] }}</p>
        </template>
        <template v-if="extColumnsArrs.length > 0">
          <template v-for="extColumnsArr in extColumnsArrs">
            <template v-if="staff[extColumnsArr] < 0">
              <p class="payroll--left" contenteditable>{{ extColumnsArr.replace(/extra-/i, '') }}</p>
              <p class="payroll--right" contenteditable>{{ staff[extColumnsArr] }}</p>
            </template>
          </template>
        </template>
        <p class="payroll--left" contenteditable>總計</p>
        <p class="payroll--right" contenteditable>{{ total }}</p>
      </div>
      <div class="payroll__attn">
        <p class="payroll--left" contenteditable>出勤天數</p>
        <p class="payroll--right" contenteditable>{{ staff['出勤天數'] }}</p>
        <p class="payroll--left" contenteditable>應到天數</p>
        <p class="payroll--right" contenteditable>{{ staff['應到天數'] }}</p>
        <template v-if="staff['加班天數(外勞)'] != 0">
          <p class="payroll--left" contenteditable>加班天數</p>
          <p class="payroll--right" contenteditable>{{ staff['加班天數(外勞)'] }}</p>
        </template>
        <p class="payroll--left" contenteditable>加班時數(1.33)</p>
        <p class="payroll--right" contenteditable>{{ staff['加班1.33時數'] }}</p>
        <p class="payroll--left" contenteditable>加班時數(1.66)</p>
        <p class="payroll--right" contenteditable>{{ staff['加班1.66時數'] }}</p>
      </div>
      <div class="payroll__commit">
        <p style="height: 100%; text-align:left;">備註</p>
        <p class="payroll--full">{{ replaceCommit }}</p>
      </div>
  </div>
</template>

<script>
  export default {
    props: ['staff', 'staffIndex', 'extColumnsArrs', 'year', 'month'],
    computed: {
      overTimePayPerDay () {
        const monthSalary = this.toNum(this.staff['月薪'])
        const days = this.toNum(this.staff['加班天數(外勞)'])
        return Math.ceil((monthSalary / 30) * days)
      },
      mealExpenses () {
        const days = this.toNum(this.staff['伙食天數'])
        return days * 80
      },
      commutingCost () {
        const days = this.toNum(this.staff['交通天數'])
        return days * 50
      },
      subtotal () {
        const monthSalary = this.toNum(this.staff['月薪'])
        let subtotal =
          monthSalary +
          this.overTimePayPerDay +
          this.overTimePay(1.33) +
          this.overTimePay(1.67) +
          this.toNum(this.staff['全勤獎金']) +
          this.mealExpenses +
          this.commutingCost +
          this.toNum(this.staff['證照']) +
          this.toNum(this.staff['戒菸費']) +
          this.toNum(this.staff['點心費'])
        for (let i = 0; i < this.extColumnsArrs.length; i++) {
          let extPrice = this.toNum(this.staff[this.extColumnsArrs[i]])
          if (extPrice > 0) subtotal += extPrice
        }
        return subtotal
      },
      total () {
        let total = this.subtotal + this.toNum(this.staff['勞保費']) + this.toNum(this.staff['健保費']) + this.toNum(this.staff['仲介費'])
        for (let i = 0; i < this.extColumnsArrs.length; i++) {
          let extPrice = this.toNum(this.staff[this.extColumnsArrs[i]])
          if (extPrice < 0) total += extPrice
        }
        return total
      },
      replaceCommit () {
        return this.staff['備註'] === '待輸入' ? ' ' : this.staff['備註']
      }
    },
    methods: {
      toNum (string) {
        return Number(string)
      },
      overTimePay (ratio) {
        const monthSalary = this.toNum(this.staff['月薪'])
        if (ratio === 1.33) {
          const times = this.toNum(this.staff['加班1.33時數'])
          console.log(times)
          return Math.ceil((monthSalary / 30 / 8) * times * ratio)
        } else {
          const times = this.toNum(this.staff['加班1.66時數'])
          return Math.ceil((monthSalary / 30 / 8) * times * ratio)
        }
      }
    }
  }
</script>

