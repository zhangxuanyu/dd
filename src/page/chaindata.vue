<template>
    <div class="out" :style="{minHeight:geth,marginLeft:mglf}">
        <chain-Menu class="leftme" :style="{left:open}"></chain-menu>
        <!-- <p class="alltitle">{{ttarr[4][$store.state.alllang]}}</p>  -->
        <div class="contright">

            <!-- 新用户数图表 -->
            <div class="dapp">
                <div style="padding-top:5px;"><span style="float:left;color: #212229;font-weight: 600;">{{ttarr[0][$store.state.alllang]}}</span> 
                    <div class="export" @click="defalutexcle(titlearr,arr)">导出</div>
                    <span style="float:right;margin-top: -5px;margin-bottom: 30px;" class="type_sel">
                        <span style="margin-right:10px;font-size: 14px;color: #797b8e;margin-left:40px;">
                            分类
                        </span>
                        <el-select v-model="typedata"   class="cur" >
                            <el-option :key="index" :label="item[$store.state.alllang]" :value="index" v-for="(item,index) in typearr1">{{item[$store.state.alllang]}}</el-option>
                        </el-select>
                    </span>
                    <span style="float:right;margin-top: -5px;margin-bottom: 30px;"  class="time_sel">
                        <span style="margin-right:10px;font-size: 14px;color: #797b8e;">
                            {{ttarr[1][$store.state.alllang]}}
                        </span>
                        <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
                    </span>
                </div>
                <div id="newuser"  style="min-width:500px;height:500px"></div>

                <table  width="100%" cellspacing='0' style="text-align: center;margin-top:100px;">
                    <tr class="top bg pd">
                        <th  v-for="(item,index) in titlearr" class="title all topbt" :style="index == titlearr.length -1 ?{borderRight:'1px solid #ebecf0'}:''">{{item[$store.state.alllang]}}</th>
                    </tr>
                    <tr class="top pd nbt" v-for="(item,index) in arr" v-if="index>=(currentPage1-1)*10&&index<currentPage1*10" :key="index">
                        <td class="title all" style="width:55px;">{{(currentPage1-1)*10+index+1}}</td>
                        <td class="title all">{{timeuse(item.timestamp-68400)}}</td>
                        <td class="title all">{{conversion(item.new_user.toString())}}</td>
                        <td class="title all">{{conversion((item.new_rate*100).toFixed(2))}}%</td>
                        <td class="title all">{{conversion(item.total_user.toString())}}</td>
                        <td class="title all">{{conversion(item.total_user.toString())}}</td>
                        <td class="title all">{{conversion(item.total_user.toString())}}</td>
                        <td class="title all" style="border-right:1px solid #ebecf0;">{{conversion((item.new_user_ratio*100).toFixed(2))}}%</td>
                    </tr>
                </table>
                
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


             
        </div>
    </div>
</template>

<script>
import chainMenu from "../components/chain_menu";
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
            chainMenu
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
                    titlearr:[['',''],['日期','Date'],['Dapp数量','Dapp'],['用户数量','Users'],['新增用户','New users'],['活跃用户','Active Users'], ['调用次数','Used'], ['交易量','volume']],
                    arr:[],
                    ttarr:[['Dapp数据','Dapp Data'],['时间段','Period'],['新增用户','New users'],['活跃用户','Active Users'],['用户分析','User Analysis']],
                    currentPage1:1,
                    //伸展宽度
                    open:'',
                    mglf:'',
                    begintime:'',
                    endtime:'',
                    xarr:[],
                    newarr:[],
                    fornewflag:false,
                    typedata:0,
                    typearr1:[['Dapp数量','Dapp'],['用户数量','Users'],['新增用户','New users'],['活跃用户','Active Users'], ['调用次数','Used'], ['交易量','volume']]
            }
        },
    created(){
            this.$store.commit('changemenuflag',false)
            this.$store.commit('changeloadopacty',true)
            this.$store.commit('changeloadflge',true)
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
            if(this.$store.state.themenuflag){
                    this.open = 253+'px'
                    this.mglf = 503+'px'
                }else{
                    this.open = ''
                    this.mglf = ''
                }
        },
        mounted(){
            
            
        },
    computed:{
        addclose(){
            return this.$store.state.themenuflag 
        },
        thelang(){
                return this.$store.state.alllang 
            }
    },
    watch:{
        typedata(){
            this.drawall()
        },
        addclose(n,o){
            if(n){
                this.open = 253+'px'
                this.mglf = 503+'px'
            }else{
                this.open = ''
                this.mglf = ''
            }
            // this.drawall()
            var newchart = setInterval(()=>{
                window.newuser.reflow()
            },17)
            setTimeout(()=>{
                clearInterval(newchart)
            },1010)
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
        //导出excle
        defalutexcle(titlearr,dataarr){
            let str = ``
            // let str = `姓名,电话,邮箱\n`;
            titlearr.forEach((e,index )=> {
                if(index < titlearr.length-1){
                    str = str + `${e[this.$store.state.alllang ] + ','}`
                }else{
                    str = str + `${e[this.$store.state.alllang ] + '\n'}`
                }
                
            });
            
            //增加\t为了不让表格显示科学计数法或者其他格式
            for(let i = 0 ; i < dataarr.length ; i++ ){
                str+=`${i+1 + '\t'},`; 
                str+=`${this.timeuse(dataarr[i].timestamp-68400)  + '\t'},`; 
                str+=`${dataarr[i].new_user.toString()  + '\t'},`; 
                str+=`${(dataarr[i].new_rate*100).toFixed(2)  + '\t'},`; 
                str+=`${dataarr[i].total_user.toString()  + '\t'},`; 
                str+=`${dataarr[i].total_user.toString() + '\t'},`; 
                str+=`${dataarr[i].total_user.toString() + '\t'},`; 
                str+=`${(dataarr[i].new_user_ratio*100).toFixed(2) +'%' + '\t'},`; 

                str+='\n';
            }
            
            //encodeURIComponent解决中文乱码
            let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
            //通过创建a标签实现
            var link = document.createElement("a");
            link.href = uri;
            //对下载的文件命名
            link.download = this.typearr1[this.typedata][this.$store.state.alllang] +'.csv';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        },
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
                    this.drawuser1('newuser',this.xarr,this.newarr,this.typearr1[this.typedata][this.$store.state.alllang],'newuser')
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
        drawuser1(aa,arr1,arr2,string,windowname){
             var options={   //hchart的参数
			        chart: {
			            zoomType: 'xy'
                    },
                    colors:['#409efe','#00e175','#ff0a50','black'],
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
				                    color: '#409efe'
				                }
				            },
				            title: {
				                text: string,
				                style: {
				                    color:'#409efe'
				                }
				            }
				        }
			        ],
			        tooltip: {
			            shared: true
                    },
                    legend:{
                        enabled:false
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
                window[windowname] = Highcharts.chart(aa,options)
                
	        	    window.onresize = function () {
	        	    	 window[windowname].reflow();
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
            this.newarr = []
            this.arr = []
            console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    var url = this.$store.state.requrl+'/'+this.$store.state.appid.split('_')[0].toLowerCase()+'/user';
                    console.log(url)
                    Axios.post(url,{
                                        "dapp_id":this.$store.state.appid,
                                        "start":this.begintime/1000,
                                        "last":this.endtime/1000+86400
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
                                            var ddd = new Date(e.timestamp*1000-86400000)
                                            var year = ddd.getFullYear()
                                            var month = ddd.getMonth()+1
                                            var day=ddd.getDate();
                                            this.xarr.unshift(year+'/'+month+'/'+day)
                                            this.newarr.unshift(e.new_user)
                                        });
                                        this.drawall()
                                        this.$store.commit('changeloadopacty',false)
                                    })
        }
    }
}
</script>

<style scoped>
.out{
    margin-left: 321px;
    margin-top: 102px;
    padding-left: 1px;
    margin-right: 30px;
    box-sizing: border-box;
    overflow: visible; 
    transition: all 0.5s;
}
.leftme{
    position: fixed;
    top: 60px;
    left: 73px;
    z-index: 100;
    transition: all 0.5s;
}
.alltitle{
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: left;
    font-size: 24px;
    color: #c1c7cd;
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
    box-sizing: border-box;
    box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
}
.export{
    width: 70px;
	height: 30px;
	background-color: #4da7fb;
	border-radius: 4px;
    float: right;
	font-size: 14px;
	line-height: 30px;
	color: #ffffff;
    margin-top: -5px;
    margin-left: 40px;
    cursor: pointer;
}
.top{
    height: 55px;
    line-height: 51px;
    font-size: 16px;
    color: #111111;
    padding-left: 30px;
    box-sizing: border-box;
    text-align: left;
    border-bottom: 1px solid #ebecf0;
}
.bg{
    background-color: #f9f9f9;
}
.pd{
    padding-left: 0px;
}
.bg .all{
    color:#4f5f6e;
}
.nbt .all{
    color:#808c9b;
}
.all{
    text-align: center;
    height: 51px;
    border-bottom: 1px solid #ebecf0;
    border-left: 1px solid #ebecf0;
    white-space: nowrap;
    font-size: 14px;
}
.topbt{
    border-top: 1px solid #ebecf0;
}
.nbt .all:nth-of-type(1){
    /* border-left: none;   */
}
</style>
<style>
.time_sel .el-range-editor.el-input__inner{
    border-radius: 20px;
    background-color: #f7f8fa;
    height: 30px;
}
.time_sel .el-date-editor .el-range-separator{
    line-height: 22px;
}
.time_sel .el-date-editor .el-range__close-icon{
    line-height: 22px;
}
.type_sel .el-input--suffix .el-input__inner{
    border-radius: 20px;
    background-color: #f7f8fa;
    height: 30px;
}
.type_sel .el-input__icon{
    line-height: 30px;
}
.el-range-editor .el-range-input{
    background-color: #f7f8fa;
}
.el-date-editor--daterange.el-input, .el-date-editor--daterange.el-input__inner, .el-date-editor--timerange.el-input, .el-date-editor--timerange.el-input__inner{
    width:350px;
}
.el-icon-date:before{
    content:'';
}
.el-input__inner{
    border: 1px solid #f7f8fa;
}
.el-input__inner:hover{
    border-color:#f7f8fa;
}
.el-pager li.active{
    color:rgb(73,165,251);
}
.el-pager li:hover{
    color:#49a5fb;
}
.el-pagination{
    font-weight:400;
}
</style>
