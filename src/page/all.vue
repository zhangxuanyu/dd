<template>
    <div class="cont" :style="{marginLeft:theleft}">
        <!-- 币种 -->
        <div class="card" v-for="item in arr" :style="{width:cdwd}">



            <p class="title">{{item.word}}</p>
            <div  class="card_out">
                <div v-for="it in item.data" class="card_in">
                    <p class="subtitle">{{it.word[$store.state.alllang]}}</p>
                    <p class="tips">(24h)</p>
                    <p class="numbers">{{it.num}}</p>
                    <p class="subtitle" :style="it.add > 0?{color:'#00d994'}:it.add < 0?{color:'#ff0a50'}:{color: '#808c9b'}">
                    <img src="../../static/up.png" alt="" v-if="it.add > 0" class="mgt">
                    <img src="../../static/down.png" alt="" v-if="it.add < 0" class="mgt" >
                    {{it.add>0?'+'+it.add:it.add}}%
                    </p>
                </div>
            </div>
            
        </div>

        <!-- 曲线图 -->
        <div class="picture">
            <p style="height:40px;"><span class="left lefttips">{{pictt[$store.state.alllang]}}</span>
            <span class="right cur righttype" @click="chat(2)" :style="color3">{{adduser[$store.state.alllang]}}</span>
            <span class="right cur righttype" @click="chat(1)"  :style="color2">{{alluser[$store.state.alllang]}}</span>
            <span class="right cur righttype" @click="chat(0)"  :style="color1">{{calltimes[$store.state.alllang]}}</span></p>
            <div id="mychart" style="min-width:400px;height:400px"></div>
        </div> 

        <!-- <img :src="'../../static/'+uashdj+'/'+item+'.png'" alt="" v-for="item in 5" onerror="javascript:this.src=''" style="width:350px;height:200px;">          -->

    </div>
</template>

<script>
import Highcharts from 'highcharts/highstock';
import HighchartsMore from 'highcharts/highcharts-more';
import HighchartsDrilldown from 'highcharts/modules/drilldown';
import Highcharts3D from 'highcharts/highcharts-3d';
import Axios from 'axios';

HighchartsMore(Highcharts)
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
    data(){
        return{
            arr:[{
                word:'ETH',
                data:[
                    {img:'../../static/inuser.png',word:['活跃用户','Active Users'],num:'',add:''},
                    {img:'../../static/intrade.png',word:['交易量','Volume'],num:'',add:''},
                    {img:'../../static/inuse.png',word:['调用次数','Transactions'],num:'',add:''}
                ]
            },
            {
                word:'EOS',
                data:[
                    {img:'../../static/inuser.png',word:['活跃用户','Active Users'],num:'',add:''},
                    {img:'../../static/intrade.png',word:['交易量','Volume'],num:'',add:''},
                    {img:'../../static/inuse.png',word:['调用次数','Transactions'],num:'',add:''}
                ]
            },
            {
                word:'NAS',
                data:[
                    {img:'../../static/inuser.png',word:['活跃用户','Active Users'],num:'',add:''},
                    {img:'../../static/intrade.png',word:['交易量','Volume'],num:'',add:''},
                    {img:'../../static/inuse.png',word:['调用次数','Transactions'],num:'',add:''}
                ]
            }],
            //切换图表
            color1:{color:'#409efe',backgroundColor: '#ffffff',boxShadow: '2px 2px 11px 0px rgba(59, 140, 255, 0.3)',borderRadius:' 12px'},
            color2:'',
            color3:'',
            //请求数组
            reqarr:['call','total_user','new_user'],
            select:0,
            //图表数组
            xarr:[],
            nasarr:[],
            etharr:[],
            eosarr:[],
            uashdj:'wu wu',
            theleft:'330px',
            cdwd:'',
            clientHeight: 0,
            //图表改变宽度
            chartwd:'',
            // 图表文字切换
            pictt:['整图趋势','Trend'],
            adduser:['新增用户','New Users'],
            alluser:['累计用户','Users'],
            calltimes:['调用次数','Transactions']
        }
    },
    created(){
        this.fornew()
        this.cglf(this.$store.state.themenuflag)
        var bbc = window.innerWidth
        console.log(parseInt(this.theleft))
        this.cdwd = (bbc - parseInt(this.theleft)-110)/3 + 'px'
        console.log(bbc - parseInt(this.theleft)-90)
    },
    mounted(){
        setTimeout(()=>{
            this.initChart(this.xarr,this.etharr,this.nasarr,this.eosarr)
        },500)
        const that = this;
        $(window).on('resize',function(){
            that.clientHeight = document.body.clientWidth
        })
        
    },
    computed:{
        inleft(){
            return this.$store.state.themenuflag
        }
    },
    watch:{
        inleft(n,o){
            console.log(n)
            this.cglf(n)
        },
        clientHeight (val,o) {
            var bbc = window.innerWidth
            this.cdwd = (bbc - parseInt(this.theleft)-110)/3 + 'px'
        }
    },
    methods:{
        cglf(n){
            if(n){
                this.theleft='330px'
            }else{
                this.theleft='120px'
            }
            var bbc = window.innerWidth
            this.cdwd = (bbc - parseInt(this.theleft)-110)/3 + 'px'
            setTimeout(()=>{
                this.initChart(this.xarr,this.etharr,this.nasarr,this.eosarr)
            },50)
        },
        initChart(arr1,arr2,arr3,arr4) {
		    //   var chartContainer = document.getElementById('mychart')
                var options1={   //hchart的参数
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
				                text: 'ETH',
				                style: {
				                    color:'#2E7DFF'
				                }
				            }
				        },
				        { // Secondary yAxis
				            title: {
				                text: 'EOS',
				                style: {
				                    color:'black'
				                }
				            },
				            labels: {
				                format: '{value}',
				                style: {
				                    color:'black'
				                }
				            },
				            opposite: true
						},
				        { // Secondary yAxis
				            title: {
				                text: 'NAS',
				                style: {
				                    color:'#90ed7d'
				                }
				            },
				            labels: {
				                format: '{value}',
				                style: {
				                    color:'#90ed7d'
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
				            name: 'ETH',
				            data: arr2,
				            type: 'spline',
				        },
				        {  //纵坐标
				            name: 'EOS',
				            data: arr4,
				            type: 'spline',
				            yAxis: 1,
				        },
				        {  //纵坐标
				            name: 'NAS',
				            data: arr3,
				            type: 'spline',
				            yAxis: 2,
				        }

			        ]
				}
                // this.chart = new Highcharts.Chart(chartContainer, options)
                var chart = Highcharts.chart('mychart',options1)
                
	        	    window.onresize = function () {
	        	    	chart.reflow();
	        	    }

            },
            chat(a){
                    this.color1 = ''
                    this.color2 = ''
                    this.color3 = ''
                    this.select = a
                    this.fornew()
                if(a == 0){
                    this.color1 = {color:'#409efe',backgroundColor: '#ffffff',boxShadow: '2px 2px 11px 0px rgba(59, 140, 255, 0.3)',borderRadius:' 12px'}
                    
                }else if(a == 1){
                    this.color2 = {color:'#409efe',backgroundColor: '#ffffff',boxShadow: '2px 2px 11px 0px rgba(59, 140, 255, 0.3)',borderRadius:' 12px'}
                    
                }else if(a == 2){
                    this.color3 = {color:'#409efe',backgroundColor: '#ffffff',boxShadow: '2px 2px 11px 0px rgba(59, 140, 255, 0.3)',borderRadius:' 12px'}
                    
                }
                setTimeout(()=>{
                    console.log(this.etharr)
                    this.initChart(this.xarr,this.etharr,this.nasarr,this.eosarr)
                },500)
                
            },
            fornew(){
                this.xarr = []
                this.etharr = []
                this.nasarr = []
                this.eosarr = []
                console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                var url = this.$store.state.requrl+'/index';
                Axios.post(url,{
							"key":this.reqarr[this.select]
						},{
							headers: {'Content-Type': "application/x-www-form-urlencoded"}
						}).then(res => {
                            console.log(res.data.msg)
                            this.arr[0].data[0].num = res.data.msg.change_24h.eth.user
                            this.arr[0].data[0].add = (res.data.msg.change_24h.eth.user_rate*100).toFixed(2)
                            this.arr[0].data[1].num = res.data.msg.change_24h.eth.vol.toFixed(0)
                            this.arr[0].data[1].add = (res.data.msg.change_24h.eth.vol_rate*100).toFixed(2)
                            this.arr[0].data[2].num = res.data.msg.change_24h.eth.tx
                            this.arr[0].data[2].add = (res.data.msg.change_24h.eth.tx_rate*100).toFixed(2)

                            this.arr[1].data[0].num = res.data.msg.change_24h.eos.user
                            this.arr[1].data[0].add = (res.data.msg.change_24h.eos.user_rate*100).toFixed(2)
                            this.arr[1].data[1].num = res.data.msg.change_24h.eos.vol.toFixed(0)
                            this.arr[1].data[1].add = (res.data.msg.change_24h.eos.vol_rate*100).toFixed(2)
                            this.arr[1].data[2].num = res.data.msg.change_24h.eos.tx
                            this.arr[1].data[2].add = (res.data.msg.change_24h.eos.tx_rate*100).toFixed(2)

                            this.arr[2].data[0].num = res.data.msg.change_24h.nas.user
                            this.arr[2].data[0].add = (res.data.msg.change_24h.nas.user_rate*100).toFixed(2)
                            this.arr[2].data[1].num = res.data.msg.change_24h.nas.vol.toFixed(0)
                            this.arr[2].data[1].add = (res.data.msg.change_24h.nas.vol_rate*100).toFixed(2)
                            this.arr[2].data[2].num = res.data.msg.change_24h.nas.tx
                            this.arr[2].data[2].add = (res.data.msg.change_24h.nas.tx_rate*100).toFixed(2)

                            // this.xarr = res.data.msg.day_30d.eth_info
                            res.data.msg.day_30d.eth_info.forEach(e => {
                                var ddd = new Date((e.timestamp-86400)*1000)
                                var year = ddd.getFullYear()
                                var month = ddd.getMonth()+1
							    var day=ddd.getDate();
                                this.xarr.unshift(year+'/'+month+'/'+day)
                                this.etharr.unshift(e.value)
                            });
                            res.data.msg.day_30d.nas_info.forEach(e => {
                                this.nasarr.unshift(e.value)
                            });
                            res.data.msg.day_30d.eos_info.forEach(e => {
                                this.eosarr.unshift(e.value)
                            });
                            
                        })
            }
    }
}
</script>

<style scoped>
.cont{
    margin-left: 330px;
    margin-top: 50px;
}
.card{
    min-width: 397px;
    height: 300px;
    background-color: #fff;
    float: left;
    padding: 30px;
    box-sizing: border-box;
    margin-top: 57px;
    border-radius: 6px;
    margin-right: 30px;
    box-shadow: 1px 1px 10px 0px 
		rgba(2, 121, 255, 0.1);
}
.card:nth-of-type(1){
    background-image: url(../../static/ETH.png);
    background-position: center center;
    background-repeat: no-repeat;
}
.card:nth-of-type(2){
    background-image: url(../../static/EOS.png);
    background-position: center center;
    background-repeat: no-repeat;
}
.card:nth-of-type(3){
    background-image: url(../../static/NAS.png);
    background-position: center center;
    background-repeat: no-repeat;
}
.card_out{
    display: flex;
    justify-content:space-between;
    text-align: center;
}
.card_in{
    width: 115px;
    height: 206px;
    text-align: center;
}
.title{
    font-size: 20px;
    color: #111;
    margin-bottom: 40px;
    text-align: left;
    font-weight: 600;
}
.tips{
    font-size: 14px;
    color: #a8afb8;
    margin-bottom: 30px;
}
.subtitle{
    color: #808c9b;
    font-size: 16px;
}
.numbers{
    font-size: 36px;
    color: #4f5e70;
    margin-bottom: 25px;
}
.mgt{
    vertical-align: -3px;
}
.picture{
    width: 100%;
    height: 500px;
    border-radius: 6px;
    background-color: #fff;
    margin-top: 30px;
    float: right;
    margin-right: 20px;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 1px 1px 10px 0px 
		rgba(2, 121, 255, 0.1);
}
.left{
    float: left;
}
.lefttips{
    color: #161a29;
    font-size: 16px; 
}
.righttype{
    color: #808c9b;
    font-size: 14px;
    line-height: 24px;
    /* width:80px; */
    padding: 0 20px;
    height:24px
}
.right{
    float: right;
    margin: 0 15px;
}
#mychart{
    width: 100%;
    height: 500px;
}
</style>

