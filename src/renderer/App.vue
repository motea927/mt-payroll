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

<style>
  *{
    margin:0px;
    padding:0px;
    box-sizing:border-box;
    -webkit-box-sizing:border-box;
    -moz-box-sizing:border-box;
    -o-box-sizing:border-box;
    -ms-box-sizing:border-box;
    overflow: hidden;
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
    height: 100vh;
    /*justify-content: space-between;*/
  }
  .leftside {
    width: 1.7rem;
  }
  .rightside {
    width: 100%;
  }
</style>
