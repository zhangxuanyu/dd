<template>
  <div>
     <img src="../../static/notfound-image.png" alt="">
  </div>
</template>

<script>
export default {
  mounted(){
      console.log(window.innerHeight)
      var out = document.getElementsByTagName('div')
      console.log(out[0])
      out[0].style.marginTop = 0.25*window.innerHeight + 'px'
  }
}
</script>

<style scoped>
  div{
    width: 280px;
    height: 280px;
    margin: 0 auto;
    text-align: center;
    line-height: 100px;
    font-size: 28px;
  }
  div img{
    height: 280px;
    width: 280px;
  }
</style>