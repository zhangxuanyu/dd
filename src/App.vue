<template>
  <div id="app">
    
    <router-view/>
  </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';

export default {
  name: 'App',
  beforeCreate(){
    if ((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
  /*window.location.href="你的手机版地址";*/
  document.documentElement.style.fontSize = `${document.documentElement.clientWidth / 750 *100}px`;
} else {
  /*window.location.href="你的电脑版地址";    */
 
}
    
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
p{
  padding: 0;
  margin: 0;
}
ul,li{ padding:0;margin:0;list-style:none}
.cur{
  cursor: pointer;
}
</style>
