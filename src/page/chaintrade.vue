<template>
    <div class="out" :style="{minHeight:geth,marginLeft:mglf,minWidth:'1000px'}">
        <chain-Menu class="leftme" :style="{left:open}"></chain-menu>
        <!-- <p class="alltitle">{{ttarr[4][$store.state.alllang]}}</p>  -->
        <div class="contright">
            <p style="height:15px;" class="dapp1">
                    <span style="float:right;margin-top: -5px;margin-bottom: 30px;" class="time_sel1">
                        <span style="margin-right:10px;font-size: 14px;color: #797b8e;vertical-align:5px;">
                            {{ttarr[1][$store.state.alllang]}}
                        </span>
                        <el-date-picker v-model="value7" type="daterange" align="right" unlink-panels range-separator="---" start-placeholder="开始日期" end-placeholder="结束日期" :picker-options="pickerOptions2"></el-date-picker>
                    </span>
            </p>
            <!-- 新用户数图表 -->
            <div class="dapp">
                <div style="padding-top:5px;"><span style="float:left;color: #212229;font-weight: 600;margin-bottom:30px;">{{ttarr1[0][$store.state.alllang]}} <span>({{$store.state.appid=='tron'?'TRX':$store.state.appid=='litecoin'?'LTC':$store.state.appid=='gxchain'?'GXC':$store.state.appid.toUpperCase()}})</span> </span> 
                    
                </div>
                <div id="volume"  style="min-width:500px;height:500px"></div>

                
            </div>

             <div class="dapp">
                <div style="padding-top:5px;"><span style="float:left;color: #212229;font-weight: 600;margin-bottom:30px;">{{ttarr1[1][$store.state.alllang]}}</span> 
                    
                </div>
                <div id="call"  style="min-width:500px;height:500px"></div>

                
            </div>

             <div class="dapp">
                <div style="padding-top:5px;"><span style="float:left;color: #212229;font-weight: 600;margin-bottom:30px;">{{ttarr1[2][$store.state.alllang]}}</span> 
                    
                </div>
                <div id="tx"  style="min-width:500px;height:500px"></div>

                
            </div>


            <div class="dapp">
                <div style="padding-top:5px;"><span style="float:left;color: #212229;font-weight: 600;margin-bottom:30px;">{{ttarr[0][$store.state.alllang]}}</span> 
                     <div class="export" @click="defalutexcle(titlearr,tablearr)">{{type_exp[1][$store.state.alllang]}}</div>   
                </div>
                 <table  width="100%" cellspacing='0' style="text-align: center;">
                    <tr class="top bg pd">
                        <th  v-for="(item,index) in titlearr" class="title all topbt" :style="index == titlearr.length -1 ?{borderRight:'1px solid #ebecf0'}:''">{{item[$store.state.alllang]}}</th>
                    </tr>
                    <tr class="top pd nbt" v-for="(item,index) in tablearr" v-if="index>=(currentPage1-1)*10&&index<currentPage1*10" :key="index">
                        <td class="title all" style="width:55px;">{{index+1}}</td>
                        <td class="title all">{{timeuse(item.timestamp)}}</td>
                        <td class="title all">{{conversion((item.chain_day_vol).toFixed(3))}}</td>
                        <td class="title all">{{conversion(item.chain_day_call.toString())}}</td>
                        <td class="title all">{{conversion((item.chain_day_tx).toString())}}</td>
                        <td class="title all">{{conversion((item.chain_total_vol).toFixed(3))}}</td>
                        <td class="title all">{{conversion(item.chain_total_call.toString())}}</td>
                        <td class="title all" style="border-right:1px solid #ebecf0;">{{conversion((item.chain_total_tx).toString())}}</td>
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
                    titlearr:[['',''],['日期','Date'],['当日交易量','Daily Volume'],['当日交易笔数','Daily Transactions'],['日转账笔数','Daily Transfer'],['累计交易量','Total Volume'],['累计交易笔数','Total Transactions'],['累计转账笔数','Total Transfer']],
                    arr:[],
                    tablearr:[],
                    ttarr:[['交易数据','Transaction Data'],['时间段','Period'],['新增用户','New users'],['活跃用户','Active Users'],['用户分析','User Analysis']],
                    ttarr1:[['日交易额','Daily Volume'],['日交易笔数','Daily Transactions'],['日转账笔数','Daily Transfer']],
                    currentPage1:1,
                    //伸展宽度
                    open:'',
                    mglf:'',
                    begintime:'',
                    endtime:'',
                    xarr:[],
                    newarr:[],
                    fornewflag:false,
                    typedata:1,
                    newarr1 : [],
                    arr1 : [],
                    type_exp:[['分类','Other'],['导出','Export']],
                    typearr1:[['累计交易笔','Total Tx'],['当日交易笔数','Daily Tx'],['增长率','Growth Rate'],['累计交易量','Total Vol'],['当日交易量','Daily Vol']]
            }
        },
    created(){
            this.$store.commit('changeloadopacty',true)
            this.$store.commit('changeloadflge',true)
            this.geth = window.innerHeight - 60 + 'px'
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
            this.value7 = [this.begintime,this.endtime]
            setTimeout(()=>{
                    this.fornew()
                    this.fornew1()
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
                window.volume.resize()
            },100)
            var newchart1 = setInterval(()=>{
                window.call.resize()
            },100)
            var newchart2 = setInterval(()=>{
                window.tx.resize()
            },100)
            setTimeout(()=>{
                clearInterval(newchart)
            },1500)
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
                this.fornew1()
                this.drawall()
                }
            
        },
        thelang(n,o){
            this.drawall()
        }
    },
    methods:{ 
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
         //导出excle
        defalutexcle(titlearr,dataarr){
            console.log(dataarr)
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
                str+=`${this.timeuse(dataarr[i].timestamp)  + '\t'},`; 
                str+=`${(dataarr[i].chain_day_vol).toFixed(3)  + '\t'},`; 
                str+=`${(dataarr[i].chain_day_call).toString()  + '\t'},`; 
                str+=`${(dataarr[i].chain_day_tx).toString()  + '\t'},`; 
                str+=`${(dataarr[i].chain_total_vol).toFixed(3) + '\t'},`; 
                str+=`${dataarr[i].chain_total_call.toString() + '\t'},`; 
                str+=`${(dataarr[i].chain_total_tx).toString() + '\t'},`; 

                str+='\n';
            }
            
            //encodeURIComponent解决中文乱码
            let uri = 'data:text/csv;charset=utf-8,\ufeff' + encodeURIComponent(str);
            //通过创建a标签实现
            var link = document.createElement("a");
            link.href = uri;
            //对下载的文件命名
            link.download = this.ttarr[0][this.$store.state.alllang] +'.csv';
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
                    this.drawuser1('volume',this.xarr,this.newarr[4],this.typearr1[4][this.$store.state.alllang],'volume')
                },1000)
                setTimeout(()=>{
                    this.drawuser1('call',this.xarr,this.newarr1[1],this.typearr1[1][this.$store.state.alllang],'call')
                },1000)
                setTimeout(()=>{
                    this.drawuser1('tx',this.xarr,this.newarr[1],this.typearr1[1][this.$store.state.alllang],'tx')
                },1000)

                setTimeout(()=>{
                    console.log(this.arr)
                    console.log(this.arr1)
                    this.tablearr = []
                    this.arr.forEach((e,index) => {
                        this.tablearr.push({})
                        this.tablearr[index]['timestamp'] = e.timestamp
                        this.tablearr[index]['chain_day_vol'] = e.chain_day_vol
                        this.tablearr[index]['chain_day_call'] = this.arr1[index].chain_day_call
                        this.tablearr[index]['chain_day_tx'] = e.chain_day_tx
                        this.tablearr[index]['chain_total_vol'] = e.chain_total_vol
                        this.tablearr[index]['chain_total_call'] = this.arr1[index].chain_total_call
                        this.tablearr[index]['chain_total_tx'] = e.chain_total_tx
                    });
                    console.log(this.tablearr)
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
            var echarts = require('echarts');
            var colors = ["#409efe", "#00e175", "#ff0a50","#fbbc05","#000"]
            window[windowname] = echarts.init(document.getElementById(aa));
            var option = {
                tooltip: {
                    trigger: 'axis',
                    textStyle:{
                      align:'left'
                    }
                },
                grid:{
                  bottom:100,
                  top:20,
                  left:100,
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
                yAxis: [
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
                ],
                
                series: [
				        {
				            name: string,
				            data: arr2,
                            type: 'line',
                            smooth: true
				        }

			        ],
                color: colors
            };
            window[windowname].setOption(option)
            window.addEventListener("resize",function(){
                    window[windowname].resize();
                });
            //  var options={   //hchart的参数
			//         chart: {
			//             zoomType: 'xy'
            //         },
            //         colors:['#409efe','#00e175','#ff0a50','black'],
			//         title: {
			//             text: ''
            //         },
            //         credits: {
            //             enabled: false
            //         },
			//         subtitle: {
			//             text: ''
			//         },
			//         xAxis: [{ //横坐标
			//             categories: arr1,
			//             crosshair: true
			//         }],
			//         yAxis: [
			// 	        { // Primary yAxis
			// 	            labels: {
			// 	                format: '{value}',
			// 	                style: {
			// 	                    color: '#409efe'
			// 	                }
			// 	            },
			// 	            title: {
			// 	                text: string,
			// 	                style: {
			// 	                    color:'#409efe'
			// 	                }
			// 	            }
			// 	        }
			//         ],
			//         tooltip: {
			//             shared: true
            //         },
            //         legend:{
            //             enabled:false
            //         },
			//         series: [
			// 	        {
			// 	            name: string,
			// 	            data: arr2,
			// 	            type: 'spline',
			// 	        }

			//         ]
			// 	}
            //     // this.chart = new Highcharts.Chart(chartContainer, options)
            //     window[windowname] = Highcharts.chart(aa,options)
                
	        // 	    window.onresize = function () {
	        // 	    	 window[windowname].reflow();
	        // 	    }
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
                    var url = this.$store.state.requrlnew+'/chain';
                    console.log(url)
                    Axios.post(url,{
                                        "blockchain": this.$store.state.appid,
                                        "begin":this.begintime/1000,
                                        "end":this.endtime/1000+86400,
                                        "type":"tx"
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        res.data.msg.data.forEach((a,bb) => {
                                            if(bb < res.data.msg.data.length -1){
                                                this.arr.unshift(a)
                                            }
                                            
                                        })
                                        console.log(this.arr)
                                        this.newarr = [
                                            [],
                                            [],
                                            [],
                                            [],
                                            []
                                        ]
                                        this.arr = this.rank(1,'timestamp',res.data.msg.data)
                                        this.arr.forEach(e => {
                                            var ddd = new Date(e.timestamp*1000)
                                            var year = ddd.getFullYear()
                                            var month = ddd.getMonth()+1
                                            var day=ddd.getDate();
                                            this.xarr.unshift(year+'/'+month+'/'+day)
                                            this.newarr[0].unshift(e.chain_total_tx)
                                            this.newarr[1].unshift(e.chain_day_tx)
                                            this.newarr[2].unshift(e.chain_tx_rate)
                                            this.newarr[3].unshift(e.chain_total_vol)
                                            this.newarr[4].unshift(e.chain_day_vol)
                                        });
                                        this.drawall()
                                        this.$store.commit('changeloadopacty',false)
                                    })
        },
        fornew1(){
            this.newarr1 = []
            this.arr1 = []
            console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    var url = this.$store.state.requrlnew+'/chain';
                    console.log(url)
                    Axios.post(url,{
                                        "blockchain": this.$store.state.appid,
                                        "type":"call",
                                        "begin":this.begintime/1000,
                                        "end":this.endtime/1000+86400
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        res.data.msg.data.forEach((a,bb) => {
                                            if(bb < res.data.msg.data.length -1){
                                                this.arr1.unshift(a)
                                            }
                                            
                                        })
                                        console.log(this.arr1)
                                        this.newarr1 = [
                                            [],
                                            [],
                                            []
                                        ]
                                        this.arr1 = this.rank(1,'timestamp',res.data.msg.data)
                                        this.arr1.forEach(e => {
                                            this.newarr1[0].unshift(e.chain_total_call)
                                            this.newarr1[1].unshift(e.chain_day_call)
                                            this.newarr1[2].unshift(e.chain_call_rate)
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
    padding-bottom: 60px;
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
.time_sel1 .el-range-editor.el-input__inner{
    border-radius: 20px;
    background-color: #fdfdfd;
    height: 30px;
}
.time_sel1 .el-date-editor .el-range-separator{
    line-height: 22px;
}
.time_sel1 .el-range-editor .el-range-input{
    background-color: #fdfdfd;
}
.time_sel1 .el-date-editor .el-range__close-icon{
    line-height: 22px;
}
.type_sel .el-input--suffix .el-input__inner{
    border-radius: 20px;
    background-color: #fdfdfd;
    height: 30px;
}
.type_sel .el-input__icon{
    line-height: 30px;
}
.el-range-editor .el-range-input{
    background-color: #fdfdfd;
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
