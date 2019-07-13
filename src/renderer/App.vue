<template>
  <div id="app">
    <app-toolbox></app-toolbox>
    <main>
      <div class="leftside">
        <app-Menu></app-Menu>
      </div>
      <div class="rightside">
        <router-view></router-view>
      </div>
    </main>
  </div>
</template>

<script>
  import appMenu from './components/menu'
  import appToolbox from './components/toolbox'
  export default {
    components: {appMenu, appToolbox}
  }
</script>

<style lang="scss">
  *{
    margin:0px;
    padding:0px;
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    -o-box-sizing:border-box;
    -ms-box-sizing:border-box;
    overflow: visible;
  }
  html, body {
    width: 100%;
    height: 100%;
    font-size: 625%;
    font-family: "Helvetica", "Arial","LiHei Pro","黑體-繁","微軟正黑體", sans-serif;
    border-radius: .05rem;
  }
  h1 {
    font-size: .4rem;
  }
  p {
    font-size: .16rem;
  }
  main {
    display: flex;
    min-height: calc(100vh - .3rem);
    background-color: #ffffff;
    /*justify-content: space-between;*/
  }
  .leftside {
    width: 1.7rem;
  }
  .rightside {
    width: calc(100% - 1.7rem);
  }
  .close {
    display: inline-block;
    margin: 0 auto;
    height: .25rem;
    width: .25rem;
    color: rgb(51, 51, 51);
    cursor: pointer;
    &:hover {
      opacity: .8;
    }
    &::before {
      content: "\2716";
    }
  }
  .hr--white {
    margin: .2rem auto;
    border: 0;
    height: .01rem;
    background-image: linear-gradient(to right, rgba(255,255,255,0.75), rgba(255,255,255,1), rgba(255,255,255,0.75));
    width: 80%;
  }
  .btn {
    margin: .1rem;
    width: .90rem;
    height: .30rem;
    border: none;
    border-radius: .20rem;
    &:hover {
      cursor: pointer;
    }

    &--blue {
      background-color: #4971FF;
      color: #FFFFFF;
    }
    &--white {
      border: .01rem solid #4971FF;
      background-color: #FFFFFF;
      color: #4971FF;
    }
  }
</style>
