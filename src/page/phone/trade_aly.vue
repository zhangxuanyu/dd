<template>
    <div>
        <ph-name></ph-name>
        <ph-type></ph-type>
        <div class="time">
            <span style="float:left;"></span>
        </div>
        <div style="overflow:hidden;position:relative;">
          <div class="timein">
          <span style="float:left;margin-right:0.3rem;">{{ttarr[5][$store.state.alllang]}}</span>
          <input type="text" id="first_date" v-model="timevalue"  style="float:left;color:#797b8e;width: 3.2rem;text-align:center;height: 0.6rem;border: 1px solid #dfe4ed;border-radius: 0.3rem;box-sizing: border-box;"/>
        </div> 
        <div class="timein" >
          <span :style="$store.state.alllang == 1?{float:'left',marginRight:'0.5rem'}:{float:'left',marginRight:'0.3rem'}" >{{ttarr[6][$store.state.alllang]}}</span>
          <input type="text" id="last_date" v-model="timevalue1"  style="float:left;color:#797b8e;width: 3.2rem;text-align:center;height: 0.6rem;border: 1px solid #dfe4ed;border-radius: 0.3rem;box-sizing: border-box;"/>
        </div>

          <div class="confram" @click="request()">
            {{ttarr[7][$store.state.alllang]}}
          </div>
        </div>
        
        
        <!-- 活跃用户 -->
        <p class="preview">{{ttarr[2][$store.state.alllang]}}</p> 
        <div style="padding:0.8rem 0.4rem 0.5rem 0.4rem;background-color:#FFF;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
        <div class="picture">   
          <div class="mychart" id="alltrade"></div>
        </div>
        </div>


        <p class="preview">{{ttarr[0][$store.state.alllang]}}</p>  
         <div style="padding:0.8rem 0.4rem 0.5rem 0.4rem;background-color:#FFF;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
        <div class="picture">   
          <div class="mychart" id="transe"></div>
          </div>
        </div>



        <p class="preview">{{ttarr[8][$store.state.alllang]}}</p>  
         <div style="padding:0.8rem 0.4rem 0.5rem 0.4rem;background-color:#FFF;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
        <div class="picture">   
          <div class="mychart" id="tradenum"></div>
          </div>
        </div>



        <p class="preview">{{ttarr[3][$store.state.alllang]}}</p> 
        <div style="padding:0.4rem;background-color:#FFF;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
        <div class="tableout">
            <ul class="table">
                <li v-for="(item,index) in titlearr" :key="index">
                    <div  class="all titletop" :style="index == 1?{textAlign:'left'}:{}">
                        {{item[$store.state.alllang]}} 
                    </div>

                    <div class="all" v-if="index == 0&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in tablearr" :key="idx" >
                       {{timeuse(it.timestamp-68400)}}
                    </div>
                    <div class="all" v-if="index == 1&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in tablearr" :key="idx" >
                       {{conversion(it.day_vol.toFixed(2))}}
                    </div>
                    <div class="all" v-if="index == 2&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in tablearr" :key="idx">
                        {{conversion(it.day_call.toString())}}
                    </div>
                     <div class="all" v-if="index == 3&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in tablearr" :key="idx">
                        {{conversion(it.day_tx.toString())}}
                    </div>
                     <div class="all" v-if="index == 4&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in tablearr" :key="idx">
                        {{conversion(it.total_vol.toFixed(2))}}
                    </div>
                     <div class="all" v-if="index == 5&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in tablearr" :key="idx">
                        {{conversion(it.total_call.toString())}}
                    </div>
                    <div class="all" v-if="index == 6&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in tablearr" :key="idx">
                        {{conversion(it.total_tx.toString())}}
                    </div>
                    
                </li>
            </ul>
           
        </div>
        </div>


        <div class="botpage">
            <div class="pre" @click="runpage(-1)" v-if="thepage>1">
                {{toparr[1][$store.state.alllang]}}
            </div>
            <div class="pre" @click="runpage(1)" v-if="thepage<Math.ceil(arr.length/thepagesize)">
                {{toparr[2][$store.state.alllang]}}
            </div>
            <p class="rightpage">
                <span>{{toparr[3][$store.state.alllang]}}</span>     
                <el-select v-model="thepage"   class="top_right"  v-if="arr.length">
                        <el-option :key="index" :label="item" :value="item" v-for="(item,index) in Math.ceil(arr.length/thepagesize)" >{{item}}</el-option>
                    </el-select>
                <span>{{toparr[4][$store.state.alllang]}}</span>
            </p>
        </div>

    </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import phName from "../../components/phone/dappname.vue";
import phType from "../../components/phone/detail_type.vue";
import Axios from "axios";

export default {
  components: {
    phName,
    phType
  },
  data() {
    return {
      value7: "",
      ttarr: [
        ["日交易笔数", "Daily Transactions"],
        ["时间段", "Period"],
        ["日交易额", "Daily Volume"],
        ["交易数据", "Transaction Data"],
        ["用户分析", "User Analysis"],
        ["开始时间", "Begin Time"],
        ["结束时间", "End Time"],
        ["确定", "confirm"],
        ["日转账笔数", "Daily Transfer"]
      ],
      titlearr:[['日期','Date'],['日交易额','Daily Volume'],['日交易笔数','Daily Transactions'], ['日转账笔数','Daily Transfer'], ['累计交易额','Total Volume'], ['累计交易笔数','Total Transactions'], ['累计转账笔数','Total Transfer']],
      date: "",
      timevalue: "",
      timevalue1: "",
      begintime: "",
      endtime: "",
      xarr : [],
      timearr : [],
      allarr : [],
      arr : [],
      usearr  : [],
      arr2 : [],
      arr1 : [],
      tablearr:[],
      fornewflag: false,
      thepagesize: 10,
      thepage: 1,
      thepage1: 1,
      toparr: [
        ["综合排行", "Rankings"],
        ["上一页", "pre"],
        ["下一页", "next"],
        ["第", "page"],
        ["页", ""]
      ],
      titlearr1 :[['日期','Date'],['总交易量','Volume'],['总交易量增长率','Volume(Growth Rate)'], ['平均单笔交易量','Average Volume'],['平均交易量增长率','Average Volume(Growth Rate)']],
    };
  },
  created() {
    var now = new Date(new Date().setHours(0, 0, 0, 0)) - 0;
    var now1 = now - 86400000 * 14;
    //小时,分钟，秒，毫秒
    //凌晨2点50分50秒0毫秒
    console.log(now);
    console.log(now1);
    // 请求时间
    this.begintime = now1;
    this.endtime = now - 86400000;
    console.log(new Date(now1));
    this.pickerValue = new Date(this.begintime)
    this.pickerValue1 = new Date(this.endtime)
    // 显示时间
    this.timevalue = this.timeday(new Date(this.begintime));
    this.timevalue1 = this.timeday(new Date(this.endtime));
    console.log(this.timevalue, this.timevalue1);
    setTimeout(() => {
      this.fornew();
      this.fornew1();
    }, 50);
  },
  mounted(){
        var theme = "ios";
        var mode = "scroller";
        var display = "bottom";
        var lang="zh";
        var that = this
        $('#first_date').mobiscroll().date({
            
            theme: theme,
            mode: mode,
            display: display,
            lang: lang,
            onSelect:function(textVale,inst){ //选中时触发事件
               var now = new Date(textVale);
                that.begintime = now.getTime()
                that.timevalue = that.timeday(now);
            }
        })
        $('#last_date').mobiscroll().date({
            theme: theme,
            mode: mode,
            display: display,
            lang: lang,
            onSelect:function(textVale,inst){ //选中时触发事件
                var now = new Date(textVale);
                that.endtime = now.getTime()
                that.timevalue1 = that.timeday(now);
            }
        })
  },
  computed: {
    thelang() {
      return this.$store.state.alllang;
    }
  },
  watch: {
    thelang() {
      this.drawall();
    },
    pickerValue(n, o) {
      console.log(n);
    },
    pickerValue1(n, o) {
      console.log(n);
    }
  },
  methods: {
    // 确定时间
    request() {
      if (this.begintime > this.endtime) {
        var time = this.begintime;
        this.begintime = this.endtime;
        this.endtime = time;
        var showtime = this.timevalue;
        this.timevalue = this.timevalue1;
        this.timevalue1 = showtime;
      }
      this.fornew();
      this.fornew1()
    },
    runpage1(add) {
      this.thepage1 = this.thepage1 + add;
    },
    runpage(add) {
      this.thepage = this.thepage + add;
    },
    //数字字符串添加逗号
    conversion(str) {
      if (/\./.test(str)) {
        return str
          .replace(/\d(?=(\d{3})+\.)/g, "$&,")
          .replace(/\d{3}(?![,.]|$)/g, "$&,");
      } else {
        return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
      }
    },
    drawall() {
      setTimeout(() => {
        this.drawuser1(
          "tradenum",
          this.xarr,
          this.timearr,
          this.ttarr[8][this.$store.state.alllang],
          "tradenum"
        );
      }, 1000);
      setTimeout(() => {
        this.drawuser1(
          "alltrade",
          this.xarr,
          this.allarr,
          this.ttarr[2][this.$store.state.alllang],
          "alltrade"
        );
      }, 1000);
      setTimeout(() => {
        this.drawuser1(
          "transe",
          this.xarr,
          this.usearr,
          this.ttarr[0][this.$store.state.alllang],
          "transe"
        );
      }, 1000);
      setTimeout(()=>{
                    this.tablearr = []
                    console.log(this.arr)
                    console.log(this.arr2)
                    this.arr.forEach((e,index) => {
                        this.tablearr.push({})
                        this.tablearr[index]['timestamp'] = e.timestamp
                        this.tablearr[index]['day_tx'] = e.day_tx
                        this.tablearr[index]['day_vol'] = e.day_vol
                        this.tablearr[index]['total_tx'] = e.total_tx
                        this.tablearr[index]['total_vol'] = e.total_vol
                        this.tablearr[index]['day_call'] = this.arr2[index].day_call
                        this.tablearr[index]['total_call'] = this.arr2[index].total_call
                    });
                    console.log(this.tablearr)
                },1000)
    },
    drawuser1(aa, arr1, arr2, string, windowname) {
      var options = {
        //hchart的参数
        chart: {
          zoomType: "xy"
        },
        colors: ["#409efe", "#00e175", "#ff0a50", "black"],
        title: {
          text: ""
        },
        credits: {
          enabled: false
        },
        subtitle: {
          text: ""
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
              text: string,
              style: {
                color: "#409efe"
              }
            }
          }
        ],
        tooltip: {
          shared: true
        },
        series: [
          {
            name: string,
            data: arr2,
            type: "spline"
          }
        ]
      };
      // this.chart = new Highcharts.Chart(chartContainer, options)
      window[windowname] = Highcharts.chart(aa, options);

      window.onresize = function() {
        window[windowname].reflow();
      };
    },
    //时间处理
    timeday(time) {
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var day = time.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    },
    timeuse(aaa) {
      var ddd = new Date(aaa * 1000);
      var year = ddd.getFullYear();
      var month = ddd.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var day = ddd.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return year + "-" + month + "-" + day;
    },
    //数据请求
    fornew() {
      this.xarr = []
            this.timearr = []
            this.allarr = []
            this.arr = []
      console.log(this.$store.state.moneyty, this.$store.state.requesttime);
      var url = this.$store.state.requrlnew+'/dapp'
      console.log(url);
      Axios.post(
        url,
        {
          "blockchain": this.$store.state.appid.split("_")[0].toLowerCase(),
          "dapp_id":this.$store.state.appid,
          "begin": this.begintime/1000,
          "end": this.endtime/1000+86400,
          "type":"tx"
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res);
        res.data.msg.data.forEach((a, bb) => {
          if (bb < res.data.msg.data.length - 1) {
            this.arr.unshift(a);
          }
        });

        this.arr.forEach(e => {
          var ddd = new Date(e.timestamp * 1000 - 86400000);
          var year = ddd.getFullYear();
          var month = ddd.getMonth() + 1;
          var day = ddd.getDate();
          this.xarr.unshift(year + "/" + month + "/" + day);
          this.timearr.unshift(e.day_tx);
          this.allarr.unshift(e.day_vol);
        });
        this.$store.commit("changeloadopacty", false);
        setTimeout(()=>{
          this.drawall()
        },100)
      });
    },
    //数据请求
    fornew1() {
            this.usearr  = []
            this.arr2 = []
            this.arr1 = []
      console.log(this.$store.state.moneyty, this.$store.state.requesttime);
      var url = this.$store.state.requrlnew+'/dapp';
      console.log(url);
      Axios.post(
        url,
        {
          "blockchain": this.$store.state.appid.split("_")[0].toLowerCase(),
          "dapp_id":this.$store.state.appid,
          "begin": this.begintime/1000,
          "end": this.endtime/1000+86400,
          "type":"call"
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res)
                                        res.data.msg.data.forEach((a,bb) => {
                                            if(bb < res.data.msg.data.length -1){
                                                this.arr2.unshift(a)
                                            }
                                            
                                        })
                                        res.data.msg.data.forEach((a,bb) => {
                                            if(bb < res.data.msg.data.length -1){
                                                this.arr1.unshift(a)
                                            }
                                        
                                        })
                                        this.arr2.forEach(e => {
                                            var ddd = new Date(e.timestamp*1000-86400000)
                                            var year = ddd.getFullYear()
                                            var month = ddd.getMonth()+1
                                            var day=ddd.getDate();
                                            this.xarr.unshift(year+'/'+month+'/'+day)
                                            this.usearr.unshift(e.day_call)
                                        });
                                        console.log(this.xarr)
                                        this.$store.commit('changeloadopacty',false)
        
      });
    }
  }
};
</script>

<style scoped>
input{  
	background:none;  
	outline:none;  
	border:0px;  
}
.time {
  font-size: 0.26rem;
  color: #797b8e;
  margin-top: 0.5rem;
  line-height: 0.6rem;
  text-align: left;
}
.time span {
  margin-right: 0.3rem;
}
.preview {
  font-size: 0.36rem;
  color: #525864;
  font-weight: 600;
  text-align: left;
  margin-top: 0.8rem;
  margin-bottom: 0.4rem;
}
.timein {
  float: left;
  font-size: 0.26rem;
  color: #797b8e;
  line-height: 0.6rem;
  margin-bottom: 0.2rem;
  margin-right: 0.3rem;
}
.timebox {
  height: 0.6rem;
  width: 3.2rem;
  border-radius: 0.3rem;
  border: 1px solid #dfe4ed;
  padding: 0 0.2rem;
  float: left;
}
.confram {
  width: 1.35rem;
  height: 0.6rem;
  background-color: #2a79f9;
  border-radius: 0.06rem;
  position: absolute;
  right: 0;
  top: 0.43rem;
  line-height: 0.6rem;
  font-size: 0.26rem;
  color: #ffffff;
}
.picture {
  background-color: #ffffff;
  overflow-x: scroll;
}
.mychart {
  width: 20rem;
  height: 100%;
}

.tableout {
  background-color: #ffffff;
  overflow-x: scroll;
}
.table {
  width: 20rem;
}
.table li {
  float: left;
  box-sizing: border-box;
}
.all {
  height: 1.6rem;
  line-height: 1.6rem;
  padding: 0 0.3rem;
  font-size: 0.3rem;
  color: #797b8e;
  border-bottom: 1px solid #dfe4ed;
}
.table li:nth-of-type(1) .all {
  width: 2.3rem;
}
.titletop {
  font-size: 0.3rem;
  color: #464a58;
  background-color: #f7fafc;
  font-weight: 600;
  border-bottom: 2px solid rgb(235, 236, 240);
}
.botpage {
  height: 1.6rem;
  background-color: #fff;
  padding-top: 0.4rem;
  padding-left: 0.4rem;
  padding-right: 0.4rem;
}
.pre {
  width: 1.3rem;
  height: 0.6rem;
  border: 1px solid #dfe4ed;
  font-size: 0.22rem;
  color: #797b8e;
  float: left;
  margin-right: 0.3rem;
  line-height: 0.6rem;
}
.rightpage {
  float: right;
  font-size: 0.22rem;
  color: #797b8e;
}
</style>

<style>
.rightpage .el-select .el-input__inner{
    width: 1.6rem;
    height: 0.6rem;
}
.rightpage .el-select .el-input .el-select__caret{
    line-height: 0.6rem;
}
.demo-date-picker {
  margin: 8px;
}
.picker-toolbar{
  height: 1rem;
  line-height: 1rem;
  font-size:0.44rem;
  color:#2a79f9;
}
.picker-slot {
  float: left;
}
.picker-items {
  overflow: hidden;
  display: flex;
  font-size:0.44rem;
  position: relative;
  justify-content: space-around;
}
.picker-toolbar {
  display: flex;
  justify-content: space-around;
}
.picker-center-highlight {
  position: absolute;
  width: 100%;
  top: 125px;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  background-color: rgba(42, 121, 249,0.1);
}

</style>
