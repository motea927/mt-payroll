<template>
  <div class="overview">
    <div class="overview__titlebar">
      <h1 class="overview__titlebar__text">概況</h1>
      <button>新增資料 +</button>
    </div>
    <hr>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss">
  .overview {
    height: 100%;
    &__titlebar {
      display: flex;
      align-items: center;
      height: .50rem;
      margin: .2rem;
      &__text {
        margin-right: .2rem;
      }
      & button {
        width: .90rem;
        height: .30rem;
        border: none;
        background-color: #4971FF;
        color: #FFFFFF;
        border-radius: .20rem;
      }
    }
  }
</style>

