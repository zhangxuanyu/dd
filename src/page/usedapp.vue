<template>
    <div class="out" :style="{minHeight:geth,marginLeft:mglf}">
        <min-menu class="leftme" :style="{left:open}"></min-menu>
        <div class="contright"> 

            <!-- 新用户数图表 -->
            <div class="dapp">
                <p style="overflow:hidden;"><span style="float:left;">{{ttarr[0][$store.state.alllang]}}</span> <span style="float:right;"><span style="margin-right:10px;">{{ttarr[1][$store.state.alllang]}}</span>
                        <el-date-picker
                            v-model="value7"
                            type="daterange"
                            align="right"
                            unlink-panels
                            range-separator="至"
                            start-placeholder="开始日期"
                            end-placeholder="结束日期"
                            :picker-options="pickerOptions2">
                        </el-date-picker>
                    </span>
                </p>
                <div id="usemun"  style="min-width:500px;height:500px"></div>

                <table  width="100%" cellspacing='0' style="text-align: center;">
                    <tr class="top bg pd">
                        <th  v-for="(item,index) in titlearr" class="title all topbt">{{item[$store.state.alllang]}}</th>
                    </tr>
                    <tr class="top pd" v-for="(item,index) in arr" v-if="index>=(currentPage1-1)*10&&index<currentPage1*10">
                        <td  class="title all" >{{timeuse(item.timestamp-86400)}}</td>
                        <td  class="title all" >{{conversion(item.day_call.toString())}}</td>
                        <td  class="title all" >{{conversion(item.total_call.toString())}}</td>
                        <td  class="title all" >{{conversion((item.call_rate*100).toFixed(2))}}%</td>
                    </tr>
                </table>
                <!-- <el-pagination
                    @current-change="newuserPage"
                    :current-page.sync="currentPage1"
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="arr.length" style="margin-top:40px;">
                </el-pagination> -->

                <div style="width:300px;height:50px;margin:0 auto;margin-top:40px;" >
                    <span style="float:left;margin-top:7px;font-size:12px;color:#4f5f6e;" v-if="$store.state.alllang == 0">共 {{arr.length}} 条</span>
                    <span style="float:left;margin-top:7px;font-size:12px;color:#4f5f6e;" v-if="$store.state.alllang == 1">Total {{arr.length}} items</span>
                    <el-pagination
                        @current-change="newuserPage"
                        :current-page.sync="currentPage1"
                        :page-size="10"
                        layout="prev, pager, next"
                        :total="arr.length" style="width:200px;float:left;">
                    </el-pagination>
                </div>

            </div>

            <!-- 活跃用户 -->
             <div class="dapp">
                 <p style="text-align:left;">{{ttarr[2][$store.state.alllang]}}</p>
                <table  width="100%" cellspacing='0' style="text-align: center;">
                    <tr class="top bg pd fixwd">
                        <th class="title all topbt">TxHash</th>
                        <th class="title all topbt" style="width:50px;" v-if="urlid == 'NAS'">Block</th>
                        <th class="title all topbt" style="width:120px;">Time</th>
                        <th class="title all topbt">From</th>
                        <th class="title all topbt">To</th>
                        <th class="title all topbt" style="width:40px;">Value</th>
                        <th class="title all topbt" style="width:80px;" v-if="urlid == 'NAS'">[TxFee]</th>
                    </tr>
                    <tr class="top pd fixwd" v-for="(item,index) in arr1" v-if="index>=(currentPage2-1)*10&&index<currentPage2*10">
                        <td class="title all fs"  v-if="urlid == 'NAS'">{{item.Tx_hash}}</td>
                        <td class="title all fs"  v-if="urlid == 'ETH'">{{item.TXHash}}</td>
                        <td class="title all fs"  v-if="urlid == 'EOS'">{{item.tx_hash}}</td>
                        <td class="title all fs" style="width:50px;"  v-if="urlid == 'NAS'">{{item.Data.block.height}}</td>
                        <td class="title all fs" style="width:120px;"  v-if="urlid == 'NAS'">{{timeuse1(item.Timestamp)}}</td>
                        <td class="title all fs" style="width:120px;"  v-if="urlid == 'ETH'">{{timeuse1(item.TimeStamp)}}</td>
                        <td class="title all fs" style="width:120px;"  v-if="urlid == 'EOS'">{{timeuse1(item.timestamp)}}</td>
                        <td class="title all fs"  v-if="urlid == 'NAS'">{{item.From_address}}</td>
                        <td class="title all fs"  v-if="urlid == 'ETH'">{{item.From}}</td>
                        <td class="title all fs"  v-if="urlid == 'EOS'">{{item.from}}</td>
                        <td class="title all fs"  v-if="urlid == 'NAS'">{{item.To_address}}</td>
                        <td class="title all fs"  v-if="urlid == 'ETH'">{{item.To}}</td>
                        <td class="title all fs"  v-if="urlid == 'EOS'">{{item.to}}</td>
                        <td class="title all fs" style="width:40px;" v-if="urlid == 'NAS'">{{(item.Val/1000000000000000000).toFixed(2)}}</td>
                        <td class="title all fs" style="width:40px;" v-if="urlid == 'ETH'">{{(item.Value/1000000000000000000).toFixed(2)}}</td>
                        <td class="title all fs" style="width:40px;" v-if="urlid == 'EOS'">{{parseFloat(item.value).toFixed(2)}}</td>
                        <td class="title all fs" style="width:80px;"  v-if="urlid == 'NAS'">{{(item.Data.txFee).toFixed(2)}}</td>
                    </tr>
                </table>
                <!-- <el-pagination
                    @current-change="actuserPage"
                    :current-page.sync="currentPage2"
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="arr1.length" style="margin-top:40px;">
                </el-pagination> -->

                <div style="width:300px;height:50px;margin:0 auto;margin-top:40px;" >
                    <span style="float:left;margin-top:7px;font-size:12px;color:#4f5f6e;" v-if="$store.state.alllang == 0">共 {{arr.length}} 条</span>
                    <span style="float:left;margin-top:7px;font-size:12px;color:#4f5f6e;" v-if="$store.state.alllang == 1">Total {{arr.length}} items</span>
                    <el-pagination
                        @current-change="actuserPage"
                        :current-page.sync="currentPage2"
                        :page-size="10"
                        layout="prev, pager, next"
                        :total="arr1.length" style="width:200px;float:left;">
                    </el-pagination>
                </div>
            </div>

             
        </div>
    </div>
</template>

<script>
import minMenu from '../components/rank'
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Axios from 'axios';

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
    components:{
            minMenu
        },
    data(){
            return{
                geth:'',
                value7: '',
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
                    ttarr:[['调用次数','Transactions'],['时间段','Period'],['实时调用','View List of Transactions']],
                    titlearr:[['日期','Date'],['当日调用笔数','Daily Transactions'],['总调用笔数','Transactions'], ['增长率','Growth Rate']], 
                    xarr:[],
                    usearr:[],
                    arr:[],
                    arr1:[],
                    titlearr1:['TxHash','Block','Time','From','To','Value','[TxFee]'],    
                    currentPage1:1,
                    currentPage2:1,
                    // 省略显示
                    open:'',
                    mglf:'',
                    begintime:'',
                    endtime:'',
                    urlid:'',
                    fornewflag:false
                    
                
            }
        },
    created(){
            this.geth = window.innerHeight - 60 + 'px'
            var now = new Date(new Date().setHours(0, 0, 0, 0)) - 0
            var now1 = now -  86400000 * 14
            //小时,分钟，秒，毫秒
            //凌晨2点50分50秒0毫秒
            console.log(now)
            console.log(now1)
            this.begintime = now1;
            this.endtime = now-86400000;
            this.value7 = [this.begintime,this.endtime]

            let href = window.location.href;
                if(href.indexOf('?')>-1){
                    console.log(window.location.href.split('?')[1].split('='||'&'))
                    var code = window.location.href.split('?')[1].split('=')[0];
                    var num = window.location.href.split('?')[1].split('=')[1];
                    // this.code = num
                    var num1 = num.split('_')[0]
                   
                    console.log(num1)
                    this.urlid = num1
                }

            setTimeout(()=>{
                    this.fornew()
                    this.fornewflag = true
            },50)
        },
        mounted(){
            setTimeout(()=>{
                this.drawuser('usemun',this.xarr,this.usearr,this.ttarr[0][this.$store.state.alllang])
            },2500)        
        },
    computed:{
        addclose(){
            return this.$store.state.close 
        },
        thelang(){
                return this.$store.state.alllang 
            }
    },
    watch:{
        addclose(n,o){
            if(n){
                this.open = 303+'px'
                this.mglf = 658+'px'
            }else{
                this.open = ''
                this.mglf = ''
            }
            this.drawall() 
        },
        value7(n,o){
            console.log(n)
            var date1 = new Date(n[0]);
            var date2 = new Date(n[1]);
            date1.setHours(0, 0, 0, 0);
            date2.setHours(0, 0, 0, 0);
            // 有三种方式获取，在后面会讲到三种方式的区别
            this.begintime = date1.getTime();
            this.endtime = date2.getTime();
            if(this.fornewflag){
                this.fornew()
                this.drawall() 
            }
            
            
        },
        thelang(n,o){
                 this.drawall()
            }
    },
    methods:{
        //数字字符串添加逗号
                conversion(str){
                    if(/\./.test(str)){
                        return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
                    }else{
                        return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
                    }
                },
        drawall(){
            setTimeout(()=>{
                    this.drawuser('usemun',this.xarr,this.usearr,this.ttarr[0][this.$store.state.alllang])
                },1000)  
        },
        timeuse1(aaa){
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
            var h = ddd.getHours()
            if(h < 10){
                h = '0' + h
            }
            var m = ddd.getMinutes()
            if(m < 10){
                m = '0' + m
            }
            var s = ddd.getSeconds()
            if(s < 10){
                s = '0' + s
            }
            return year+'/'+month+'/'+day + ' '+h+':'+m+':'+s
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
        drawuser(aa,arr1,arr2,string){
             var options={   //hchart的参数
			        chart: {
			            zoomType: 'xy'
			        },
			        title: {
			            text: ''
                    },
                    credits: {
                        enabled: false
                    },
			        subtitle: {
			            text: ''
			        },
			        xAxis: [{ //横坐标
			            categories: arr1,
			            crosshair: true
			        }],
			        yAxis: [
				        { // Primary yAxis
				            labels: {
				                format: '{value}',
				                style: {
				                    color: '#2E7DFF'
				                }
				            },
				            title: {
				                text: string,
				                style: {
				                    color:'#2E7DFF'
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
				            type: 'spline',
				        }

			        ]
				}
                // this.chart = new Highcharts.Chart(chartContainer, options)
                var chart = Highcharts.chart(aa,options)
                
	        	    window.onresize = function () {
	        	    	 chart.reflow();
	        	    }
        },
        newuserPage(val){
            console.log(`当前页: ${val}`);
        },
        actuserPage(val){
            console.log(`当前页: ${val}`);
        },
        fornew(){
            this.xarr = []
            this.usearr  = []
            this.arr = []
            this.arr1 = []
            console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    var url = this.$store.state.requrl+'/'+this.$store.state.appid.split('_')[0].toLowerCase()+'/call';
                    console.log(url)
                    Axios.post(url,{
                                        "dapp_id":this.$store.state.appid,
                                        "start":this.begintime/1000,
                                        "last":this.endtime/1000+86400000
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res)
                                        res.data.msg.call_info.forEach((a,bb) => {
                                            if(bb < res.data.msg.call_info.length -1){
                                                this.arr.push(a)
                                            }
                                            
                                        })
                                        res.data.msg.view_info.forEach((a,bb) => {
                                            if(bb < res.data.msg.view_info.length -1){
                                                this.arr1.push(a)
                                            }
                                        
                                        })
                                        this.arr.forEach(e => {
                                            var ddd = new Date(e.timestamp*1000-86400000)
                                            var year = ddd.getFullYear()
                                            var month = ddd.getMonth()+1
                                            var day=ddd.getDate();
                                            this.xarr.unshift(year+'/'+month+'/'+day)
                                            this.usearr.unshift(e.day_call)
                                        });
                                        console.log(this.xarr)
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
.fs{
    font-size: 12px;
} 
.out{
    margin-left: 358px;
    margin-top: 117px;
    padding-left: 1px;
    margin-right: 40px;
    box-sizing: border-box;
    overflow: visible;
}
.leftme{
    position: fixed;
    top: 60px;
    left: 73px;
}
.contright{
    width: 100%;
    box-sizing: border-box;
}
.dapp{
    width: 100%;
    background-color: #fff;
    margin-top: 30px;
    margin-right: 20px;
    padding: 30px;
    border-radius: 6px;
    box-sizing: border-box;
    box-shadow: 1px 1px 10px 0px 
		rgba(2, 121, 255, 0.1);
}
.top{
    height: 55px;
    line-height: 51px;
    font-size: 16px;
    color: #111111;
    padding-left: 30px;
    box-sizing: border-box;
    text-align: left;
    border-bottom: 1px solid #ececec;
}
.bg{
    background-color: #f9f9f9;
}
.pd{
    padding-left: 0px;
}
.all{
    text-align: center;
    height: 51px;
    border-bottom: 1px solid #ececec;
    border-left: 1px solid #ececec;
    white-space: nowrap;
    padding: 0 20px;
}
.topbt{
    border-top: 1px solid #ececec;
}
.top .all:nth-of-type(1){
    border-left: none;  
}

/* .fixwd .all:nth-of-type(5){
    width:251px;
    text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-box-orient: vertical;
	-webkit-line-clamp: 1;
    overflow: hidden;
    padding-bottom: 3px;
    display: block;
} */
</style>
<style>

.el-range-editor.el-input__inner{
    border-radius: 20px;
    background-color: #edeff7;
}
.el-range-editor .el-range-input{
    background-color: #edeff7;
}
</style>
