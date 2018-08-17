<template>
    <div class="out" :style="{minHeight:geth,marginLeft:mglf}">
        <min-menu class="leftme" :style="{left:open}"></min-menu>
        <div class="contright">
            <!-- 用户总数图表 -->
            <div class="dapp" style="height:600px;">
                <p><span style="float:left;">{{ttarr[0][$store.state.alllang]}}</span> <span style="float:right;"><span style="margin-right:10px;">{{ttarr[1][$store.state.alllang]}}</span><el-date-picker
                                                        v-model="value7"
                                                        type="daterange"
                                                        align="right"
                                                        unlink-panels
                                                        range-separator="至"
                                                        start-placeholder="开始日期"
                                                        end-placeholder="结束日期"
                                                        :picker-options="pickerOptions2">
                                                    </el-date-picker>
                                        </span></p>
                <div id="alluser"  style="min-width:500px;height:500px"></div>
            </div>

            <!-- 新用户数图表 -->
            <div class="dapp">
                <p style="text-align:left;">{{ttarr[2][$store.state.alllang]}}</p>
                <div id="newuser"  style="min-width:500px;height:500px"></div>

                <table  width="100%" cellspacing='0' style="text-align: center;">
                    <tr class="top bg pd">
                        <th  v-for="(item,index) in titlearr" class="title all topbt" :style="index == 0?{borderLeft:'none'}:''">{{item[$store.state.alllang]}}</th>
                    </tr>
                    <tr class="top pd nbt" v-for="(item,index) in arr" v-if="index>=(currentPage1-1)*10&&index<currentPage1*10">
                        <td class="title all">{{timeuse(item.timestamp-68400)}}</td>
                        <td class="title all">{{conversion(item.new_user.toString())}}</td>
                        <td class="title all">{{conversion((item.new_rate*100).toFixed(2))}}%</td>
                        <td class="title all">{{conversion(item.total_user.toString())}}</td>
                        <td class="title all">{{conversion((item.new_user_ratio*100).toFixed(2))}}%</td>
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
                <p  style="text-align:left;"><span>{{ttarr[3][$store.state.alllang]}}</span></p>
                <div id="actuser"  style="min-width:500px;height:500px"></div>

                <table  width="100%" cellspacing='0' style="text-align: center;">
                    <tr class="top bg pd">
                        <th  v-for="(item,index) in titlearr1" class="title all topbt" :style="index == 0?{borderLeft:'none'}:''">{{item[$store.state.alllang]}}</th>
                    </tr>
                    <tr class="top pd nbt" v-for="(item,index) in arr" v-if="index>=(currentPage2-1)*10&&index<currentPage2*10">
                        <td class="title all">{{timeuse(item.timestamp-86400)}}</td>
                        <td class="title all">{{conversion(item.active_user.toString())}}</td>
                        <td class="title all">{{conversion((item.day_rate*100).toFixed(2))}}%</td>
                        <td class="title all">{{conversion(item.week_user.toString())}}</td>
                        <td class="title all">{{conversion((item.week_rate*100).toFixed(2))}}%</td>
                        <td class="title all">{{conversion(item.month_user.toString())}}</td>
                        <td class="title all">{{conversion((item.month_rate*100).toFixed(2))}}%</td>
                        <td class="title all">{{conversion(item.lost_user.toString())}}</td>
                        <td class="title all">{{conversion((item.lost_rate*100).toFixed(2))}}%</td> 
                    </tr>
                </table>
                <!-- <el-pagination
                    @current-change="actuserPage"
                    :current-page.sync="currentPage2"
                    :page-size="10"
                    layout="total, prev, pager, next"
                    :total="arr.length" style="margin-top:40px;">
                </el-pagination> -->

                <div style="width:300px;height:50px;margin:0 auto;margin-top:40px;" >
                    <span style="float:left;margin-top:7px;font-size:12px;color:#4f5f6e;" v-if="$store.state.alllang == 0">共 {{arr.length}} 条</span>
                    <span style="float:left;margin-top:7px;font-size:12px;color:#4f5f6e;" v-if="$store.state.alllang == 1">Total {{arr.length}} items</span>
                    <el-pagination
                        @current-change="actuserPage"
                        :current-page.sync="currentPage2"
                        :page-size="10"
                        layout="prev, pager, next"
                        :total="arr.length" style="width:200px;float:left;">
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
                    titlearr:[['日期','Date'],['新增用户数','New users'],['增长率','Growth Rate'], ['累计用户','Users'],['新增用户占总用户比','New Users(Rate)']],
                    titlearr1:[['日期','Date'],
                            ['日活用户数','DAU '],
                            ['日活率','DAU(Rate)'], 
                            ['周活用户数','WAU'],
                            ['周活率','WAU(Rate)'],
                            ['月活用户数','MAU'],
                            ['月活率','MAU(Rate)'],
                            ['流失用户','Churn'],
                            ['流失率','Churn(Rate)']],
                    arr:[],
                    ttarr:[['累计用户','Users'],['时间段','Period'],['新增用户','New users'],['活跃用户数','Active Users']],
                    currentPage1:1,
                    currentPage2:1,
                    //伸展宽度
                    open:'',
                    mglf:'',
                    begintime:'',
                    endtime:'',
                    xarr:[],
                    userarr:[],
                    addarr:[],
                    newarr:[],
                    actarr:[],
                    newuserarr:[],
                    actuserarr:[],
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
            setTimeout(()=>{
                    this.fornew()
                    this.fornewflag = true
            },50)
        },
        mounted(){
            this.drawall()
            
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
                    this.drawuser('alluser',this.xarr,this.userarr,this.addarr)
                },1000)
                setTimeout(()=>{
                    this.drawuser1('newuser',this.xarr,this.newarr,this.ttarr[2][this.$store.state.alllang])
                },1000)
                setTimeout(()=>{
                    this.drawuser1('actuser',this.xarr,this.actarr,this.ttarr[3][this.$store.state.alllang])
                },1000)
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
        drawuser(aa,arr1,arr2,arr3){
             var options={   //hchart的参数
			        chart: {
			            zoomType: 'xy'
			        },
			        title: {
			            text: ''
			        },
			        subtitle: {
			            text: ''
                    },
                    credits: {
                        enabled: false
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
				                text: this.titlearr[3][this.$store.state.alllang],
				                style: {
				                    color:'#2E7DFF'
				                }
				            }
				        },
				        { // Secondary yAxis
				            title: {
				                text: this.titlearr[2][this.$store.state.alllang],
				                style: {
				                    color:'black'
				                }
				            },
				            labels: {
				                format: '{value}%',
				                style: {
				                    color:'black'
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
				            name: this.titlearr[3][this.$store.state.alllang],
				            data: arr2,
				            type: 'spline',
				        },
				        {  //纵坐标
				            name: this.titlearr[2][this.$store.state.alllang],
				            data: arr3,
				            type: 'spline',
				            yAxis: 1,
				        }

			        ]
				}
                // this.chart = new Highcharts.Chart(chartContainer, options)
                var chart = Highcharts.chart(aa,options)
                
	        	    window.onresize = function () {
	        	    	 chart.reflow();
	        	    }
        },
        drawuser1(aa,arr1,arr2,string){
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
            this.userarr = []
            this.addarr = []
            this.newarr = []
            this.actarr = []
            this.arr = []
            console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    var url = this.$store.state.requrl+'/'+this.$store.state.appid.split('_')[0].toLowerCase()+'/user';
                    console.log(url)
                    Axios.post(url,{
                                        "dapp_id":this.$store.state.appid,
                                        "start":this.begintime/1000,
                                        "last":this.endtime/1000+86400000
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        res.data.msg.item.forEach((a,bb) => {
                                            if(bb < res.data.msg.item.length -1){
                                                this.arr.push(a)
                                            }
                                            
                                        })
                                        console.log(this.arr)
                                        this.arr.forEach(e => {
                                            var ddd = new Date(e.timestamp*1000-864000)
                                            var year = ddd.getFullYear()
                                            var month = ddd.getMonth()+1
                                            var day=ddd.getDate();
                                            this.xarr.unshift(year+'/'+month+'/'+day)
                                            this.userarr.unshift(e.total_user)
                                            this.addarr.unshift((e.total_rate*100).toFixed(3)-0) 
                                            this.newarr.unshift(e.new_user)
                                            this.actarr.unshift(e.active_user)
                                        });
                                        
                                    })
        }
    }
}
</script>

<style scoped>
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
}
.topbt{
    border-top: 1px solid #ececec;
}
.nbt .all:nth-of-type(1){
    border-left: none;  
}
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
