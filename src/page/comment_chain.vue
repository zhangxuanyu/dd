<template>
    <div class="out"  :style="{marginLeft:theleft,minWidth: '1144px'}">
        <!-- <p class="alltitle">{{toparr[$store.state.alllang]}}</p> -->
        
        <div class="ranktb"  style="">
            
            <div class="top" style="font-weight:600;color:#212229;margin-bottom:30px;">
                 {{toparr[0][$store.state.alllang]}}
                <the-time></the-time>

            </div>
            <table  width="100%" cellspacing='0' style="text-align: center;">
                <tr class="top" style="color: #464a58;background-color:#f7fafc;">
                    <th  v-for="(item,index) in titlearr" class="title all" 
                    :style="{width:stylearr[index],borderBottom:'2px solid #ebecf0'}" 
                    :class="{cur:rankpic_arr[ranknum[index]]}" 
                    :key="index"
                    @click="rankdata(index)"
                    >
                        {{item[$store.state.alllang]}}  
                        <img :src="rankpic_arr[ranknum[index]]" alt="" style="width:6px;height:12px;vertical-align: -1px;margin-left:6px;" v-if="rankpic_arr[ranknum[index]]" >
                    </th>
                </tr>
                <tr class="top pd" v-for="(item,index) in chainarr" :key="index">
                    <td class="title all" :style="index == chainarr.length -1 ?{border:'none'}:''">{{index+1+(currentPage1-1)*10}}</td>


                    <!-- icon选择 -->
                    <td class="title all hhvv cur " @click="gotodetail(item.blockchain)" :style="index == chainarr.length -1 ?{border:'none'}:''"><div class="ttimg picfalse">
                        <img :src="'../../static/'+item.blockchain.toUpperCase()+'-1.png'" alt="" style="width:26px;height:26px;position:absolute;">
                    </div>{{item.blockchain.toUpperCase()}}</td>
                    <td class="title all" :style="index == chainarr.length -1 ?{border:'none'}:''">{{conversion(item.chain_new_user.toString())}}</td>
                    <td class="title all" :style="index == chainarr.length -1 ?{border:'none'}:''">{{conversion(item.chain_active_user.toString())}}</td>
                    <td class="title all" :style="index == chainarr.length -1 ?{border:'none'}:''">{{conversion(item.chain_day_vol.toFixed(2))}}</td>
                    <td class="title all" :style="index == chainarr.length -1 ?{border:'none'}:''">{{conversion(item.chain_day_call.toString())}}</td>
                    <td class="title all" :style="index == chainarr.length -1 ?{border:'none'}:''">{{conversion(item.dapp_vol.toFixed(2))}}</td>
                    <td class="title all" :style="index == chainarr.length -1 ?{border:'none'}:''">{{conversion(item.dapp_call.toString())}}</td>
                </tr>
            </table>
           
            <!-- <div style="width:400px;height:50px;margin:0 auto;margin-top:40px;"  v-if="chainarr.length>=1">
                <span style="float:left;margin-top:7px;font-size:12px;color:#4f5f6e;" v-if="$store.state.alllang == 0">共 {{all}} 条</span>
                <span style="float:left;margin-top:7px;font-size:12px;color:#4f5f6e;" v-if="$store.state.alllang == 1">Total {{all}} items</span>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-size="10"
                    layout="prev, pager, next"
                    :total="all" style="width:200px;float:left;">
                </el-pagination>
            </div> -->
            
        </div>

        <!-- 曲线图 -->
        <div class="picture">
            <p style="margin-right: -15px;margin-bottom:60px;"><span class="left lefttips">{{toparr[1][$store.state.alllang]}}</span>
            <el-select v-model="type"   class="right cur righttype" >
                    <el-option :key="index" :label="item[$store.state.alllang]" :value="index" v-for="(item,index) in typearr1">{{item[$store.state.alllang]}}</el-option>
                </el-select>
                <span style="margin-left:40px;margin-right:14px;font-size:14px;lineHeight:30px;"  class="right cur righttype">{{toparr[2][$store.state.alllang]}}</span>
                
            </p>
            <div id="mychart" style="min-width:400px;height:400px"></div>
        </div> 
        
    </div>
</template>

<script>
import theSel from '../components/type_money'
import theTime from '../components/time_type'
import Axios from 'axios';
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);
export default {
    components:{
               theSel,theTime
            },
            data(){
                return{
                    toparr:[['公链数据','Chain'],['整体趋势','Trend'],['其他','Other']],
                    titlearr:[[' ',' '],['名称','Name'],['新增用户','New Users'],['活跃用户','Active Users'],['交易量','Volume'],['调用次数','Transactions'],['Dapp交易量','Dapp Vol'],['Dapp调用次数','Dapp Tx']],
                    // 排序功能图片数组
                    rankpic_arr:[
                        '../../static/sort1.png','../../static/sort2.png','../../static/sort3.png'
                        ],
                    // 排序功能控制数组 
                    ranknum:[-1,-1,0,0,0,0,-1,-1],
                    arr:[],
                    chainarr:[
                        // {
                        //     "blockchain": "eth",
                        //     "chain_day_call": 8197,
                        //     "chain_new_user": 907,
                        //     "chain_active_user": 907,
                        //     "timestamp": 1526832000,
                        //     "chain_day_vol": 39469.070700464865,
                        //     "dapp_call": 2790,
                        //     "dapp_vol": 609.9636106634775
                        // },{
                        //     "blockchain": "eos",
                        //     "chain_day_call": 8197,
                        //     "chain_new_user": 907,
                        //     "chain_active_user": 907,
                        //     "timestamp": 1526832000,
                        //     "chain_day_vol": 39469.070700464865,
                        //     "dapp_call": 2790,
                        //     "dapp_vol": 609.9636106634775
                        // },{
                        //     "blockchain": "nas",
                        //     "chain_day_call": 8197,
                        //     "chain_new_user": 907,
                        //     "chain_active_user": 907,
                        //     "timestamp": 1526832000,
                        //     "chain_day_vol": 39469.070700464865,
                        //     "dapp_call": 2790,
                        //     "dapp_vol": 609.9636106634775
                        // }
                    ],
                    currentPage1: 1,
                     //请求数组
                    stylearr:['','','100px','','','',''],
                    all:3,
                    theleft:'280px',
                    idimg:'',
                    // 图表重绘
                    redrawflag: true,
                    //分类
                    type:2,
                    typearr1:[["新增用户","New User"],["交易量","Volume"],["调用次数","Transactions"],["Dapp交易量","Dapp Vol"],["Dapp调用次数","Dapp Tx"]],
                    //x轴
                    xarr:[],
                    //试验数据
                    etharr:[121,323,344,345,344,23,678,798,64,436],
                    nasarr:[151,567,234,33,356,235,67,98,364,36],
                    eosarr:[171,678,679,789,797,723,378,298,864,736],
                    bbarr:[171,678,679,789,797,723,378,298,864,736],
                    //画图数组
                    drawarr:[
                        // {word:'eth',arr:this.etharr},
                        // {word:'nas',arr:this.nasarr},
                        // {word:'eos',arr:this.eosarr},
                        // {word:'bbarr',arr:this.bbarr}
                    ]
                }
            },
            computed:{
                //监听时间和币种的改变
                themoney(){
                    return this.$store.state.moneyty
                },
                thetime(){
                    return this.$store.state.requesttime
                },
                inleft(){
                    return this.$store.state.themenuflag
                },
                thelang(){
                    return this.$store.state.alllang 
                }
            },
            watch:{
                themoney(n,o){
                    this.currentPage1 = this.$store.state.yourpage
                    this.fornew()
                },
                thetime(n,o){
                    this.fornew()
                },
                inleft(n,o){
                    console.log(n)
                    this.cglf(n)
                    var newchart = setInterval(()=>{
                            window.trend.reflow()
                        },17)
                        setTimeout(()=>{
                            clearInterval(newchart)
                        },1010)
                },
                redrawflag() {
                    setTimeout(() => {
                        this.initChart(this.xarr,this.drawarr)
                    }, 1000);
                },
                type(n,o){
                    console.log(n)
                    setTimeout(() => {
                        this.initChart(this.xarr,this.drawarr)
                    }, 1000);
                },
                thelang(){
                    setTimeout(() => {
                        this.initChart(this.xarr,this.drawarr)
                    }, 1000);
                }
                
            },
            created(){
                this.$store.commit('changeloadopacty',true)
                this.$store.commit('changeloadflge',true)
                setTimeout(()=>{
                    this.fornew()
                },50)
                this.cglf(this.$store.state.themenuflag)
                this.currentPage1 = this.$store.state.yourpage
            },
            
            methods:{
                initChart(arr1, argument) {
                    var obj = this.chart_series(argument)
                    console.log('-----------------------')
                    console.log(obj)
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
              format: "{value}"
            },
            title: {
              text: this.typearr1[this.type][this.$store.state.alllang]
            }
          }
        ],
        tooltip: {
          shared: true
        },
        series: obj
      };
      window.trend = Highcharts.chart("mychart", options1);

      window.onresize = function() {
        // chart.reflow();
        window.trend.reflow();
      };
    },
    //根据数组的长度，组装chart参数
    chart_series(argument){
        // arguments的数据类型
        // arguments = [
        //     {
        //         word:"eos",
        //         arr:[],
        //         visible: false
        //     },
        //     {
        //         word:"nas",
        //         arr:[]
        //     }
        // ]
        var series_obj = []
        argument.forEach((e,index) => {
            console.log(index)
            series_obj.push({
                name: e.word.toUpperCase(),
                data: e.arr[this.type],
                type: "spline",
                visible:index<=2?true:false
            })
        });
        return series_obj
    },
                rankdata(index){
                    console.log(this.ranknum[index])
                    if(index>1&&index<6){
                        if(this.ranknum[index] == 0){
                            this.ranknum=[-1,-1,0,0,0,0,-1]
                            this.ranknum[index] = 1
                        }else if(this.ranknum[index] == 1){
                            this.ranknum=[-1,-1,0,0,0,0,-1]
                            this.ranknum[index] = 2
                        }else if(this.ranknum[index] == 2){
                            this.ranknum=[-1,-1,0,0,0,0,-1]
                            this.ranknum[index] = 1
                        }
                        
                    }
                },
                //数字字符串添加逗号
                conversion(str){
                    if(/\./.test(str)){
                        return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
                    }else{
                        return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
                    }
                },
                //排序方法
                rankarr(num,string){
                    if(1 == num ){
                //         //从小到大
                        this.arr.sort(function(a,b){
                            return  a[string]-b[string]
                        })
                    }else{
                //         //从大到小
                        this.arr.sort(function(a,b){
                            return b[string]-a[string]
                        })
                    }
                    
                },
                cglf(n){
                    if(n){
                        this.theleft='280px'
                    }else{
                        this.theleft='100px'
                    }
                },
                handleSizeChange(val) {
                    console.log(`每页 ${val} 条`);
                },
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                    this.$store.commit('savepage',val)
                    this.fornew()
                },
                gotodetail(a){
                    this.$router.push({path:'/chaindetail?id='+a});
                },
                //请求数据函数
                fornew(){
                    this.arr = ''
                    this.xarr = []
                    console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    var url =  this.$store.state.requrlnew+'/chain/rank';
                    Axios.post(url,{
                                        "page_num":this.currentPage1,
                                        "timestamp":this.$store.state.requesttime/1000+86400,
                                        "order":'chain_new_user',
                                        "page_size":30
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        this.all = res.data.msg.search.length
                                        // this.arr = res.data.msg.info
                                        // this.rankarr(1,'rank_order')
                                        this.drawarr = []
                                        res.data.msg.day30.forEach((e)=>{
                                            this.drawarr.push({
                                                "word":e.blockchain,
                                                "arr":[
                                                    [],
                                                    [],
                                                    [],
                                                    [],
                                                    []
                                                ]
                                            })
                                            
                                                e.day30.forEach(el => {
                                                    var ddd = new Date(el.timestamp*1000)
                                                    var year = ddd.getFullYear()
                                                    var month = ddd.getMonth()+1
                                                    var day=ddd.getDate();
                                                    this.xarr.unshift(year+'/'+month+'/'+day)
                                                    this.drawarr[this.drawarr.length-1]["arr"][0].unshift(el.chain_new_user)
                                                    this.drawarr[this.drawarr.length-1]["arr"][1].unshift(el.chain_day_vol)
                                                    this.drawarr[this.drawarr.length-1]["arr"][2].unshift(el.chain_day_call)
                                                    this.drawarr[this.drawarr.length-1]["arr"][3].unshift(el.dapp_vol)
                                                    this.drawarr[this.drawarr.length-1]["arr"][4].unshift(el.dapp_call)
                                                });
                                            
                                            
                                        })
                                        console.log('++++++++++++++++++++++++++++++++++++++')
                                        console.log(this.drawarr)
                                        this.chainarr = res.data.msg.search
                                        this.$store.commit('changeloadopacty',false)
                                        this.redrawflag = !this.redrawflag;
                                    })
                }
            }
}
</script>

<style scoped>
table {
     table-layout:fixed;
     }
table td{
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis;
    }   
.out{
    margin-left: 330px;
    margin-top: 100px;
    padding-left: 1px;
    transition: all 0.5s;
}
.alltitle{
    margin-bottom: 30px; 
    text-align: left;
    font-size: 24px;
    color: #c1c7cd;
}
.ranktb{
     width: 98%;
     padding-bottom: 59px;
     background-color: #fff;
     padding: 28px 30px 30px 30px;
     box-sizing: border-box;
     margin-top: 25px;
     box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
}
.top{
    font-size: 16px;
    color: #797b8e;
    box-sizing: border-box;
    text-align: left;
}
.title{
    /* float: left; */
}
.ttimg{
    width:26px;
    height:26px;
    border-radius: 13px;
    /* background-image:url(../../static/all1.png); */
    overflow: hidden;
    display:inline-block;
    margin-top:5px;
    vertical-align:-5px;
    margin-right:10px;
    position: relative;
}
.bg{
   
}
.pd{
    padding-left: 0px;
}
.all{
    text-align: right;
    font-size: 14px;
    height: 71px;
    padding-right: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebecf0;
    white-space: nowrap;
    position: relative;
}
.all:nth-of-type(1){
    width: 100px;
    text-align: center;
}
.all:nth-of-type(2){
    text-align: left;
}
.pd:hover{
    background-color: #fafbfc;
}

.hhvv:hover{
    color: #409efe;
}
.mgt{
    position: absolute;
    top: 27px;
    left: 27px;
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
#mychart {
  width: 100%;
  height: 500px;
}

</style>

<style>
.el-pager li{
    background: rgba(0,0,0,0)!important;
}
.el-pagination .btn-next, .el-pagination .btn-prev{
    background: rgba(0,0,0,0)!important;
}
.el-pagination{
    font-weight:400;
}
.el-icon-date:before {
    content: "";
}
.el-input__inner{
    border: 1px solid #edeff7;
}
.el-input__inner:hover{
    border-color:#edeff7;
}
.el-pager li.active{
    color:rgb(73,165,251);
}
.el-pager li:hover{
    color:#49a5fb;
}
</style>
