<template>
    <div class="cont" id="allout" :style="{marginLeft:theleft,minWidth: '1144px'}">
        <!-- 币种 -->
        <p class="new">
            <span>{{blocktitle[0][$store.state.alllang]}}</span>
            <span @click="gotoother(1,'')">{{blocktitle[3][$store.state.alllang]}} ></span>
        </p>
        <div class="card_flex">

            <div class="card cur" v-for="(item,index) in arr" :style="{width:cdwd}" :key="index" @click="gotoother(5,item.word.toLowerCase())">


                <p class="title">{{item.word}} 
                  <!-- <span v-if="index == 1" style="color:rgb(73, 165, 251);font-size:14px;font-weight:400;">(beta)</span>  -->
                  </p>
                <div class="dappnum">{{dappnumtips[$store.state.alllang]}}：{{item.num}}</div>
                <div  class="card_out">
                    <div v-for="(it,inde) in item.data" class="card_in" :key="inde">
                        <p class="subtitle"><img :src="inde == 1?it.img:''" alt="" :style="index == 2?{position:'absolute',top:'-1px',left:'0px'}:index == 1?{position:'absolute',top:'-1px',left:'5px',width:'20px'}:{position:'absolute',top:'-1px',left:'5px'}">{{it.word[$store.state.alllang]}}</p>
                        <p class="tips">{{inde == 1?'(K)':'&nbsp;'}}</p>
                        <p class="numbers">{{it.num}}</p>
                        <p class="subtitle" :style="it.add > 0?{color:'#1ccfa7'}:it.add < 0?{color:'#f85e70'}:{color: 'rgb(167, 174, 182);'}">
                        <img src="../../static/up.png" alt="" v-if="it.add > 0" class="mgt">
                        <img src="../../static/down.png" alt="" v-if="it.add < 0" class="mgt" >
                        {{it.add>0?'+'+it.add:it.add}}%
                        </p>
                    </div>
                </div>
            </div>
        </div>
        <!-- 热门dapp -->
        <p class="hot">
            <span>{{blocktitle[1][$store.state.alllang]}}</span>
            <span @click="gotoother(2,'')">{{blocktitle[3][$store.state.alllang]}} ></span>
        </p>
        <div class="hotdapp">
            <div v-for="(item,index) in hotarr" :key="index" class="hotbox" @click="gotoother(4,item.dapp_id)">
                <div class="hot_content cur">
                    <div class="hot_left">
                        <div class="left_img" >
                          <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.dapp_id+'.jpg'" alt="" onerror="javascript:this.src='../../static/all1.png'" style="width:50px;height:50px;float:left;">
                        </div>
                        <p style="overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;">{{item.en_cn[$store.state.alllang].title}}</p>
                        <p>{{item.blockchain.toUpperCase()}}&nbsp;|&nbsp;{{item.category}}</p>
                    </div>
                    <div class="hot_right">
                        <div class="hot_right_left">
                            <p>{{blocktitle[4][$store.state.alllang]}}</p>
                            <p> &nbsp; </p>
                            <p>{{item.new_user}}</p>
                            <p :style="item.new_user_rate>0?{color:'#1ccfa7'}:item.new_user_rate<0?{color:'#f85e70'}:{color:'#797b8e'}">
                                <img src="../../static/up.png" alt="" class="mgt" v-if="item.new_user_rate>0">
                                <img src="../../static/down.png" alt="" class="mgt" v-if="item.new_user_rate<0">
                                {{(item.new_user_rate*100).toFixed(3)}}%
                            </p>
                        </div>

                        <div class="hot_right_left">
                            <p>{{blocktitle[5][$store.state.alllang]}}</p>
                            <p> &nbsp; </p>
                            <p>{{item.active_user}}</p>
                            <p :style="item.active_user_rate>0?{color:'#1ccfa7'}:item.active_user_rate<0?{color:'#f85e70'}:{color:'#797b8e'}">
                                <img src="../../static/up.png" alt="" class="mgt" v-if="item.active_user_rate>0">
                                <img src="../../static/down.png" alt="" class="mgt" v-if="item.active_user_rate<0">
                                {{(item.active_user_rate*100).toFixed(3)}}%
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
        
         

        <!-- 研究报告 -->
         <!-- <p class="report">
            <span>{{blocktitle[2][$store.state.alllang]}}</span>
            <span @click="gotoother(3)">{{blocktitle[3][$store.state.alllang]}} ></span>
         </p>
         <div class="swiper-container report_out">
            <div class="swiper-wrapper report_long" >
                <div class="swiper-slide report_in"  v-for="(item,index) in reportarr" :key="index" @click="gotoother(6,index)" style="width:320px;">
                  
                    <div class="content_img" :style="{background: 'url('+item.img_index+') no-repeat',backgroundSize:'cover'}">

                    </div>
                    <p>
                        {{item.title[$store.state.alllang]}}
                    </p>
                    <p>
                        {{item.time}}
                    </p>
                  
                </div>
            </div>
        </div> -->
    </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
import Axios from "axios";
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  data() {
    return {
      //公链数据
      chainarr:[
        ["活跃用户", "Active Users"],
        ["交易量", "Volume"],
        ["调用次数", "Transactions"]
      ],
      chainallarr:[
        {
          "vol": 168779.44533753,
          "call_rate": -0.0005496015388843089,
          "call": 3637,
          "active_user": 91,
          "active_user_rate": -0.010869565217391304,
          "dapp_num": 977,
          "vol_rate": -0.00849117658568601,
          "blockchain": "eth",
          "flag":""
        },{
          "vol": 168779.44533753,
          "call_rate": -0.0005496015388843089,
          "call": 3637,
          "active_user": 91,
          "active_user_rate": -0.010869565217391304,
          "dapp_num": 977,
          "vol_rate": -0.00849117658568601,
          "blockchain": "eos",
          "flag":"beta"
        },{
          "vol": 168779.44533753,
          "call_rate": -0.0005496015388843089,
          "call": 3637,
          "active_user": 91,
          "active_user_rate": -0.010869565217391304,
          "dapp_num": 977,
          "vol_rate": -0.00849117658568601,
          "blockchain": "nas",
          "flag":""
        }
      ],
      arr: [
        {
          word: "ETH",
          num: 0,
          data: [
            {
              img: "../../static/ETH-1.png",
              word: ["活跃用户", "Active Users"],
              num: "",
              add: ""
            },
            {
              img: "../../static/ETH-1.png",
              word: ["交易量", "Volume"],
              num: "",
              add: ""
            },
            {
              img: "../../static/ETH-1.png",
              word: ["调用次数", "Transactions"],
              num: "",
              add: ""
            }
          ]
        },
        {
          word: "EOS",
          num: 0,
          data: [
            {
              img: "../../static/EOS-1.png",
              word: ["活跃用户", "Active Users"],
              num: "",
              add: ""
            },
            {
              img: "../../static/EOS-1.png",
              word: ["交易量", "Volume"],
              num: "",
              add: ""
            },
            {
              img: "../../static/EOS-1.png",
              word: ["调用次数", "Transactions"],
              num: "",
              add: ""
            }
          ]
        },
        {
          word: "TRON",
          num: 0,
          data: [
            {
              img: "../../static/TRON-1.png",
              word: ["活跃用户", "Active Users"],
              num: "",
              add: ""
            },
            {
              img: "../../static/TRON-1.png",
              word: ["交易量", "Volume"],
              num: "",
              add: ""
            },
            {
              img: "../../static/NAS-1.png",
              word: ["调用次数", "Transactions"],
              num: "",
              add: ""
            }
          ]
        }
      ],
      hotarr:[],
      //图表数组 
      theleft: "280px",
      cdwd: "",
      clientHeight: 0,
      // 图表文字切换
      dappnumtips: ["Dapps数量", "Dapps"],
      blocktitle: [
        ["热门公链", "HOT Chains(24H)"],
        ["热门Dapp", "HOT Dapps(24H)"],
        ["研究报告", "Report"],
        ["查看全部","more"],
        ["新增用户数","New Users"],
        ["活跃用户数","Active Users"]
      ],
      //报告数据
      reportarr:[],
      //allout宽度
      alloutwidth:''
    };
  },
  created() {
    this.reportarr = pdfarr
    console.log(this.reportarr)

    this.fornew(true);
    this.fornewdapp()

    this.cglf(this.$store.state.themenuflag);
    var bbc = window.innerWidth;
    console.log(parseInt(this.theleft));
    this.cdwd = (bbc - parseInt(this.theleft) - 110) / 3 + "px";
    console.log(bbc - parseInt(this.theleft) - 90);
    //loading初始化
    this.$store.commit("changeloadopacty", true);
    this.$store.commit("changeloadflge", true);

  },
  mounted() {
    console.log('==========='+this.$store.state.alllang)
    console.log('==========='+this.alllang)
    var mySwiper = new Swiper('.swiper-container', {      
        slidesPerView:"auto"
    })
    const that = this;

    that.alloutwidth = document.getElementById('allout').offsetWidth
    

    $(window).on("resize", function() {
      that.clientHeight = document.body.clientWidth;
      that.alloutwidth = document.getElementById('allout').offsetWidth
    });
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

      var movehot = setInterval(()=>{
        this.alloutwidth = document.getElementById('allout').offsetWidth
      },17)
      
      setTimeout(()=>{
        clearInterval(movehot)
      },500)
      
    },
    clientHeight(val, o) {
      var bbc = window.innerWidth;
      this.cdwd = (bbc - parseInt(this.theleft) - 110) / 3 + "px";
    },
    alloutwidth(n,o){
      this.changestyle(n)
    }
  },
  methods: {
    //改变hotdapp样式
    changestyle(n){
      console.log('------------------changestyle111111----------------')
      console.log(n)
        if(n<=1200){
        var stylearr = document.getElementsByClassName('hotbox')
        console.log(stylearr)
        for(let i = 0;i < stylearr.length;i++){
          stylearr[i].style.width = '50%';
          if(i%2 == 0){
            stylearr[i].style.paddingLeft = '0';
            stylearr[i].style.paddingRight = '15px';
          }else{
            stylearr[i].style.paddingLeft = '15px';
            stylearr[i].style.paddingRight = '0';
          }
        }
        
      }else{
        var stylearr = document.getElementsByClassName('hotbox')
        console.log(stylearr)
        for(let i = 0;i < stylearr.length;i++){
          stylearr[i].style.width = '33.33%';
          if(i%3 == 0){
            stylearr[i].style.paddingLeft = '0';
            stylearr[i].style.paddingRight = '20px';
          }else if(i%3 == 1){
            stylearr[i].style.paddingLeft = '10px';
            stylearr[i].style.paddingRight = '10px';
          }else{
            stylearr[i].style.paddingLeft = '20px';
            stylearr[i].style.paddingRight = '0';
          }
        }
      }
    },
    gotoother(a,id){
      if(a == 1){
        this.$router.push({ path: "/chain" });
      }else if(a == 2){
        this.$router.push({ path: "/rank" });
      }else if(a == 3){
        this.$router.push({ path: "/report" });
      }else if(a == 4){
        this.$router.push({ path: "/detail?id="+id });
      }else if(a == 5){
        this.$router.push({ path: "/chaindetail?id="+id });
      }else if(a == 6){
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
    },
    //鼠标按下移动事件
    cglf(n) {
      if (n) {
        this.theleft = "280px";
      } else {
        this.theleft = "100px";
      }
      var bbc = window.innerWidth;
      this.cdwd = (bbc - parseInt(this.theleft) - 110) / 3 + "px";

    },
    fornew(aa) {
      console.log(this.$store.state.moneyty, this.$store.state.requesttime);
      var url = this.$store.state.requrlnew + "/hotchain";
      Axios.post(
        url,
        {
          "num":3,"order":"active_user"
          },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res.data.data);
        var rank_res_arr = []
        res.data.data.forEach(e => {
          if(e.blockchain == 'eth'){
            rank_res_arr[0] = e
          }else if(e.blockchain == 'eos'){
            rank_res_arr[1] = e
          }else if(e.blockchain == 'tron'){
            rank_res_arr[2] = e
          }
        });
        var numtimes = 1;
        if (aa) {
          var numroll = setInterval(() => {
            if (numtimes >= 89) {
              clearInterval(numroll);
            }
            numtimes++;
            this.arr[0].data[0].num = parseInt(
              (rank_res_arr[0].active_user / 90) * numtimes
            );

            this.arr[0].data[1].num = parseInt(
              (rank_res_arr[0].vol / 90000) * numtimes
            );

            this.arr[0].data[2].num = parseInt(
              (rank_res_arr[0].call / 90) * numtimes
            );

            this.arr[1].data[0].num = parseInt(
              (rank_res_arr[1].active_user / 90) * numtimes
            );

            this.arr[1].data[1].num = parseInt(
              (rank_res_arr[1].vol / 90000) * numtimes
            );

            this.arr[1].data[2].num = parseInt(
              (rank_res_arr[1].call / 90) * numtimes
            );

            this.arr[2].data[0].num = parseInt(
              (rank_res_arr[2].active_user / 90) * numtimes
            );

            this.arr[2].data[1].num = parseInt(
              (rank_res_arr[2].vol / 90000) * numtimes
            );

            this.arr[2].data[2].num = parseInt(
              (rank_res_arr[2].call / 90) * numtimes
            );
          }, 20);
        }

        var ddarr = [1,2,3]
        setTimeout(()=>{
          rank_res_arr.forEach((e,idx) => {
            this.arr[idx].word = e.blockchain.toUpperCase()
            this.arr[idx].num = e.dapp_num
            ddarr.forEach((el,index)=> {
              console.log(22222222222222222222222222)
              console.log(el)
              this.arr[idx].data[index].img = '../../static/'+e.blockchain.toUpperCase()+'-1.png'
              if(index === 0){
                this.arr[idx].data[index].num = (e.active_user).toFixed(0)
                this.arr[idx].data[index].add = (e.active_user_rate*100).toFixed(2)
              }else if(index === 1){
                this.arr[idx].data[index].num = (e.vol/1000).toFixed(0)
                this.arr[idx].data[index].add = (e.vol_rate*100).toFixed(2)
              }else if(index === 2){
                this.arr[idx].data[index].num = (e.call).toFixed(0)
                this.arr[idx].data[index].add = (e.call_rate*100).toFixed(2)
              }
              
  
            });
           
          });

        },1880)

        this.$store.commit("changeloadopacty", false);
      });
    },
    fornewdapp(){
      Axios.post(
        this.$store.state.requrlnew + "/hotdapp",
        {
          "num":9,
          "order":"active_user",
          "blockchain":"total"
         },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res)
        res.data.msg.data.forEach(element => {
          this.hotarr.push(element)
        });
        setTimeout(()=>{
          this.changestyle(this.alloutwidth)
        },50)
        
      })
    }
  }
};
</script>

<style scoped>
a{
  text-decoration: none;
}
.cont {
  margin-left: 330px;
  margin-top: 50px;
  transition: all 0.5s;
}
.card {
  min-width: 351px;
  height: 262px;
  background-color: #fff;
  /* float: left; */
  padding: 30px;
  box-sizing: border-box;
  margin-right: 30px;
  box-shadow: 3px 2px 10px 0px rgba(37, 48, 76, 0.08);
  position: relative;
}
.dappnum {
  position: absolute;
  top: 30px;
  right: 30px;
  background-color: #f7f8fa;
  height: 24px;
  line-height: 24px;
  font-size: 12px;
  color: #797b8e;
  padding: 0 20px;
  border-radius: 12px;
}
.alltitle {
  margin-top: 50px;
  text-align: left;
  font-size: 24px;
  color: #c1c7cd;
}
.card:nth-of-type(1) {
  /* background-image: url(../../static/ETH.png); */
  background-position: center center;
  background-repeat: no-repeat;
}
.card:nth-of-type(2) {
  /* background-image: url(../../static/EOS.png); */
  background-position: center center;
  background-repeat: no-repeat;
}
.card:nth-of-type(3) {
  /* background-image: url(../../static/NAS.png); */
  background-position: center center;
  background-repeat: no-repeat;
}
.new,.hot,.report {
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 20px;
  color: #525864;
  text-align: left;
  font-weight: 600;
  overflow: hidden;
}
.hot {
  margin-top: 30px;
}
.report{
    margin-top: 0px;
}
.new span:nth-last-of-type(1),.hot span:nth-last-of-type(1),.report span:nth-last-of-type(1){
    float: right;
    margin-right: 30px;
    cursor: pointer;
    font-size: 16px;
	color: #acb0bb;
}
.new span:nth-last-of-type(2),.hot span:nth-last-of-type(2),.report span:nth-last-of-type(2){
    float: left;
}
.card_flex {
  display: flex;
  justify-content: space-between;
}
.card_out {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.card_in {
  width: 97px;
  text-align: center;
}
.title {
  font-size: 18px;
  color: #212229;
  font-weight: 600;
  margin-bottom: 40px;
  text-align: left;
}
.tips {
  font-size: 12px;
  color: #797b8e;
  margin-bottom: 30px;
}
.subtitle {
  color: #797b8e;
  font-size: 14px;
  position: relative;
}
.numbers {
  font-size: 20px;
  color: #464a58;
  margin-bottom: 20px;
}
.mgt {
  vertical-align: -1px;
}
.hotdapp{
    margin-right: 30px; 
    overflow: hidden;
}
.hotbox{
    height: 176px;
    width: 33.33%;
    box-sizing: border-box;
    float: left;
    margin-bottom: 30px;
}
.hot_content{
    background-color: #fff;
    height: 176px;
    box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
        position: relative;
}
.hot_left{
    position: absolute;
    top: 0px;
    left: 0px;
    width: 170px;
    border-right: 1px solid #eff3f5;
    padding: 30px;
    box-sizing: border-box;
}
.left_img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin: 0 auto;
    margin-bottom: 20px;
    overflow: hidden;
}

.hot_left p:nth-of-type(1){
    font-size: 16px;
	color: #464a58;
    margin-bottom: 15px;
}
.hot_left p:nth-of-type(2){
    font-size: 12px;
	color: #797b8e;
}
.hot_right{
    margin-left: 170px;
    height: 176px;
    overflow: hidden;
}
.hot_right_left{
    float: left;
    width: 50%;
    padding: 35px 0px;
}
.hot_right_left p:nth-of-type(1),.hot_right_left p:nth-of-type(2){
    font-size: 14px;
	line-height: 18px;
	color: #797b8e;
}
.hot_right_left p:nth-of-type(2){
    font-size: 12px;
    margin-bottom: 6px;
}
.hot_right_left p:nth-of-type(3){
    font-size: 20px;
	line-height: 24px;
	letter-spacing: 1px;
	color: #464a58;
    margin-bottom: 24px;
}
.hot_right_left p:nth-of-type(4){
    font-size: 14px;
	letter-spacing: 0px;
	color: #1ccfa7;
}
.hot_right_right{
    float: right;
}
.hotbox:nth-of-type(3n){
    padding-left: 20px;
}
.hotbox:nth-of-type(3n+1){
    padding-right: 20px;
}
.hotbox:nth-of-type(3n+2){
    padding-right: 10px;
    padding-left: 10px;
}



.report_out{
    width: 100%;
    height: 230px;
}
.report_long{
    overflow: hidden;
    width: 3000px;
    height: 230px;
}
.report_in{
    cursor: pointer;
    height: 220px;
    background-color: #fff;
    margin-right: 30px;
    float: left;
    box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
}
.content_img{
    width: 320px;
    height: 166px;
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
.report_out::-webkit-scrollbar {
  width: 0px;
  height: 0px;

  background-color: #c1c1c1;
}
.report_out::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f1f1f1;
}
.report_out::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #c1c1c1;
}


.picture {
  width: 100%;
  height: 500px;
  background-color: #fff;
  margin-top: 30px;
  float: right;
  margin-right: 30px;
  padding: 27px 30px 30px 60px;
  box-sizing: border-box;
  box-shadow: 3px 2px 10px 0px rgba(37, 48, 76, 0.08);
}
.left {
  float: left;
}
.lefttips {
  color: #212229;
  font-weight: 600;
  font-size: 16px;
}
.righttype {
  color: #808c9b;
  font-size: 14px;
  line-height: 24px;
  /* width:80px; */
  padding: 0 20px;
  height: 24px;
}
.right {
  float: right;
  margin: 0 15px;
}
#mychart {
  width: 100%;
  height: 500px;
}
</style>

