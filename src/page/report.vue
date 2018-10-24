<template>
    <div class="cont" :style="{marginLeft:theleft,minWidth: '1150px'}">
      <p class="title"></p>
        <!-- 研究报告 -->
        <div class="report_box">
          <div class="out_report" v-for="(item,index) in reportarr" :key="index" @click="gotoreport(index)">
           <div class="report_in"  >
                    <div class="content_img" :style="{background: 'url('+item.img_report+') no-repeat',backgroundSize:'cover'}">

                    </div>
                    <p>
                        {{item.title[$store.state.alllang]}}
                    </p>
                    <p>
                        {{item.time}}
                    </p>
                </div>
         </div>
        </div>
         
                
            
    </div>
</template>

<script>
import Axios from "axios";

export default {
  data() {
    return {
      reportarr:[],
      theleft: "265px",
      blocktitle: [
        ["研究报告", "report"]
      ]
    };
  },
  created() {
    this.reportarr = pdfarr
    this.cglf(this.$store.state.themenuflag);
    //loading初始化
    this.$store.commit("changeloadopacty", true);
    this.$store.commit("changeloadflge", true);
  },
  mounted() {
    const that = this;
  },
  computed: {
    inleft() {
      return this.$store.state.themenuflag;
    }
  },
  watch: {
    inleft(n, o) {
      console.log(n);
      this.cglf(n);
    },
  },
  methods: {
    //鼠标按下移动事件
    cglf(n) {
      if (n) {
        this.theleft = "265px";
      } else {
        this.theleft = "85px";
      }
    },
    gotoreport(id){
      const {href} = this.$router.resolve({
                name: 'pdf',
                path:'/pdf',
                query: {
                  id:id,
                  lang:this.$store.state.alllang
                }
              })
        window.open(href, '_blank')
    }
    
    
  }
};
</script>

<style scoped>
.cont {
  margin-left: 330px;
  margin-top: 50px;
  transition: all 0.5s;
}
.title{
  margin-top: 45px;
  margin-bottom: 20px;
  text-align: left;
  font-size: 20px;
	color: #525864;
  font-weight: 600;
}
.report_box{
  overflow: hidden;
  margin-right: 15px;
  min-height: 697px;
}
.out_report{
  width: 25%;
  float: left;
}
.report_in{
    cursor: pointer;
    height: 210px;
    width: 260px;
    background-color: #fff;
    overflow: hidden;
    margin: 0 auto;
    margin-bottom: 30px;
    box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
}
.content_img{
    width: 260px;
    height: 157px;
    margin-bottom: 5px;
}
.report_in p{
    font-size: 14px;
    line-height: 22px;
    padding: 0 20px;
    text-align: left;
}
.report_in p:nth-of-type(1){
    color: #464a58;
}
.report_in p:nth-of-type(2){
    color: #797b8e;
}



</style>

