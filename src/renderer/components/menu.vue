<template>
  <div class="menu">
    <div class="menu__logo">
      
      <h1 class="menu__logo__title">薪資系統</h1>
	  </div>
    <img src="../assets/—Pngtree—flowers and butterflies_3412191.png" alt="" style="height: auto;width: 1.4rem;margin: .1rem auto;">
    <h2>{{ currentDate }}</h2>
    
    <router-link :to="{path: '/' + currentDate}">
      <div class="menu--btn">
        <p>概況</p>
      </div>
    </router-link>

    <router-link :to="{path: '/datakeyin/' + currentDate}">
    <div class="menu--btn">
      <p>資料輸入</p>
    </div>
    </router-link>

    <router-link :to="{path: '/payrolls/' + currentDate}">
    <div class="menu--btn">
      <p>薪資條</p>
    </div>
    </router-link>
  </div>
</template>
<script>
import bus from '../eventBus'
export default {
  mounted () {
    bus.$on('changedCurrentDate', (date) => {
      this.currentDate = date
    })
  },
  data () {
    return {
      currentDate: null
    }
  }
}
</script>
<style lang="scss">
  .menu {
    background-color: #2B343B;
    color: rgb(149, 154, 157);
    height: 100%;
		width: 100%;
    display: flex;
    flex-direction: column;
		font-size: .2rem;
		align-items: center;
    &__logo {
      width: 100%;
      margin-top: .2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: .2rem auto;
      &__title {
        font-size: .3rem;
        margin-left: .1rem;
      }
      & img {
        height: .3rem;
        width: .3rem;
      }
    }
    &--btn {
		  color: rgb(120, 120, 120);
			padding: .1rem .1rem .1rem .2rem;
      margin: 0;
      width: 100%;
      text-align: left;

      &:hover {
        color: #333;
        opacity: .95;
        background-color: #ACC1D2;
      }
		}
    & a {
      text-decoration: none;
      display: block;
      width: 90%;
    }
    & h2 {
      font-size: .25rem;
      margin: .2rem auto;
    }
  }
</style>


