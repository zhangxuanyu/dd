<template>
    <div  class="out" :style="{minHeight:geth,marginLeft:mglf,minWidth:'1000px'}" >
        <chain-menu class="leftme" :style="{left:open}"></chain-menu>
        <div class="contright" v-if="arr.blockchain">
            <!-- dapp介绍 -->
            <div class="dapp" style="">
                <p class="preview">{{ttarr[0][$store.state.alllang]}}</p>
                <p class="chain_content">{{arr.description[$store.state.alllang]}}</p>
                <p class="preview">{{ttarr[1][$store.state.alllang]}}</p>
                <div class="info">
                        <div  style="line-height:30px;font-size:14px;" class="cur base" v-for="(item,index) in infoarr" :key="index">
                            <a :href="item" target="_black" rel="noopener noreferrer">
                                <img :src="infopicarr[index]" alt=""> {{ttarr[2+index][$store.state.alllang]}} 
                                <div class="go"></div>
                            </a>
                            <span :style="index == 0?{verticalAlign:'2px',marginLeft:'30px',marginRight:'30px',color:'#d6dee6'}:{verticalAlign:'2px',marginLeft:'30px',marginRight:'30px',color:'#d6dee6',opacity:0}" >|</span>
                        </div>
                </div>

                <!-- <div class="tableout"> 
                    <table width="100%" cellspacing='0' style="text-align: center;">
                        <tr>
                            <th style="width:300px;" class="title">{{ttarr[4][$store.state.alllang]}}</th>
                            <th  class="title">{{ttarr[5][$store.state.alllang]}}</th>
                        </tr>
                        <tr v-for="(item,index) in reqarr" :key="index" v-if="index<=ctra">
                            <td class="all">333333</td>
                            <td class="all">444444</td>
                        </tr>
                    </table>
                    <div class="showcontract cur" @click="showctr">
                        {{ttarr[6][$store.state.alllang]}} 
                    </div>
                </div>       -->
            </div>
            
            <!-- 24小时概况 -->
            <div class="dapp" style="">
                <p class="preview">{{ttarr[7][$store.state.alllang]}}</p>
               <div v-for="(item,index) in dayarr" :key="index" class="daydata">
                   <p>{{item.title[$store.state.alllang]}}</p>
                   <p>(24h)</p>
                   <p>{{item.value.toFixed(0)}}</p>
                   <p :style="item.rate>0?{color:'#1ccfa7'}:item.rate<0?{color:'#f85e70'}:{color:'#797b8e'}"><img :src="item.rate>0?'../../static/up.png':item.rate<0?'../../static/down.png':''" alt=""> {{item.rate.toFixed(5)}}%</p>
               </div>
            </div>

            <!-- 热门dapp -->
        <p class="hot">
            <span>{{ttarr[8][$store.state.alllang]}}</span>
            <span @click="gotodapp(1,'')">{{ttarr[9][$store.state.alllang]}} ></span>
        </p>

           <div class="hotdapp">
            <div v-for="(item,index) in hotarr" :key="index" class="hotbox" @click="gotodapp(2,item.dapp_id)" v-if="hotarr.length>0">
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
                            <p>{{blocktitle[0][$store.state.alllang]}}</p>
                            <p>(24h)</p>
                            <p>{{item.new_user}}</p>
                            <p :style="item.new_user_rate>0?{color:'#1ccfa7'}:item.new_user_rate<0?{color:'#f85e70'}:{color:'#797b8e'}">
                                <img src="../../static/up.png" alt="" class="mgt" v-if="item.new_user_rate>0">
                                <img src="../../static/down.png" alt="" class="mgt" v-if="item.new_user_rate<0">
                                {{item.new_user_rate.toFixed(3)}}%
                            </p>
                        </div>

                        <div class="hot_right_left">
                            <p>{{blocktitle[1][$store.state.alllang]}}</p>
                            <p>(24h)</p>
                            <p>{{item.active_user}}</p>
                            <p :style="item.active_user_rate>0?{color:'#1ccfa7'}:item.new_user_rate<0?{color:'#f85e70'}:{color:'#797b8e'}">
                                <img src="../../static/up.png" alt="" class="mgt" v-if="item.active_user_rate>0">
                                <img src="../../static/down.png" alt="" class="mgt" v-if="item.active_user_rate<0">
                                {{item.active_user_rate.toFixed(3)}}%
                            </p>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
            
        </div>
    </div>
</template>

<script>
import chainMenu from "../components/chain_menu";
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";
import Axios from "axios";

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  components: {
    chainMenu
  },
  data() {
    return {
      geth: "",
      mglf: "",
      open: "",
      arr: {
          "hour24_item":{
            "dapp_vol": 0.0105,
            "dapp_vol_rate": 0,
            "blockchain": "nas",
            "call_rate": -0.00027901785714285713,
            "new_user": 53,
            "active_user": 141,
            "active_user_rate": 0,
            "vol": 152997.07778567,
            "dapp_call": 3424,
            "new_user_rate": 0,
            "vol_rate": 0,
            "call": 3583,
            "dapp_call_rate": -0.00029197080291970805
            },
            "blockchain":"nas",
            "website": "https://nebulas.io",
            "contract": "",
            "chain_total_user": 155241,
            "dapp_num": 977,
            "chain_total_call": 9849032,
            "chain_total_vol": 234989895.25352845 
      },
      //请求数组
      reqarr: ["eth", "eos", "nas"],
      reqAarr: ["ETH", "EOS", "NAS"],
      ttarr: [
        ["简介", "Introduction"],
        ["基本信息", "Basic Information"],
        ["访问主页", "Homepage"],
        ["查看GitHub源码", "GitHub"],
        ["智能合约", "Smart contract"],
        ["合约地址", "Contract address"],
        ["展开", "Show"],
        ["24小时概况", "24H data"],
        ["热门Dapp", "Hot Dapp"],
        ["更多", "More"],
        ["应用详情", "Details"],
        ["近 30 日排名", "Rank History"],
        ["预览","Preview"]
      ],
      infoarr:[],
      infopicarr:['../../static/home.png','../../static/GitHub.png','../../static/dapp.png'],
      dayarr:[
          {
            title:['新增用户','new user'],
            value:51651,
            rate:5.23
          },
          {
            title:['活跃用户','active user'],
            value:51651,
            rate:5.23
          },
          {
            title:['交易量','volume'],
            value:51651,
            rate:5.23
          },
          {
            title:['调用次数','transaction'],
            value:51651,
            rate:5.23
          },
          {
            title:['Dapp交易量','dapp vol'],
            value:51651,
            rate:5.23
          },
          {
            title:['Dapp调用次数','dapp tx'],
            value:51651,
            rate:5.23
          }
      ],
      hotarr:[],
      blocktitle: [
        ["新增用户数","New Users"],
        ["活跃用户数","Active Users"]
      ],
      //控制合约显示
      ctra:0
    };
  },
  created() {
    this.$store.commit("changemenuflag", false);
    this.$store.commit("changeloadopacty", true);
    this.$store.commit("changeloadflge", true);
    this.geth = window.innerHeight - 60 + "px"
    setTimeout(() => {
        let href = window.location.href;
        if (href.indexOf("?") > -1) {
        console.log(window.location.href.split("?")[1].split("=" || "&"));
        var code = window.location.href.split("?")[1].split("=")[0];
        var num = window.location.href.split("?")[1].split("=")[1];
        this.urlid = num;
        this.$store.commit("theappid", num);
        }
      this.fornew();
      this.fornewdapp()
    }, 200);

    if (this.$store.state.themenuflag) {
      this.open = 253 + "px";
      this.mglf = 503 + "px";
    } else {
      this.open = "";
      this.mglf = "";
    }
  },
  mounted() {
   
  },
  computed: {
    addclose() {
      return this.$store.state.themenuflag;
    },
    thelang() {
      return this.$store.state.alllang;
    }
  },
  watch: {
    addclose(n, o) {
      console.log(1111111111111);
      if (n) {
        this.open = 253 + "px";
        this.mglf = 503 + "px";
      } else {
        this.open = "";
        this.mglf = "";
      }

      var newchart = setInterval(() => {
        window.chartsss.reflow();
      }, 17);
      setTimeout(() => {
        clearInterval(newchart);
      }, 1010);
    },
    thelang(n, o) {
      
    }
  },
  methods: {
      //合约显示
      showctr(){
          if(this.ctra){
              this.ctra = 0
          }else{
              this.ctra = this.reqarr.length + 1
          }
      },
    gotodapp(type,id){
        if(type == 1){
            this.$router.push({ path: "/rank" });
        }else if(type == 2){
            this.$router.push({ path: "/detail?id="+id });
        }
    },
    fornew() {
      console.log(this.$store.state.moneyty, this.$store.state.requesttime);
      console.log(this.$store.state.appid)
      var url =
        this.$store.state.requrlnew +
        "/" +'chain/detail';
      console.log(url);
      Axios.post(
        url,
        {
            "blockchain":this.$store.state.appid
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res.data.msg);
        this.arr = res.data.msg;
        this.dayarr=[
          {
            title:['新增用户','New User'],
            value:this.arr.hour24_item.new_user,
            rate:this.arr.hour24_item.new_user_rate
          },
          {
            title:['活跃用户','Active User'],
            value:this.arr.hour24_item.active_user,
            rate:this.arr.hour24_item.active_user_rate,
          },
          {
            title:['交易量','Volume'],
            value:this.arr.hour24_item.vol,
            rate:this.arr.hour24_item.vol_rate,
          },
          {
            title:['调用次数','Transaction'],
            value:this.arr.hour24_item.call,
            rate:this.arr.hour24_item.call_rate,
          },
          {
            title:['Dapp交易量','Dapp Vol'],
            value:this.arr.hour24_item.dapp_vol,
            rate:this.arr.hour24_item.dapp_vol_rate,
          },
          {
            title:['Dapp调用次数','Dapp Tx'],
            value:this.arr.hour24_item.dapp_call,
            rate:this.arr.hour24_item.dapp_call_rate,
          }
      ]
        // res.data.msg.hour24_item.forEach(e => {
        //   var ddd = new Date(e.timestamp * 1000 - 86400000);
        //   var year = ddd.getFullYear();
        //   var month = ddd.getMonth() + 1;
        //   var day = ddd.getDate();
        // });
        this.$store.commit("changeloadopacty", false);
        this.infoarr = [this.arr.website,this.arr.github]
      });
    },
    fornewdapp(){
      Axios.post(
        this.$store.state.requrlnew + "/hotdapp/test",
        {
          "num":6,
          "order":"active_user",
          "blockchain":this.$store.state.appid
         },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res)
        res.data.msg.data.forEach(element => {
          this.hotarr.unshift(element)
        });
      })
    }
  }
};
</script>

<style scoped>
table {
     table-layout:fixed;
     }
table tr{
    background-color: #f9f9f9;
    height: 55px;
} 
table td{
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis;
    background-color: #fff;
    } 
.out {
  margin-left: 321px;
  margin-top: 102px;
  padding-left: 1px;
  margin-right: 30px;
  box-sizing: border-box;
  overflow: visible;
  transition: all 0.5s;
}
a {
  text-decoration: none;
  outline: none;
  color: #333;
}
.leftme {
  position: fixed;
  z-index: 100;
  top: 60px;
  left: 73px;
  transition: all 0.5s;
}
.alltitle {
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: left;
  font-size: 24px;
  color: #c1c7cd;
}
.contright {
  width: 100%;
  box-sizing: border-box;
}
.dapp {
  width: 100%;
  background-color: #fff;
  padding: 30px;
  margin-bottom: 30px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  box-shadow: 3px 2px 10px 0px rgba(37, 48, 76, 0.08);
}
.preview{
    text-align: left;
    font-size: 16px;
    color: #111;
    font-weight: 600;
    margin-bottom: 10px;
}
.chain_content{
    font-size: 14px;
	line-height: 30px;
	letter-spacing: 0px;
	color: #797b8e;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 20px;
}
.info {
  width: 400px;
  text-align: left;
  height: 50px;
}
.go {
  width: 14px;
  height: 14px;
  background-image: url(../../static/go.png);
  display: inline-block;
}
.base{
    float: left;
}

.base:hover a {
  color: #409efe;
}
.base:hover .go {
  background-image: url(../../static/go1.png);
}
.tableout{
    padding-right: 90px;
    position: relative;
}
.showcontract{
    position: absolute;
    width: 67px;
	height: 30px;
	background-color: #49a5fb;
	border-radius: 4px;
    color: #fff;
    font-size: 14px;
    line-height: 30px;
    top: 0px;
    right: 0px;
}
.title{
    border: 1px solid #ebecf0;
    color: #4f5f6e;
    font-size: 14px;
}
.title:nth-of-type(2){
    border-left: 0;
}
.all{
    border: 1px solid #ebecf0;
    border-top: 0;
    color: #808c9b;
    font-size: 14px;
}
.all:nth-of-type(2){
    border-left: 0;
    cursor: pointer;
}
.all:nth-of-type(2):hover{
    color: #48a5fb;
}

.daydata{
    float: left;
    width: 16.66%;
    margin-top: 20px;
}
.daydata p:nth-of-type(1){
    font-size: 14px;
	line-height: 18px;
	letter-spacing: 0px;
	color: #797b8e;
}
.daydata p:nth-of-type(2){
    font-size: 12px;
	line-height: 18px;
	letter-spacing: 0px;
	color: #797b8e;
}
.daydata p:nth-of-type(3){
    font-size: 30px;
	line-height: 24px;
	color: #464a58;
    margin-top: 25px;
}
.daydata p:nth-of-type(4){
    font-size: 14px;
	line-height: 24px;
	letter-spacing: 0px;
	color: #1ccfa7;
    margin-top: 13px;
}
.hot {
  margin-top: 50px;
  margin-bottom: 20px;
  font-size: 20px;
  color: #525864;
  text-align: left;
  font-weight: 600;
  overflow: hidden;
  margin-top: 30px;
}
.hot span:nth-last-of-type(1){
    float: right;
    cursor: pointer;
    font-size: 16px;
	color: #acb0bb;
}
.hot span:nth-last-of-type(2){
    float: left;
}
.hotdapp{
    overflow: hidden;
}
.hotbox{
    height: 176px;
    width: 50%;
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
    margin-bottom: 15px;
}
.hot_right_left p:nth-of-type(3){
    font-size: 30px;
	line-height: 24px;
	letter-spacing: 1px;
	color: #464a58;
    margin-bottom: 15px;
}
.hot_right_left p:nth-of-type(4){
    font-size: 14px;
	letter-spacing: 0px;
	color: #797b8e;
}
.hot_right_right{
    float: right;
}
.hotbox:nth-of-type(2n){
    padding-left: 15px;
}
.hotbox:nth-of-type(2n+1){
    padding-right: 15px;
}
</style>
<style>
.el-input__inner {
  border: 1px solid #f7f8fa;
}
.el-input__inner:hover {
  border-color: #f7f8fa;
}
.el-range-editor.el-input__inner {
  border-radius: 20px;
  background-color: #f7f8fa;
}
.el-range-editor .el-range-input {
  background-color: #f7f8fa;
}
.el-pagination {
  font-weight: 400;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 350px;
}
.el-icon-date:before {
  content: "";
}
.el-pager li.active {
  color: rgb(73, 165, 251);
}
.el-pager li:hover {
  color: #49a5fb;
}
.el-pagination {
  font-weight: 400;
}
</style>