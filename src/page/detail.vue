<template>
    <div  class="out" :style="{minHeight:geth,marginLeft:mglf}" >
        <div style="position:fixed;width:100%;height:100%;background-color:#ccc;z-index:99;"  v-if="bigpic">

        </div>
        <min-menu class="leftme" :style="{left:open}"></min-menu>
        <!-- <p class="alltitle">{{ttarr[10][$store.state.alllang]}}</p> -->
        <div class="contright" v-if="arr.title">
          <div style="" class="showbigpic" v-if="bigpic">

          </div>
            <!-- dapp介绍 -->
            <div class="dapp" style="minHeight:610px;">
                <p class="preview">{{ttarr[12][$store.state.alllang]}}</p>
                <!-- 轮播图 -->
                <div class="pic topnav_box" >
                    <ul :style="allleng" class="allpic"  v-show="picshow">
                        <li v-for="(item,index) in picarr" class="outpic" v-show="imgcount">
                          <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/'+urlid+'/'+item+'.png'" alt="" onerror="javascript:this.src=''"  class="picwh" @click="show_dapp_pic('https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/'+urlid+'/'+item+'.png')">
                          <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/'+urlid+'/'+item+'.jpg'" alt="" onerror="javascript:this.src=''"  class="picwh" @click="show_dapp_pic('https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/'+urlid+'/'+item+'.jpg')"> </li>
                        <li v-for="(item,index) in picarr" class="inpic" v-show="!imgcount" ><img :src="wrongarr[index]" alt="" onerror="javascript:this.src=''"  class="picwh" @click="show_dapp_pic(wrongarr[index])"></li>
                    </ul>
                </div>
                
                <div style="position:relative;">
                    <div class="intro">
                        <p style="color:rgb(33, 34, 41);font-weight:600;font-size:16px;margin-bottom:10px;">{{ttarr[0][$store.state.alllang]}}</p>
                        <p style="line-height:30px;font-size:14px; color: #797b8e;">{{arr.en_cn[$store.state.alllang].description}}</p>
                    </div>

                    <div class="info">
                        <p style="color:rgb(33, 34, 41);font-weight:600;font-size:16px;margin-bottom:10px;">{{ttarr[1][$store.state.alllang]}}</p>
                        <div style="overflow:hidden;">
                            <div  style="line-height:30px;font-size:14px;" class="cur base">
                                <a :href="arr.website.indexOf('http')==-1?'http://'+arr.website:arr.website" target="_black" rel="noopener noreferrer">
                                    <img src="../../static/home.png" alt=""> {{ttarr[2][$store.state.alllang]}} 
                                    <div class="go"></div>
                                    <span style="color:rgb(214, 222, 230);margin-left:20px;margin-right:20px;">|</span>
                                    
                                </a>
                            </div>
                            <div  style="line-height:30px;font-size:14px;" class="cur base">
                                <a :href="arr.github?arr.github:'javascript:;'" :style="arr.github?{}:{color:'#ccc'}" target="_black" rel="noopener noreferrer">
                                    <img src="../../static/GitHub.png" alt=""> {{ttarr[3][$store.state.alllang]}} 
                                    <div class="go" v-if="arr.github"></div>
                                </a>
                            </div>
                        </div>
                        
                        <div class="tableout"> 
                          <table width="100%" cellspacing='0' style="text-align: center;">
                              <tr>
                                  <th style="width:300px;" class="title">{{ttarr[4][$store.state.alllang]}}</th>
                                  <th  class="title">{{ttarr[5][$store.state.alllang]}}</th>
                              </tr>
                              <tr v-for="(item,index) in arr.contracts" :key="index" v-if="index<=ctra">
                                  <td class="all" v-if="index == 0">{{'contracts'+(index+1)}}</td>
                                  <td class="all" v-if="index != 0"> </td>
                                  <td class="all">
                                    <a :href="'https://explorer.nebulas.io/#/address/'+item" v-if="arr.platform == 'NAS'" target="_black" rel="noopener noreferrer">{{item}}</a>
                                    <a :href="'https://etherscan.io/address/'+item" v-if="arr.platform == 'ETH'" target="_black" rel="noopener noreferrer">{{item}}</a>
                                    <a :href="'https://eospark.com/MainNet/account/'+item" v-if="arr.platform == 'EOS'" target="_black" rel="noopener noreferrer">{{item}}</a> 
                                    <a :href="'https://tronscan.org/#/contract/'+item" v-if="arr.platform == 'TRON'" target="_black" rel="noopener noreferrer">{{item}}</a>   
                                  </td>
                              </tr>
                          </table>

                          <div class="showcontract cur" @click="showctr(arr.contracts.length>1)" v-if="arr.contracts.length>1">
                              {{ctra?ttarr[14][$store.state.alllang]:ttarr[6][$store.state.alllang]}}
                              <img :src="ctra?'../../static/unshow.png':'../../static/show.png'" alt="" style="vertical-align:3px;margin-left:10px;">
                          </div>
                      </div>  
                    </div>
                </div>
                

                
            </div>


            <!-- 动态和资讯 -->
            <div class="news" v-show="false">
                <div class="newinfo">
                    <p style="color: #212229;font-weight: 600;">{{ttarr[5][$store.state.alllang]}}</p>
                    <p style="line-height:30px;font-size:14px;"></p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import minMenu from "../components/rank";
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
    minMenu
  },
  data() {
    return {
      geth: "",
      // 图片数组
      picarr: [1, 2, 3, 4],
      allleng: "",
      mglf: "",
      open: "",
      arr: "",
      //请求数组
      reqarr: ["eth", "eos", "nas"],
      reqAarr: ["ETH", "EOS", "NAS"],
      wrongarr: [
        "../../static/1-0-1.jpg",
        "../../static/1-0-2.jpg",
        "../../static/1-0-24.jpg",
        "../../static/1-0-28.jpg"
      ],
      ttarr: [
        ["简介", "Introduction"],
        ["基本信息", "Basic Information"],
        ["访问主页", "Homepage"],
        ["查看GitHub源码", "GitHub"],
        ["智能合约", "Smart contract"],
        ["合约地址", "Contract address"],
        ["展开", "Show"],
        ["最新资讯", "Latest News"],
        ["累计用户", "Users"],
        ["交易量", "Volume"],
        ["调用次数", "Transactions"],
        ["应用详情", "Details"],
        ["预览","Preview"],
        ["展开","open"],
        ["关闭","close"]
      ],
      code: "",
      theurl: "",
      xarr: [],
      userarr: [],
      tradearr: [],
      usearr: [],
      allarr: [],
      urlid: "",
      //统计图片数量
      imgcount: 0,
      //轮播图显示
      picshow: false,
       //控制合约显示
      ctra:0,
      now_show_type:'open',
      //控制大图显示隐藏
      bigpic:false
    };
  },
  created() {
    this.$store.commit("changemenuflag", false);
    this.$store.commit("changeloadopacty", true);
    this.$store.commit("changeloadflge", true);
    (this.geth = window.innerHeight - 60 + "px"),
      (this.allleng = { width: this.wrongarr.length * 370 + "px" });
    setTimeout(() => {
      this.fornew();
    }, 50);
    if (this.$store.state.themenuflag) {
      this.open = 253 + "px";
      this.mglf = 503 + "px";
    } else {
      this.open = "";
      this.mglf = "";
    }
  },
  mounted() {
    setTimeout(() => {
      console.log(this.xarr);
      console.log(this.$store.state.close);

      $(".outpic").each(a => {
        console.log($(".outpic").eq(a)[0].children);
        if (
          $(".outpic")
            .eq(a)[0]
            .children[0].src.indexOf("jpg") != -1 ||
          $(".outpic")
            .eq(a)[0]
            .children[0].src.indexOf("png") != -1
        ) {
          this.imgcount++;
        }
        if (
          $(".outpic")
            .eq(a)[0]
            .children[1].src.indexOf("jpg") != -1 ||
          $(".outpic")
            .eq(a)[0]
            .children[1].src.indexOf("png") != -1
        ) {
          this.imgcount++;
        }
      });
      console.log(this.imgcount);
      if (this.imgcount) {
        this.allleng = { width: this.imgcount * 370 + "px" };
      } else {
        this.allleng = { width: this.wrongarr.length * 370 + "px" };
      }
    }, 1000);
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
    now_show_type(){
      
    },
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
    //展示图片
    show_dapp_pic(url){
      console.log(url)
      this.$store.commit("changepicshow", true);
      this.$store.commit("changeurl",url)
    },
    //合约显示
      showctr(flag){
        console.log(flag)
        if(flag){
          if(this.ctra){
              this.ctra = 0
          }else{
              this.ctra = this.arr.contracts.length + 1
          }
        }  
      },
    fornew() {
      this.xarr = [];
      this.userarr = [];
      this.tradearr = [];
      this.usearr = [];
      this.allarr = [];
      console.log(this.$store.state.moneyty, this.$store.state.requesttime);
      if(this.$store.state.appid.split("_")[0]=='ETH'){
        var url =
        this.$store.state.requrl +
        "/" +
        this.$store.state.appid.split("_")[0].toLowerCase() +
        "/detail";
      console.log(url);
      Axios.post(
        url,
        {
          dapp_id: this.$store.state.appid,
          flag:1
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        setTimeout(() => {
          this.picshow = true;
        }, 1000);
        console.log(res.data.msg);
        this.arr = res.data.msg;
        this.urlid = res.data.msg.dapp_id;
        res.data.msg.day_30.forEach(e => {
          var ddd = new Date(e.timestamp * 1000 - 86400000);
          var year = ddd.getFullYear();
          var month = ddd.getMonth() + 1;
          var day = ddd.getDate();
          this.xarr.unshift(year + "/" + month + "/" + day);
          this.userarr.unshift(e.day_info[0]);
          this.tradearr.unshift(e.day_info[2].toFixed(2) - 0);
          this.usearr.unshift(e.day_info[1]);
          this.allarr.unshift(e.rank_order);
        });
        if (this.arr.platform == "NAS") {
          this.theurl =
            "https://explorer.nebulas.io/#/address/" + this.arr.contracts[0];
        } else if (this.arr.platform == "ETH") {
          this.theurl = "https://etherscan.io/address/" + this.arr.contracts[0];
        }
        this.$store.commit("changeloadopacty", false);
      });
      }else{
        var url =
        this.$store.state.requrlnew +
        "/dapp/detail";
      console.log(url);
      Axios.post(
        url,
        {
          blockchain:this.$store.state.appid.split("_")[0].toLowerCase(),
          dapp_id:this.$store.state.appid
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        setTimeout(() => {
          this.picshow = true;
        }, 1000);
        console.log(res.data.msg);
        this.arr = res.data.msg;
        this.urlid = res.data.msg.dapp_id;
        res.data.msg.day_30.forEach(e => {
          var ddd = new Date(e.timestamp * 1000 - 86400000);
          var year = ddd.getFullYear();
          var month = ddd.getMonth() + 1;
          var day = ddd.getDate();
          this.xarr.unshift(year + "/" + month + "/" + day);
          this.userarr.unshift(e.day_info[0]);
          this.tradearr.unshift(e.day_info[2].toFixed(2) - 0);
          this.usearr.unshift(e.day_info[1]);
          this.allarr.unshift(e.rank_order);
        });
        if (this.arr.platform == "NAS") {
          this.theurl =
            "https://explorer.nebulas.io/#/address/" + this.arr.contracts[0];
        } else if (this.arr.platform == "ETH") {
          this.theurl = "https://etherscan.io/address/" + this.arr.contracts[0];
        }
        this.$store.commit("changeloadopacty", false);
      });
      }
      
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
  position: relative;
}
.showbigpic{
  position:absolute;
  width:100%;
  height:100%;
  z-index:100;
  background-size:contain;
}
.dapp {
  width: 100%;
  background-color: #fff;
  padding: 30px;
  box-sizing: border-box;
  position: relative;
  box-shadow: 3px 2px 10px 0px rgba(37, 48, 76, 0.08);
}
.preview{
    text-align: left;
    font-size: 16px;
    color: #111;
    font-weight: 600;
}

.pic {
  height: 230px;
  border-bottom: 1px solid #eff3f5;
  margin-top: 20px;
  overflow-x: scroll;
}
.topnav_box::-webkit-scrollbar {
  width: 5px;
  height: 4px;

  background-color: #c1c1c1;
}
.topnav_box::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f1f1f1;
}
.topnav_box::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #c1c1c1;
}

.allpic {
  height: 200px;
  overflow-y: hidden;
}
.picwh {
  width: 350px;
  height: 200px;
}
.outpic {
  float: left;
  margin: 0 10px;
}
.inpic {
  float: left;
  margin: 0 10px;
}
.intro {
  width: 100%;
  box-sizing: border-box;
  text-align: left;
  margin-top: 30px;
  border-top: 1px solid #eff3f5;
  padding-top: 30px;
}
.info {
  text-align: left;
  margin-top: 30px;
}
.picture {
  width: 100%;
  height: 585px;
  background-color: #fff;
  margin-top: 30px;
  margin-right: 20px;
  padding: 30px;
  box-sizing: border-box;
  box-shadow: 3px 2px 10px 0px rgba(37, 48, 76, 0.08);
}
.news {
  width: 100%;
  box-sizing: border-box;
   
}
.newact {
  padding: 30px;
  float: left;
  border-radius: 6px;
  background-color: #fff;
  width: 43%;
  margin-right: 30px;
  margin-top: 30px;
}
.newinfo {
  padding: 30px;
  background-color: #fff;
  margin-top: 30px;
  text-align: left;
  box-shadow: 3px 2px 10px 0px rgba(37, 48, 76, 0.08);
}
.go {
  width: 14px;
  height: 14px;
  background-image: url(../../static/go.png);
  display: inline-block;
}
.base{
  float: left;
  margin-bottom: 20px;
}
.base:hover a {
  color: #409efe;
}
.base:hover .go {
  background-image: url(../../static/go1.png);
}
.tableout{
    position: relative;
}
.showcontract{
    position: absolute;
    width: 67px;
	height: 30px;
	border-radius: 4px;
    color: #49a5fb;
    font-size: 14px;
    line-height: 30px;
    text-align: center;
    top: 65px;
    right: 24px;
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
    background-color: #fff;
    font-size: 14px;
}
.all:nth-of-type(1){
    border-bottom: 0px;
}
.all:nth-of-type(2){
    border-left: 0;
    border-bottom: 0px;
    cursor: pointer;
}
.all:nth-of-type(2) a{
  color: #808c9b;
}
.all:nth-of-type(2) a:hover{
    color: #48a5fb;
}
.tableout tr:nth-last-of-type(1) .all:nth-of-type(1),.tableout tr:nth-last-of-type(1) .all:nth-of-type(2){
  border-bottom: 1px solid #ebecf0;
}
</style>