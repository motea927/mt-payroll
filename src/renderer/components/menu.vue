<template>
  <div class="menu">
    <div class="menu__logo">
      <img src="../assets/cbmy1-idemm.png" alt="menu__logo">
      <h1 class="menu__logo__title">薪資系統</h1>
	  </div>
    <h2>{{ currentDate }}</h2>
    <hr class="hr--white">
    <div class="menu--btn">
      <p>概況</p>
    </div>
    <div class="menu--btn">
      <p>資料輸入</p>
    </div>
    <div class="menu--btn">
      <p>薪資條</p>
    </div>
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
    background-color: rgb(51, 51, 51);
    color: white;
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
        font-size: .2rem;
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
      width: 90%;
      text-align: left;

      &:hover {
        color: white;
        opacity: .95;
        background-color: rgb(73, 111, 255);
      }
		}
  }
  h2 {
    font-size: .20rem;
  }
</style>


