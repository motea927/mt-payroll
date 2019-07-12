<template>
  <div class="titlebar">
    <div class="titlebar__info">
      <img src="../assets/cbmy1-idemm.png" alt="">
      <p>mtPayroll v1.0.0</p>
    </div>
    <div class="titlebar__control">
      <div class="titlebar__control--btn" id="titlebar__control--min"></div> 
      <div class="titlebar__control--btn" id="titlebar__control--max"></div> 
      <div class="titlebar__control--btn" id="titlebar__control--close"></div> 
    </div>
  </div>
</template>

<script>
  export default {
    mounted () {
      const remote = require('electron').remote
      let window = remote.getCurrentWindow()
      let isMaximized = false
      // min click event
      document.getElementById('titlebar__control--min').addEventListener('click', function (e) {
        window.minimize()
      })
      // max click event
      document.getElementById('titlebar__control--max').addEventListener('click', function (e) {
        if (!isMaximized) {
          window.maximize()
          isMaximized = true
        } else {
          window.unmaximize()
          isMaximized = false
        }
      })
      // close click event
      document.getElementById('titlebar__control--close').addEventListener('click', function (e) {
        window.close()
      })
    }
  }
</script>

<style lang="scss">

  .titlebar {
    display: flex;
    align-items: center;
    height: .3rem;
    width: 100%;
    background-color: rgba(232,232,237,.85);
    -webkit-user-select: none;
    -webkit-app-region: drag;
    border-top-left-radius: 0.05rem;
    border-top-right-radius: 0.05rem;
    &__info {
      height: 100%;
      display: flex;
      align-items: center;
      & img {
        margin: 0 .05rem;
        height: 80%;
        width: auto;
      }
    }
    &__control {
      margin-left: auto;
      display: flex;
      &--btn {
        width: .17rem;
        height: .17rem;
        border-radius: 999em;
        margin: 0 .05rem;
        -webkit-app-region: no-drag;
        text-align: center;
        line-height: .17rem;
        font-size: .13rem;
        font-weight: 900;
      }
      &--btn:hover {
        opacity: .95;
      }
    }
  }

  #titlebar__control {
    &--min {
      background-color: rgb(232, 200, 73);
      &:hover::before {
        content: "\2014";
        color: rgb(205, 169, 59);
      }
    }
    &--max {
      background-color: rgb(53, 203, 75);
      &:hover::before {
        content: "\271A";
        color: rgb(115, 143, 64);
      }
    }
    &--close {
      background-color: rgb(252, 98, 93);
      &:hover::before {
        content: "\2716";
        color: rgb(121, 48, 34);
      }
    }

  }
</style>


