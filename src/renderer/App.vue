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
    font-weight: 200;
  }
  h2 {
    font-weight: 200;
  }
  p {
    font-size: .19rem;
  }
  main {
    display: flex;
    background-color: #ffffff;
    min-height: 100%;
    z-index: 50;
    /*justify-content: space-between;*/
  }
  #app {
    height: 100%;
  }
  .leftside {
    width: 1.7rem;
  }
  .rightside {
    width: calc(100% - 1.7rem);
  }
  .leftside, .rightside {
    padding-top: .3rem;
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
  .btn {
    margin: .1rem;
    width: .90rem;
    height: .30rem;
    border: none;
    border-radius: .20rem;
    font-size: .15rem;
    &:hover {
      cursor: pointer;
    }

    &--blue {
      
      background-color: #758293;
      color: #FFF;
      &:hover {
        opacity: .95;
      }
    }
    &--white {
      border: .01rem solid #ACC1D2;
      background-color: #FFFFFF;
      color: rgb(112, 122, 131);
      &:hover {
        opacity: .9;
      }
    }
  }
  .hr {
    &--one {
      border: 0;
      height: 1px;
      background: rgba(112, 122, 131, .2);
      background-image: linear-gradient(to right, #ccc, rgba(112, 122, 131, .2), #ccc);
    }
  }
</style>
