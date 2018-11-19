<template>
    <div>
        <go-search class="top"></go-search>
        <the-menu class="menu"></the-menu>
        <!-- <my-load v-if="$store.state.loadflag"></my-load> -->
        <my-pic v-if="$store.state.picshowflag"></my-pic>
        <router-view  class="cont"/>
        <the-foot class="foot"></the-foot>
    </div>
</template>

<script>
import goSearch from './gosearch'
import theMenu from './menu'
import theFoot from './allfoot'
import myLoad from './loading';
import myPic from './picture'
export default {
    components:{
                goSearch,
                theMenu,
                theFoot,
                myLoad,
                myPic
            },
  
    
            
}
</script>

<style scoped>
.top{
    position: fixed;
    top: 0px;
    left:0px;
    z-index: 102;
}
.menu{
    margin-right: 10px;
    position: fixed;
    top: 0px;
    left: 0px;
    z-index: 999;
}
.cont{
    overflow: hidden;
}
.foot{
    box-sizing: border-box;
    margin-top: 60px;
}
</style>

