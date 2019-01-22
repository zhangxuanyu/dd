<template>
    <div class="out" :style="{marginLeft:theleft,minWidth: '1144px'}">
        <the-sel></the-sel>

        <div class="picture">
            <p style="margin-right: -15px;margin-bottom:60px;">
                <span class="left lefttips">trend</span>
                <el-date-picker 
                    v-model="value1" 
                    type="daterange" 
                    align="right" 
                    unlink-panels 
                    range-separator="--" 
                    start-placeholder="开始日期" 
                    end-placeholder="结束日期" 
                    :picker-options="pickerOptions2" 
                    style="font-size:16px;margin-right:10px;" class="right cur righttype">
                </el-date-picker>
                <span style="margin-left:40px;margin-right:14px;font-size:14px;lineHeight:30px;"  class="right cur righttype">time</span>
            </p>
            <div id="trend1" style="min-width:400px;height:400px"></div>
        </div> 

        <div class="picture">
            <p style="margin-right: -15px;margin-bottom:60px;">
                <span class="left lefttips">active area</span>
            </p>
            <div id="activearea" style="min-width:400px;height:400px"></div>
        </div> 

        <div class="picture">
            <p style="margin-right: -15px;margin-bottom:60px;">
                <span class="left lefttips">active time</span>
            </p>
            <div id="activetime" style="min-width:400px;height:400px"></div>
        </div> 
    </div>
</template>

<script>
import theSel from '../components/type_money'
import Axios from 'axios';
export default {
    components:{
               theSel
            },
    data(){
        return{
            theleft: "280px",
            value1:'',
            value2:'',
            reqarr:['eth','eos','nas','tron','neo','qtum','gxchain'],
            active_xarr:[],
            activearr:[],
            frequency_xarr:[],
            frequencyarr:[],
            period_xarr:[],
            periodarr:[],
            begintime : '',
            endtime : '',
            pickerOptions2: {
                shortcuts: [{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },

        }
    },
    created(){
        var now = new Date(new Date().setHours(0, 0, 0, 0)) - 0
            var myDate = new Date();
            console.log(myDate.getHours());
            if(myDate.getHours()<=9){
                now = now - 86400000
            }
            console.log(now)
            var now1 = now -  86400000 * 14
            //小时,分钟，秒，毫秒
            //凌晨2点50分50秒0毫秒
            console.log(now)
            console.log(now1)
            this.begintime = now1;
            this.endtime = now-86400000;
        this.value1 = [this.begintime,this.endtime]
        this.fornewactive()
        this.fornewperiod()
        this.fornewfrequency()
    },
    mounted(){
        this.laychart()
    },
    computed: {
    //监听时间和币种的改变
    themoney() {
      return this.$store.state.moneyty;
    },
    inleft() {
      return this.$store.state.themenuflag;
    },
    thelang() {
      return this.$store.state.alllang;
    }
  },
    watch: {
    themoney(n, o) {
        this.fornewactive()
        this.fornewperiod()
        this.fornewfrequency() 
    },
    value1(n,o){
        console.log(n)
            var date1 = new Date(n[0]);
            var date2 = new Date(n[1]);
            date1.setHours(0, 0, 0, 0);
            date2.setHours(0, 0, 0, 0);
            // 有三种方式获取，在后面会讲到三种方式的区别
            this.begintime = date1.getTime();
            this.endtime = date2.getTime();
        this.fornewperiod()
        
    },
    inleft(n, o) {
      console.log(n);
      this.cglf(n);
      var newchart = setInterval(() => {
         window.activetime.resize();
         window.trend1.resize();
         window.activearea.resize();
      }, 100);

      setTimeout(() => {
        clearInterval(newchart);
      }, 1500);
    },
    thelang() {
      this.drawall()
    }
  },
    methods:{
        drawall(){
            setTimeout(()=>{
                this.laychart(this.active_xarr,this.activearr)
            },1000)
            setTimeout(()=>{
                this.initChart(this.period_xarr,this.periodarr,'trend1','trend1')
            },1000)
            setTimeout(()=>{
                this.initChart(this.frequency_xarr,this.frequencyarr,'activearea','activearea')
            },1000)

        },
         //排序方法
        rank(num,string,arr){      
            var list = arr
            var endarr = ''
                if(-1 == num ){
                    //从小到大
                    endarr = list.sort(function(a,b){
                        return  a[string]-b[string]
                    })
                }else{
                    //从大到小
                    endarr = list.sort(function(a,b){
                        return  b[string]-a[string]
                    })
                }
            return endarr
        },
        cglf(n) {
            if (n) {
                this.theleft = "280px";
            } else {
                this.theleft = "100px";
            }
        },
        initChart(arr1, argument,id,windowname) {
        //   var  argument=[{
        //         name: e.word.toUpperCase(),
        //         data: e.arr,
        //         type: "line",
        //         smooth: true
        //     },{
        //         name: e.word.toUpperCase(),
        //         data: e.arr,
        //         type: "line",
        //         smooth: true
        //     },{
        //         name: e.word.toUpperCase(),
        //         data: e.arr,
        //         type: "line",
        //         smooth: true
        //     }]
      var lgarr = []
      var yAxisarr = []
    //   var lgselect = {}
      argument.forEach((e,index) => {
        lgarr.push(
            {
                name: this.reqarr[this.$store.state.moneyty],
                data: e,
                type: "line",
                yAxisIndex:index,
                smooth: true
            }
        )
        yAxisarr.push(
            {
                        type: 'value',
                        splitLine:{
                          lineStyle:{
                            color:'#ebecf0'
                          }
                        },
                        axisLine: {
                            lineStyle: {
                                type: 'solid',
                                color:'#ebecf0',
                                width:'1'
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: '#000',//坐标值得具体的颜色
        
                            }
                        }
                    }
        )

        // if(index >= 3){
        //   lgselect[e.name]=false
        // }
      });
      var colors = ["#4da7fb", "#27d0ab", "#f86677","#f8c366","#b266f8","#666df8","#66f893","#f88166","#66e5f8","#f866ca"]
      var echarts = require('echarts');
      window[windowname] = echarts.init(document.getElementById(id));
      var option = {
                tooltip: {
                    trigger: 'axis',
                    textStyle:{
                      align:'left'
                    }
                },
                
                legend: {
                    // data:argument,
                    // selected:lgselect,
                    bottom:30,
                    itemGap:50
                },
                grid:{
                  bottom:100,
                  top:20,
                  left:40,
                  right:40
                },
                xAxis: {
                    type: 'category',
                    data: arr1,
                    axisLine: {
                        lineStyle: {
                            type: 'solid',
                            color:'#ebecf0',
                            width:'1'
                        }
                    },
                    axisLabel: {
                        textStyle: {
                            color: '#000',//坐标值得具体的颜色
    
                        }
                    }
                },
                yAxis: yAxisarr,
                series: lgarr,
                color: colors
            };
            window[windowname].setOption(option,true)
             window.addEventListener("resize",function(){
                    window[windowname].resize();
                });
            },
            //横柱状图
            laychart(xarr,arr){
                var echarts = require('echarts');
                window.activetime = echarts.init(document.getElementById('activetime'));
                var  option = {
                    color: ['#3398DB'],
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'value'
                        }
                    ],
                    yAxis : [
                        {
                            type : 'category',
                            data : xarr,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                        
                    ],
                    series : [
                        {
                            name:'活跃天数',
                            type:'bar',
                            barWidth: '60%',
                            data:arr
                        }
                    ]
                };
                window.activetime.setOption(option,true)
                window.onresize = function() {
                    // chart.reflow();
                    // window.trend.reflow();
                    setTimeout(function(){
                    window.activetime.resize();
                    }, 50)
                };
            },
            fornewactive(){
                this.active_xarr = []
                this.activearr = []
                var url = this.$store.state.requrlv3+'/active';
                Axios.post(url,{
                                "blockchain":this.reqarr[this.$store.state.moneyty],
                                "limit":10
                            },{
                                headers: {'Content-Type': "application/x-www-form-urlencoded"}
                            }).then(res => {
                                console.log(res.data.msg.data)
                                
                                res.data.msg.data.forEach(e => {
                                    this.active_xarr.unshift(e.dapp_id)
                                    this.activearr.unshift(e.active_days)
                                });
                                setTimeout(()=>{
                                    this.laychart(this.active_xarr,this.activearr)
                                },1000)
                               
                            })
            },
            fornewperiod(){
                this.period_xarr=[]
                this.periodarr=[]
                var url = this.$store.state.requrlv3+'/period';
                Axios.post(url,{
                                "blockchain":this.reqarr[this.$store.state.moneyty],
                                "begin":this.begintime/1000,
                                "end":this.endtime/1000
                            },{
                                headers: {'Content-Type': "application/x-www-form-urlencoded"}
                            }).then(res => {
                                console.log(res.data.msg.data)
                                var arr = []
                                arr = this.rank(-1,'ts',res.data.msg.data)
                                this.period_xarr=[]
                                this.periodarr=[]
                                this.periodarr = [[],[]]
                                arr.forEach(e => {
                                    var ddd = new Date(e.ts * 1000);
                                    var year = ddd.getFullYear();
                                    var month = ddd.getMonth() + 1;
                                    var day = ddd.getDate();
                                    this.period_xarr.push(year + "/" + month + "/" + day)
                                    this.periodarr[0].push(e.period)
                                    this.periodarr[1].push(e.dapps)
                                });
                                setTimeout(()=>{
                                    this.initChart(this.period_xarr,this.periodarr,'trend1','trend1')
                                },1000)
                                
                            })
            },
            fornewfrequency(){
                this.frequency_xarr=[]
                this.frequencyarr=[]
                var url = this.$store.state.requrlv3+'/frequency';
                Axios.post(url,{
                                "blockchain":this.reqarr[this.$store.state.moneyty]
                            },{
                                headers: {'Content-Type': "application/x-www-form-urlencoded"}
                            }).then(res => {
                                console.log(res.data.msg.data.length)
                                this.frequencyarr.push([])
                                if(res.data.msg.data.length == 1){
                                    this.frequency_xarr = [0]
                                }else{
                                    var aa = (res.data.msg.data.length-1)/30
                                    var length = Math.ceil(aa)
                                    this.frequency_xarr = [0]
                                    for(let i = 1;i<length;i++){
                                        this.frequency_xarr.push((i-1)*30+'-'+i*30)
                                    }
                                    this.frequency_xarr.push('>'+(length-1)*30)
                                    
                                }
                                var count = 0
                                res.data.msg.data.forEach((e,index) => {
                                    if(index == 0){
                                        this.frequencyarr[0].push(e.count)
                                    }else if(index == res.data.msg.data.length - 1){
                                        count = count + e.count
                                        this.frequencyarr[0].push(count)
                                    }else {
                                        if(index%30 == 0){
                                            count = count + e.count
                                            this.frequencyarr[0].push(count)
                                            count = 0
                                        }else{
                                            count = count + e.count
                                        }
                                    }
                                    
                                });
                                console.log(this.frequencyarr[0])
                                setTimeout(()=>{
                                    this.initChart(this.frequency_xarr,this.frequencyarr,'activearea','activearea')
                                },1000)
                            })
            },
            fornew_active_frequency(){
                this.frequency_xarr=[]
                this.frequencyarr=[]
                var url = this.$store.state.requrlv3+'/active_frequency';
                Axios.post(url,{
                                "blockchain":this.reqarr[this.$store.state.moneyty]
                            },{
                                headers: {'Content-Type': "application/x-www-form-urlencoded"}
                            }).then(res => {
                                console.log(res.data.msg.data.length)
                                var count = 0
                                res.data.msg.data.forEach((e,index) => {
                                    if(index == 0){
                                        this.frequencyarr[1].push(e.count)
                                    }else if(index == res.data.msg.data.length - 1){
                                        count = count + e.count
                                        this.frequencyarr[1].push(count)
                                    }else {
                                        if(index%30 == 0){
                                            count = count + e.count
                                            this.frequencyarr[1].push(count)
                                            count = 0
                                        }else{
                                            count = count + e.count
                                        }
                                    }
                                    
                                });
                                console.log(this.frequencyarr[1])
                               
                            })
            },
    }        
}
</script>

<style scoped>
.out{
    margin-left: 330px;
    margin-top: 100px;
    padding-left: 1px;
    transition: all 0.5s;
}
.picture {
  width: 100%;
  height: 500px;
  background-color: #fff;
  margin-top: 30px;
  float: right;
  margin-right: 25px;
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
  height: 24px;
}
.right {
  float: right;
  margin: 0 15px;
}

</style>
<style>

.picture .el-range-editor.el-input__inner{
    border-radius: 20px;
    background-color: #f7f8fa;
}
.picture .el-range-editor .el-range-input{
    background-color: #f7f8fa;
}
 .picture .el-date-editor--daterange.el-input,.picture .el-date-editor--daterange.el-input__inner,.picture .el-date-editor--timerange.el-input,.picture .el-date-editor--timerange.el-input__inner{
    width:350px;
}
.picture .el-icon-date:before{
    content:'';
}
.picture .el-input__inner{
    border: 1px solid #f7f8fa;
    font-size:14px;
    color:#797b8e;
    height: 30px;
    line-height: 24px;
}
.picture .el-date-editor .el-range-separator{
    line-height: 24px;
}
.picture .el-input__inner:hover{
    border-color:#f7f8fa;
}
.picture .el-pager li.active{
    color:rgb(73,165,251);
}
.el-pager li:hover{
    color:#49a5fb;
}
.picture .el-pagination{
    font-weight:400;
}
</style>


