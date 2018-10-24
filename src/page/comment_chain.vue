<template>
    <div class="out"  :style="{marginLeft:theleft,minWidth: '1144px'}">
        <!-- <p class="alltitle">{{toparr[$store.state.alllang]}}</p> -->
        
        <div class="ranktb"  style="minHeight:955px;">
            <span style="line-height:800px;font-size:50px;">COMMING &nbsp;&nbsp;&nbsp; SOON...</span> 
            <div class="top" style="font-weight:600;color:#212229;margin-bottom:30px;" v-show="false">
                 {{toparr[0][$store.state.alllang]}}
                <the-time></the-time>

            </div>
            <table  width="100%" cellspacing='0' style="text-align: center;" v-show="false">
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
                <tr class="top pd" v-for="(item,index) in arr" :key="index">
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{index+1+(currentPage1-1)*10}}</td>


                    <!-- icon选择 -->
                    <td class="title all hhvv cur " @click="gotodetail(item.dapp_id)" :style="index == arr.length -1 ?{border:'none'}:''"><div class="ttimg picfalse" v-show="picfalt">
                        <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.dapp_id+'.jpg'" alt="" onerror="javascript:this.src=''" style="width:26px;height:26px;position:absolute;">
                         <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.title+'.jpg'" alt="" onerror="javascript:this.src='../../static/all1.png'" style="width:26px;height:26px;position:absolute;">
                    </div>{{item.title}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.new_user.toString())}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.active_user.toString())}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.vol.toFixed(2))}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.call.toString())}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.call.toString())}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.call.toString())}}</td>
                </tr>
            </table>
           
            <div style="width:400px;height:50px;margin:0 auto;margin-top:40px;"  v-if="arr.length>=1" v-show="false">
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
            </div>
            
        </div>

        <!-- 曲线图 -->
        <div class="picture" v-show="false">
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
                    toparr:[['公链数据','chain'],['整体趋势','Trand'],['其他','other']],
                    titlearr:[[' ',' '],['名称','Name'],['新增用户','New Users'],['活跃用户','Active Users'],['交易量','Volume'],['调用次数','Transactions'],['Dapp交易量','Dapp Trade'],['Dapp调用次数','Dapp Used']],
                    // 排序功能图片数组
                    rankpic_arr:[
                        '../../static/sort1.png','../../static/sort2.png','../../static/sort3.png'
                        ],
                    // 排序功能控制数组 
                    ranknum:[-1,-1,0,0,0,0,-1,-1],
                    arr:[],
                    allmoney:[['total','exchanges','games','high-risk','marketplaces','gambling','other'],['total','game','tool','exchange','other'],['total','Game','Tool','Market','Other']],
                    currentPage1: 1,
                     //请求数组
                    reqarr:['eth','eos','nas'],
                    reqAarr:['ETH','EOS','NAS'],
                    stylearr:['','','100px','','','',''],
                    all:'',
                    theleft:'280px',
                    idimg:'',
                    //是否有通过id命名的icon
                    picfalt:false,
                    // 图表重绘
                    redrawflag: true,
                    //分类
                    type:0,
                    typearr1:[["新增用户","New User"],["交易量","vol"],["调用次数","usetimes"],["Dapp交易量","Dapp trade"],["Dapp调用次数","Dapp Used"]],
                    //x轴
                    xarr:[1,2,3,4,5,6,7,8,9,10],
                    //试验数据
                    etharr:[121,323,344,345,344,23,678,798,64,436],
                    nasarr:[151,567,234,33,356,235,67,98,364,36],
                    eosarr:[171,678,679,789,797,723,378,298,864,736],
                    bbarr:[171,678,679,789,797,723,378,298,864,736]
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
                thetype(){
                    return this.$store.state.dapptype
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
                },
                thetype(n,o){
                    this.fornew()
                },
                redrawflag() {
                    setTimeout(() => {
                        this.initChart(this.xarr,[{word:'eth',arr:this.etharr},{word:'nas',arr:this.nasarr},{word:'eos',arr:this.eosarr},{word:'bbarr',arr:this.bbarr}])
                    }, 1000);
                },
                type(n,o){
                    console.log(n)
                    setTimeout(() => {
                        this.initChart(this.xarr,[{word:'eth',arr:this.etharr},{word:'nas',arr:this.nasarr},{word:'eos',arr:this.eosarr},{word:'bbarr',arr:this.bbarr}])
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
              text: "ETH"
            }
          }
        ],
        tooltip: {
          shared: true
        },
        series: obj
      };
      window.chartsss = Highcharts.chart("mychart", options1);

      window.onresize = function() {
        // chart.reflow();

        window.chartsss.reflow();
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
                name: e.word,
                data: e.arr,
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
                    this.all = []
                    this.arr = ''
                    this.picfalt = false
                    console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    var url =  this.$store.state.requrl+'/'+this.reqarr[this.$store.state.moneyty]+'/rank';
                    Axios.post(url,{
                                        "page":this.currentPage1,
                                        "timestamp":this.$store.state.requesttime/1000+86400,
                                        "order_by":'total',
                                        "category":this.allmoney[this.$store.state.moneyty][this.$store.state.dapptype]
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        this.all = res.data.msg.count
                                        this.arr = res.data.msg.info
                                        // this.rankarr(1,'rank_order')
                                        setTimeout(()=>{
                                            $('.picfalse').each((a)=>{
                                                if($('.picfalse').eq(a)[0].children[0].src.indexOf('jpg')!=-1){
                                                    $('.picfalse').eq(a)[0].children[1].style.width = '0px'
                                                }
                                            })
                                            this.picfalt = true
                                        },1000)
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
