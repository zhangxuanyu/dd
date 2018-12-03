<template>
    <div class="top"  id="target">
        <div class="report_long" >
            <div v-for="(item,index) in mearr" :key="index" class="top_type" @click="changesel(index)" v-if="$store.state.appid!='steem'||index != 4">
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
        { 
            word: ["公链详情", "Details"] 
        },
        {
            word: ["用户分析", "User"]
        },
        {
            word: ["交易数据", "Transaction Data"]
        },
        { 
            word: ["合约调用", "Transactions"] 
        },
        { 
            word: ["Dapp数据", "Dapp Data"] 
        }
      ],
      select:0
    };
  },
  created(){
      console.log(this.$route.path)
      
  },
  mounted(){
      setTimeout(()=>{
          var long_length = 0
        this.mearr.forEach((e,index) => {
            long_length = long_length + $('.top_type')[index].offsetWidth + 1
        });
        console.log(long_length)
        $('.report_long')[0].style.width = long_length + 20+'px'



        if(this.$route.path == '/chaindetail'){
          this.select = 0
      }else if(this.$route.path == '/chainuser'){
          this.select = 1
      }else if(this.$route.path == '/chaintrade'){
          this.select = 2
      }else if(this.$route.path == '/chainusedapp'){
          this.select = 3
          $("#target").scrollLeft(100);
      }else if(this.$route.path == '/chaindapp'){
        this.select = 4
        $("#target").scrollLeft(200);
          
          
      }
      },100)

      
      
  },
  methods:{
      changesel(index){
          this.select = index
          if(index == 0){
              this.$router.push({ path: "/chaindetail?id=" + this.$store.state.appid });
          }else if(index == 1){
              this.$router.push({ path: "/chainuser?id=" + this.$store.state.appid });
          }else if(index == 2){
              this.$router.push({ path: "/chaintrade?id=" + this.$store.state.appid });
          }else if(index == 3){
              this.$router.push({ path: "/chainusedapp?id=" + this.$store.state.appid });
          }else if(index == 4){
              this.$router.push({ path: "/chaindapp?id=" + this.$store.state.appid });
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
