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
        <div class="timein">
          <span :style="$store.state.alllang == 1?{float:'left',marginRight:'0.5rem'}:{float:'left',marginRight:'0.3rem'}" >{{ttarr[6][$store.state.alllang]}}</span>
          <input type="text" id="last_date" v-model="timevalue1"  style="float:left;color:#797b8e;width: 3.2rem;text-align:center;height: 0.6rem;border: 1px solid #dfe4ed;border-radius: 0.3rem;box-sizing: border-box;"/>
        </div>

          <div class="confram" @click="request()">
            {{ttarr[7][$store.state.alllang]}}
          </div>
        </div>
        
       
        
         <p class="preview">{{ttarr[3][$store.state.alllang]}}</p> 

        <div style="padding:0.8rem 0.4rem 0.5rem 0.4rem;background-color:#FFF;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
        <div class="picture">   
          <div class="mychart" id="actuser"></div>
        </div>
        </div>





         <p class="preview">{{ttarr[2][$store.state.alllang]}}</p> 
         <div style="padding:0.8rem 0.4rem 0.5rem 0.4rem;background-color:#FFF;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
        <div class="picture">   
          <div class="mychart" id="newuser"></div>
        </div>  
        </div>


        <!-- 活跃用户 -->
         <p class="preview">{{ttarr[0][$store.state.alllang]}}</p>  
         
         <div style="padding:0.8rem 0.4rem 0.5rem 0.4rem;background-color:#FFF;margin-bottom:0.8rem;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
        <div class="picture">   
          <div class="mychart" id="alluser"></div>
        </div>
        </div>


        <p class="preview">{{ttarr[8][$store.state.alllang]}}</p>  
        <div style="padding:0.4rem;background-color:#FFF;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
        <div class="tableout">
            <ul class="table">
                <li v-for="(item,index) in titlearr" :key="index">
                    <div  class="all titletop" :style="index == 1?{textAlign:'left'}:{}">
                        {{item[$store.state.alllang]}} 
                    </div>



                    <div class="all" v-if="index == 0&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in arr" :key="idx" >
                       {{timeuse(it.timestamp-68400)}}
                    </div>
                    <div class="all" v-if="index == 1&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in arr" :key="idx" >
                       {{conversion(it.new_user.toString())}}
                    </div>
                    <div class="all" v-if="index == 2&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in arr" :key="idx">
                        {{conversion(it.active_user.toString())}}
                    </div>
                    <div class="all" v-if="index == 3&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in arr" :key="idx">
                        {{conversion(it.week_user.toString())}}
                    </div>
                     <div class="all" v-if="index == 4&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in arr" :key="idx">
                        {{conversion(it.month_user.toString())}}
                    </div>
                    <div class="all" v-if="index == 5&&idx<thepage*thepagesize&&idx>=(thepage-1)*thepagesize" v-for="(it,idx) in arr" :key="idx">
                        {{conversion(it.total_user.toString())}}
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
        ["累计用户", "Total Users"],
        ["时间段", "Period"],
        ["新增用户", "New users"],
        ["活跃用户", "Active Users"],
        ["用户分析", "User Analysis"],
        ["开始时间", "Begin Time"],
        ["结束时间", "End Time"],
        ["确定", "confirm"],
        ["用户数据", "User Data"]
      ],
      titlearr:[['日期','Date'],['新增用户','New users'],['日活跃','DAU'], ['周活跃用户','WAU'],['月活跃用户','MAU'],['累计用户','Total Users']],
      date: "",
      pickerValue: "",
      pickerValue1: "",
      dateTime: "",
      dateTime1: "",
      begintime:'',
      endtime:'',
      xarr: [],
      userarr: [],
      addarr: [],
      newarr: [],
      actarr: [],
      arr:[],
      fornewflag:false,
      thepagesize:10,
      thepage:1,
      thepage1:1,
      toparr:[['综合排行','Rankings'],['上一页','pre'],['下一页','next'],['第','page'],['页','']],
      titlearr1:[['日期','Date'],
                  ['日活跃用户','DAU '],
                  ['日活跃率','DAU(Rate)'], 
                  ['周活跃用户','WAU'],
                  ['周活跃率','WAU(Rate)'],
                  ['月活跃用户','MAU'],
                  ['月活跃率','MAU(Rate)'],
                  ['流失用户','Churn'],
                  ['流失率','Churn(Rate)'],
                            ],
      timevalue:'',
      timevalue1:''
    };
  },
  created(){
     var now = new Date(new Date().setHours(0, 0, 0, 0)) - 0
            var now1 = now -  86400000 * 14
            //小时,分钟，秒，毫秒
            //凌晨2点50分50秒0毫秒
            console.log(now)
            console.log(now1)
            // 请求时间
            this.begintime = now1;
            this.endtime = now-86400000;
            console.log(new Date(now1))
            this.pickerValue = new Date(this.begintime)
            this.pickerValue1 = new Date(this.endtime)
            // 显示时间
            this.timevalue = this.timeday(new Date(this.begintime))
            this.timevalue1 = this.timeday(new Date(this.endtime))
            setTimeout(()=>{
                    this.fornew()
            },50)
  },
  mounted() {
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
  computed:{
    thelang(){
          return this.$store.state.alllang 
        }
  },
  watch: {
    thelang(){
      this.drawall()
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
    request(){
      if(this.begintime>this.endtime){
        var time = this.begintime
        this.begintime = this.endtime
        this.endtime = time
        var showtime = this.timevalue
        this.timevalue = this.timevalue1
        this.timevalue1 = showtime
      }
      this.fornew()
    },
    runpage1(add){
      this.thepage1 = this.thepage1 + add
    },
    runpage(add){
      this.thepage = this.thepage + add
    },
    //数字字符串添加逗号
                conversion(str){
                    if(/\./.test(str)){
                        return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
                    }else{
                        return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
                    }
                },
    drawall() {
      setTimeout(() => {
        this.drawuser(
          "alluser",
          this.xarr,
          this.userarr,
          this.addarr,
          "allusechart"
        );
      }, 1000);
      setTimeout(() => {
        this.drawuser1(
          "newuser",
          this.xarr,
          this.newarr,
          this.ttarr[2][this.$store.state.alllang],
          "newuser"
        );
      }, 1000);
      setTimeout(() => {
        this.drawuser1(
          "actuser",
          this.xarr,
          this.actarr,
          this.ttarr[3][this.$store.state.alllang],
          "actuser"
        );
      }, 1000);
    },
    drawuser(aa, arr1, arr2, arr3, windname) {
      var options = {
        //hchart的参数
        chart: {
          zoomType: "xy"
        },
        colors: ["#409efe", "#00e175", "#ff0a50", "black"],
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
              text: this.titlearr[5][this.$store.state.alllang],
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
            name: this.titlearr[5][this.$store.state.alllang],
            data: arr2,
            type: "spline"
          }
        ]
      };
      // this.chart = new Highcharts.Chart(chartContainer, options)
      window[windname] = Highcharts.chart(aa, options);

      window.onresize = function() {
        window[windname].reflow();
      };
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
      return year + "/" + month + "/" + day;
    },
    timeuse(aaa){
            var ddd = new Date(aaa*1000)
            var year = ddd.getFullYear()
            var month = ddd.getMonth()+1
            if(month < 10){
                month = '0' + month
            }
            var day=ddd.getDate();
            if(day < 10){
                day = '0' + day
            }
            return year+'-'+month+'-'+day
        },
    //数据请求
    fornew() {
      this.xarr = [];
      this.userarr = [];
      this.addarr = [];
      this.newarr = [];
      this.actarr = [];
      this.arr = [];
      console.log(this.$store.state.moneyty, this.$store.state.requesttime);
      var url = this.$store.state.requrlnew+'/dapp';
      console.log(url);
      Axios.post(
        url,
        {
          // dapp_id: this.$store.state.appid,
          // start: this.begintime / 1000,
          // last: this.endtime / 1000 + 86400

          "blockchain": this.$store.state.appid.split("_")[0].toLowerCase(),
          "dapp_id":this.$store.state.appid,
          "begin": this.begintime/1000,
          "end": this.endtime/1000+86400,
          "type":"user"
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res.data.msg);
        res.data.msg.data.forEach((a, bb) => {
          if (bb < res.data.msg.data.length - 1) {
            this.arr.unshift(a);
          }
        });
        console.log(this.arr);
        this.arr.forEach(e => {
          var ddd = new Date(e.timestamp * 1000 - 86400000);
          var year = ddd.getFullYear();
          var month = ddd.getMonth() + 1;
          var day = ddd.getDate();
          this.xarr.unshift(year + "/" + month + "/" + day);
          this.userarr.unshift(e.total_user);
          this.addarr.unshift((e.total_rate * 100).toFixed(3) - 0);
          this.newarr.unshift(e.new_user);
          this.actarr.unshift(e.active_user);
        });
        this.drawall();
        this.$store.commit("changeloadopacty", false);
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
.confram{
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


.tableout{
	  background-color: #ffffff;
    overflow-x: scroll;
}
.table{
    width: 20rem;
}
.table li{
    float: left;
    box-sizing: border-box;
}
.all{
    height: 1.6rem;
    line-height: 1.6rem;
    padding: 0 0.3rem;
    font-size: 0.3rem;
	color: #797b8e;
    border-bottom: 1px solid #dfe4ed;
}
.table li:nth-of-type(1) .all{
    width: 2.3rem;
}
.titletop{
    font-size: 0.3rem;
	color: #464a58;
    background-color: #f7fafc;
    font-weight: 600;
    border-bottom: 2px solid rgb(235, 236, 240);
}
.botpage{
    height: 1.6rem;
    background-color: #fff;
    padding-top: 0.4rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
}
.pre{
    width: 1.3rem;
	height: 0.6rem;
	border: 1px solid #dfe4ed;
    font-size: 0.22rem;
	color: #797b8e;
    float: left;
    margin-right: 0.3rem;
    line-height: 0.6rem;
}
.rightpage{
    float:right;
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
