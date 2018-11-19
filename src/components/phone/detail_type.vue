<template>
    <div class="top">
        <div class="report_long">
            <div v-for="(item,index) in mearr" :key="index" class="top_type" @click="changesel(index)">
                <div :style="select == index?{color:'#2a79f9',fontWeight:'600'}:{}">
                    {{item.word[$store.state.alllang]}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      mearr: [
        { word: ["应用详情", "Details"] },
        {
          word: ["用户分析", "User"]
        },
        {
          word: ["交易数据", "Transaction Data"]
        },
        { word: ["合约调用", "Transactions"] }
      ],
      select:0
    };
  },
  created(){
      console.log(this.$route.path)
      if(this.$route.path == '/detail'){
          this.select = 0
      }else if(this.$route.path == '/user'){
          this.select = 1
      }else if(this.$route.path == '/trade'){
          this.select = 2
      }else if(this.$route.path == '/usedapp'){
          this.select = 3
      }
  },
  mounted(){
      setTimeout(()=>{
          var long_length = 0
        this.mearr.forEach((e,index) => {
            long_length = long_length + $('.top_type')[index].offsetWidth + 1
        });
        console.log(long_length)
        $('.report_long')[0].style.width = long_length + 20+'px'
      },100)
      
  },
  methods:{
      changesel(index){
          this.select = index
          if(index == 0){
              this.$router.push({ path: "/detail?id=" + this.$store.state.appid });
          }else if(index == 1){
              this.$router.push({ path: "/user?id=" + this.$store.state.appid });
          }else if(index == 2){
              this.$router.push({ path: "/trade?id=" + this.$store.state.appid });
          }else if(index == 3){
              this.$router.push({ path: "/usedapp?id=" + this.$store.state.appid });
          }
      }
  }
};
</script>

<style scoped>
.top{
    /* position: fixed;
    left: 0; */
    height: 1rem;
    padding: 0.3rem 0;
    box-sizing: border-box;
    background-color: #fff;
    font-size: 0.3rem;
	color: #5d5d63;
    overflow-x: scroll;
    margin: 0 -0.3rem;
}
.report_long{
    overflow: hidden;
    height: 0.4rem;
}
.top_type{
    float: left;
    padding: 0 0.3rem;
    border-right: 1px solid #d6dee6;
    box-sizing: border-box;
}
.top_type:nth-last-of-type(1){
    border: 0;
}
</style>
