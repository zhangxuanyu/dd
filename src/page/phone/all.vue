<template>
    <div>
        <p class="title">
            <span >{{blocktitle[0][$store.state.alllang]}}</span>
            <span > </span>
        </p>

        <div v-for="(item,index) in arr" :key="index" class="chain"> 
            <div class="chain_title">
                <p class="chain_type">{{item.word}} <span v-if="index == 1" style="font-size:0.24rem;color:rgb(73, 165, 251);">(beta)</span> </p>
                <p class="dappnum">{{blocktitle[6][$store.state.alllang]}}:{{item.num}}</p>
            </div>
            
            <div class="flex_out">
                <div v-for="(it,idx) in item.data" :key="idx" class="flex_type">
                    <p>{{it.word[$store.state.alllang]}}</p>
                    <p>(24h)</p>
                    <p>{{it.num}}</p>
                    <p :style="it.add>0?{color:'#1ccfa7'}:{color:'#f85e70'}"><img :src="it.add>0?'../../../static/phone/UP.png':'../../../static/phone/DOWN.png'" alt="" style="width:0.12rem;height:0.14rem;"><span v-if="it.add>0">+</span> {{it.add}}%</p> 
                </div>
            </div>
        </div>

        <p class="title" style="margin-top:0.8rem;">
            <span >{{blocktitle[7][$store.state.alllang]}}</span>
        </p>
        <!-- 曲线图 -->
        <div style="overflow:hidden;"> 
            <p class="select_type">
                  <span style="margin-right:0.1rem;font-size: 0.32rem;color: #797b8e;">
                            {{blocktitle[8][$store.state.alllang]}}
                        </span>
                        <el-select v-model="typedata">
                            <el-option :key="index" :label="item[$store.state.alllang]" :value="index" v-for="(item,index) in typearr1">{{item[$store.state.alllang]}}</el-option>
                        </el-select>
              </p>
        </div>
        
        <div style="padding:0.8rem 0.4rem 0.5rem 0.4rem;background-color:#FFF;margin-bottom:0.8rem;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
          <div class="picture">
              <div id="mychart"></div>
          </div>
        </div>
          

        <!-- 研究报告 -->
        <p class="title">
            <span >{{blocktitle[2][$store.state.alllang]}}</span>
            <span @click="gotoother(0,0)">{{blocktitle[3][$store.state.alllang]}} ></span>
        </p>
        <div style="margin:0 -0.3rem;overflow:hidden;padding-left:0.3rem;">
          <div class="swiper-container report_out">
            <div class="swiper-wrapper report_long" >
                <div class="swiper-slide report_in"  v-for="(item,index) in reportarr" :key="index" style="width:6.9rem;">
                  <a :href="item.src">
                    <div class="content_img" :style="{background: 'url('+item.img_index+') no-repeat',backgroundSize:'cover'}">

                    </div>
                    <p>
                        {{item.title[$store.state.alllang]}}
                    </p>
                    <p>
                        {{item.time}}
                    </p>
                  </a>
                </div>
            </div>
        </div>
        </div>
        
        
    </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import Axios from "axios";
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.min.css';

export default {
  data() {
    return {
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
          word: "NAS",
          num: 0,
          data: [
            {
              img: "../../static/NAS-1.png",
              word: ["活跃用户", "Active Users"],
              num: "",
              add: ""
            },
            {
              img: "../../static/NAS-1.png",
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
      blocktitle: [
        ["热门公链", "BlockChian"],
        ["热门Dapp", "Most Dapp"],
        ["研究报告", "Report"],
        ["查看全部", "more"],
        ["新增用户数", "New Users"],
        ["活跃用户数", "Active Users"],
        ["Dapps数量", "Dapps"],
        ["整体趋势", "Trend"],
        ["分类","type"]
      ],
      typedata:0,
      typearr1:[["新增用户", "New Users"],["累计用户", "Users"],["调用次数", "Transactions"]],
        //报告数据
      reportarr:[],
      //画图
      xarr : [],
      etharr : [],
      nasarr : [],
      eosarr : [],
      //请求数组
      reqarr: ["new_user", "total_user", "call"],
      //触发画图
      redrawflag:true
    };
  },
  created(){
      this.reportarr = pdfarr
      this.fornew(true)
  },
  mounted(){
      var mySwiper = new Swiper('.swiper-container', {      
        slidesPerView:"auto"
    })
  },
  watch:{
    redrawflag() {
      setTimeout(() => {
        this.initChart(this.xarr,this.etharr,this.nasarr,this.eosarr)
      }, 1000);
    },
    typedata(){
      this.fornew(false)
    }
  },
  methods:{
      gotoother(a,b){
        if(a == 0){
          this.$router.push({path:'/report'});
        }else if(a == 1){

        }
      },
      initChart(arr1, arr2, arr3, arr4) {
      var options1 = {
        //hchart的参数
        chart: {
          zoomType: "xy"
        },
        colors: ["#409efe", "#00e175", "#ff0a50"],
        title: {
          text: ""
        },
        subtitle: {
          text: ""
        },
        credits: {
          enabled: false
        },
        xAxis: [
          {
            //横坐标
            categories: arr1,
            crosshair: true
          }
        ],
        yAxis: [
          {
            // Primary yAxis
            labels: {
              format: "{value}",
              style: {
                color: "#409efe"
              }
            },
            title: {
              text: "ETH",
              style: {
                color: "#409efe"
              }
            }
          },
          {
            // Secondary yAxis
            title: {
              text: "EOS",
              style: {
                color: "#00e175"
              }
            },
            labels: {
              format: "{value}",
              style: {
                color: "#00e175"
              }
            },
            opposite: true
          },
          {
            // Secondary yAxis
            title: {
              text: "NAS",
              style: {
                color: "#ff0a50"
              }
            },
            labels: {
              format: "{value}",
              style: {
                color: "#ff0a50"
              }
            },
            opposite: true
          }
        ],
        tooltip: {
          shared: true
        },
        series: [
          {
            name: "ETH",
            data: arr2,
            type: "spline"
          },
          {
            //纵坐标
            name: "EOS",
            data: arr4,
            type: "spline",
            yAxis: 1
          },
          {
            //纵坐标
            name: "NAS",
            data: arr3,
            type: "spline",
            yAxis: 2
          }
        ]
      };
      window.chartsss = Highcharts.chart("mychart", options1);

      
    },
      fornew(aa) {
      this.xarr = [];
      this.etharr = [];
      this.nasarr = [];
      this.eosarr = [];
      console.log(this.$store.state.moneyty, this.$store.state.requesttime);
      var url = this.$store.state.requrl + "/index";
      Axios.post(
        url,
        {
          key: this.reqarr[this.typedata]
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res.data.msg);
        var numtimes = 1;
        if (aa) {
          var numroll = setInterval(() => {
            if (numtimes >= 90) {
              clearInterval(numroll);
            }
            numtimes++;
            this.arr[0].data[0].num = parseInt(
              (res.data.msg.change_24h.eth.user / 90) * numtimes
            );

            this.arr[0].data[1].num = parseInt(
              (res.data.msg.change_24h.eth.vol / 90) * numtimes
            );

            this.arr[0].data[2].num = parseInt(
              (res.data.msg.change_24h.eth.tx / 90) * numtimes
            );

            this.arr[1].data[0].num = parseInt(
              (res.data.msg.change_24h.eos.user / 90) * numtimes
            );

            this.arr[1].data[1].num = parseInt(
              (res.data.msg.change_24h.eos.vol / 90) * numtimes
            );

            this.arr[1].data[2].num = parseInt(
              (res.data.msg.change_24h.eos.tx / 90) * numtimes
            );

            this.arr[2].data[0].num = parseInt(
              (res.data.msg.change_24h.nas.user / 90) * numtimes
            );

            this.arr[2].data[1].num = parseInt(
              (res.data.msg.change_24h.nas.vol / 90) * numtimes
            );

            this.arr[2].data[2].num = parseInt(
              (res.data.msg.change_24h.nas.tx / 90) * numtimes
            );
          }, 20);
        }
        this.arr[0].data[0].num = res.data.msg.change_24h.eth.user;
        this.arr[0].data[0].add = (
          res.data.msg.change_24h.eth.user_rate * 100
        ).toFixed(2);
        this.arr[0].data[1].num = res.data.msg.change_24h.eth.vol.toFixed(0);
        this.arr[0].data[1].add = (
          res.data.msg.change_24h.eth.vol_rate * 100
        ).toFixed(2);
        this.arr[0].data[2].num = res.data.msg.change_24h.eth.tx;
        this.arr[0].data[2].add = (
          res.data.msg.change_24h.eth.tx_rate * 100
        ).toFixed(2);

        this.arr[1].data[0].num = res.data.msg.change_24h.eos.user;
        this.arr[1].data[0].add = (
          res.data.msg.change_24h.eos.user_rate * 100
        ).toFixed(2);
        this.arr[1].data[1].num = res.data.msg.change_24h.eos.vol.toFixed(0);
        this.arr[1].data[1].add = (
          res.data.msg.change_24h.eos.vol_rate * 100
        ).toFixed(2);
        this.arr[1].data[2].num = res.data.msg.change_24h.eos.tx;
        this.arr[1].data[2].add = (
          res.data.msg.change_24h.eos.tx_rate * 100
        ).toFixed(2);

        this.arr[2].data[0].num = res.data.msg.change_24h.nas.user;
        this.arr[2].data[0].add = (
          res.data.msg.change_24h.nas.user_rate * 100
        ).toFixed(2);
        this.arr[2].data[1].num = res.data.msg.change_24h.nas.vol.toFixed(0);
        this.arr[2].data[1].add = (
          res.data.msg.change_24h.nas.vol_rate * 100
        ).toFixed(2);
        this.arr[2].data[2].num = res.data.msg.change_24h.nas.tx;
        this.arr[2].data[2].add = (
          res.data.msg.change_24h.nas.tx_rate * 100
        ).toFixed(2);

        this.arr[0].num = res.data.msg.count.eth;
        this.arr[1].num = res.data.msg.count.eos;
        this.arr[2].num = res.data.msg.count.nas;
        // this.xarr = res.data.msg.day_30d.eth_info
        res.data.msg.day_30d.eth_info.forEach(e => {
          var ddd = new Date((e.timestamp - 86400) * 1000);
          var year = ddd.getFullYear();
          var month = ddd.getMonth() + 1;
          var day = ddd.getDate();
          this.xarr.unshift(year + "/" + month + "/" + day);
          this.etharr.unshift(e.value);
        });
        console.log(this.etharr)
        res.data.msg.day_30d.nas_info.forEach(e => {
          this.nasarr.unshift(e.value);
        });
        res.data.msg.day_30d.eos_info.forEach(e => {
          this.eosarr.unshift(e.value);
        });
        this.$store.commit("changeloadopacty", false);
        this.redrawflag = !this.redrawflag;
      });
    }
  }
};
</script>

<style scoped>
div {
  box-sizing: border-box;
}
a{
    text-decoration: none;
    outline: none;
}
.title {
  height: 0.36rem;
  margin-bottom: 0.4rem;
}
.title span:nth-of-type(1) {
  font-size: 0.36rem;
  color: #525864;
  float: left;
  font-weight: 600;
}
.title span:nth-of-type(2) {
  font-size: 0.28rem;
  color: #acb0bb;
  float: right;
}
.chain {
  width: 100%;
  height: 3.8rem;
  background-color: #ffffff;
  box-shadow: 0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);
  box-sizing: border-box;
  margin-bottom: 0.4rem;
}
.chain_type {
  float: left;
  font-size: 0.3rem;
  font-weight: 600;
  color: #212229;
  margin-top: 0.34rem;
}
.dappnum {
  height: 0.4rem;
  line-height: 0.4rem;
  background-color: #f7f8fa;
  border-radius: 0.2rem;
  float: right;
  padding: 0 0.3rem;
  font-size: 0.22rem;
  color: #797b8e;
  margin-top: 0.34rem;
}
.chain_title {
  width: 100%;
  height: 1.08rem;
  border-bottom: 1px solid #eff3f5;
  box-sizing: border-box;
  padding: 0 0.4rem;
}
.flex_out {
  display: flex;
  justify-content: space-around;
  text-align: center;
  font-size: 0.42rem;
  padding: 0.4rem 0;
}
.flex_type p:nth-of-type(1) {
  font-size: 0.24rem;
  color: #797b8e;
}
.flex_type p:nth-of-type(2) {
  font-size: 0.2rem;
  color: #797b8e;
}
.flex_type p:nth-of-type(3) {
  color: #464a58;
  margin-top: 0.2rem;
}
.flex_type p:nth-of-type(4) {
  font-size: 0.24rem;
  margin-top: 0.2rem;
  color: #797b8e;
}
.picture {
  width: 100%;
  height: 10.45rem;
  background-color: #ffffff;
  overflow-x: scroll;
  position: relative;
}
.pic_out{
  position: absolute;
  width: 100%;
  height: 100%;
  padding: 0.3rem;
  background-color: #ccc;
  top: 0;
  left: 0;
}
.select_type{
    float: left;
    margin-top: -0.4rem;
    margin-bottom: 0.3rem;
}
#mychart{
  width: 20rem;
  height: 100%;
}


.report_out{
    width: 100%;
    height: 4.94rem;
    overflow: visible;
}
.report_long{
    overflow: hidden;
    width: 30rem;
    height: 4.94rem;
}
.report_in{
    height: 4.94rem;
    background-color: #fff;
    margin-right: 0.14rem;
    float: left;
    box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
}
.content_img{
    height: 3.58rem;
    margin-bottom: 0.05rem;
}
.report_in p{
    line-height: 0.68rem;
    padding: 0 0.4rem;
    text-align: left;
}
.report_in p:nth-of-type(1){
    font-size: 0.3rem;
    color: #464a58;
}
.report_in p:nth-of-type(2){
    font-size: 0.26rem;
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
</style>

<style>
.select_type .el-input--suffix .el-input__inner{
    background-color: rgba(0,0,0,0);
    border-radius: 0.6rem;
    width: 2.6rem;
}
</style>
