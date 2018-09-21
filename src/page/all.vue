<template>
    <div class="cont" :style="{marginLeft:theleft,minWidth: '1144px'}">
        <!-- 币种 -->
        
        <div class="card_flex">
            <div class="card" v-for="(item,index) in arr" :style="{width:cdwd}">



                <p class="title">{{item.word}}</p>
                <div class="dappnum">{{dappnumtips[$store.state.alllang]}}：{{item.num}}</div>
                <div  class="card_out">
                    <div v-for="(it,inde) in item.data" class="card_in">
                        <p class="subtitle"><img :src="inde == 1?it.img:''" alt="" :style="index == 2?{position:'absolute',top:'-1px',left:'0px'}:{position:'absolute',top:'-1px',left:'5px'}">{{it.word[$store.state.alllang]}}</p>
                        <p class="tips">(24h)</p>
                        <p class="numbers">{{it.num}}</p>
                        <p class="subtitle" :style="it.add > 0?{color:'#1ccfa7'}:it.add < 0?{color:'#f85e70'}:{color: 'rgb(167, 174, 182);'}">
                        <img src="../../static/up.png" alt="" v-if="it.add > 0" class="mgt">
                        <img src="../../static/down.png" alt="" v-if="it.add < 0" class="mgt" >
                        {{it.add>0?'+'+it.add:it.add}}%
                        </p>
                    </div>
                </div>
                
            </div>

        </div>

        <!-- 曲线图 -->
        <div class="picture">
            <p style="margin-right: -15px;margin-bottom:60px;"><span class="left lefttips">{{pictt[$store.state.alllang]}}</span>
            <span class="right cur righttype" @click="chat(2)" :style="color3">{{adduser[$store.state.alllang]}}</span>
            <span class="right cur righttype" @click="chat(1)"  :style="color2">{{alluser[$store.state.alllang]}}</span>
            <span class="right cur righttype" @click="chat(0)"  :style="color1">{{calltimes[$store.state.alllang]}}</span></p>
            <div id="mychart" style="min-width:400px;height:400px"></div>
        </div> 

       

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
                num:0,
                data:[
                    {img:'../../static/ETH-1.png',word:['活跃用户','Active Users'],num:'',add:''},
                    {img:'../../static/ETH-1.png',word:['交易量','Volume'],num:'',add:''},
                    {img:'../../static/ETH-1.png',word:['调用次数','Transactions'],num:'',add:''}
                ]
            },
            {
                word:'EOS',
                num:0,
                data:[
                    {img:'../../static/EOS-1.png',word:['活跃用户','Active Users'],num:'',add:''},
                    {img:'../../static/EOS-1.png',word:['交易量','Volume'],num:'',add:''},
                    {img:'../../static/EOS-1.png',word:['调用次数','Transactions'],num:'',add:''}
                ]
            },
            {
                word:'NAS',
                num:0,
                data:[
                    {img:'../../static/NAS-1.png',word:['活跃用户','Active Users'],num:'',add:''},
                    {img:'../../static/NAS-1.png',word:['交易量','Volume'],num:'',add:''},
                    {img:'../../static/NAS-1.png',word:['调用次数','Transactions'],num:'',add:''}
                ]
            }],
            //切换图表
            color1:{color:'#409efe',backgroundColor: '#f5faff',borderRadius:' 12px'},
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
            theleft:'280px',
            cdwd:'',
            clientHeight: 0,
            //图表改变宽度
            chartwd:'',
            // 图表文字切换
            toparr:['总览','Overview'],
            pictt:['整体趋势','Trend'],
            adduser:['新增用户','New Users'],
            alluser:['累计用户','Users'],
            calltimes:['调用次数','Transactions'],
            dappnumtips:['Dapps数量','Dapps'],
            chartsss:'',
            // 图表重绘
            redrawflag:true
        }
    },
    created(){
        this.fornew(true)
        this.cglf(this.$store.state.themenuflag)
        var bbc = window.innerWidth
        console.log(parseInt(this.theleft))
        this.cdwd = (bbc - parseInt(this.theleft)-110)/3 + 'px'
        console.log(bbc - parseInt(this.theleft)-90)
        //loading初始化
        this.$store.commit('changeloadopacty',true)
        this.$store.commit('changeloadflge',true)
    },
    mounted(){
        
        // setTimeout(()=>{
        //     console.log(this.xarr)
            
        // },1000)
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
        },
        redrawflag(){
            setTimeout(()=>{
                this.initChart(this.xarr,this.etharr,this.nasarr,this.eosarr)
            },1000)
        }
    },
    methods:{
        cglf(n){
            if(n){
                this.theleft='280px'
            }else{
                this.theleft='100px'
            }
            var bbc = window.innerWidth
            this.cdwd = (bbc - parseInt(this.theleft)-110)/3 + 'px'
            
            var newchart = setInterval(()=>{
                window.chartsss.reflow()
            },17)
            setTimeout(()=>{
                // this.initChart(this.xarr,this.etharr,this.nasarr,this.eosarr)
                clearInterval(newchart)
            },1010)
        },
        initChart(arr1,arr2,arr3,arr4) {
		    //   var chartContainer = document.getElementById('mychart')
                var options1={   //hchart的参数
			        chart: {
			            zoomType: 'xy'
			        },
                    colors:['#409efe','#00e175','#ff0a50'],
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
				                    color: '#409efe'
				                }
				            },
				            title: {
				                text: 'ETH',
				                style: {
				                    color:'#409efe'
				                }
				            }
				        },
				        { // Secondary yAxis
				            title: {
				                text: 'EOS',
				                style: {
				                    color:'#00e175'
				                }
				            },
				            labels: {
				                format: '{value}',
				                style: {
				                    color:'#00e175'
				                }
				            },
				            opposite: true
						},
				        { // Secondary yAxis
				            title: {
				                text: 'NAS',
				                style: {
				                    color:'#ff0a50'
				                }
				            },
				            labels: {
				                format: '{value}',
				                style: {
				                    color:'#ff0a50'
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
                window.chartsss = Highcharts.chart('mychart',options1)
                
	        	    window.onresize = function () {
                        // chart.reflow();
                        
                        window.chartsss.reflow()
	        	    }

            },
            chat(a){
                    this.color1 = ''
                    this.color2 = ''
                    this.color3 = ''
                    this.select = a
                    this.fornew(false)
                if(a == 0){
                    this.color1 = {color:'rgb(73,165,251)',backgroundColor: '#f5faff',borderRadius:' 12px'}
                    
                }else if(a == 1){
                    this.color2 = {color:'rgb(73,165,251)',backgroundColor: '#f5faff',borderRadius:' 12px'}
                    
                }else if(a == 2){
                    this.color3 = {color:'rgb(73,165,251)',backgroundColor: '#f5faff',borderRadius:' 12px'}
                    
                }
            },
            fornew(aa){
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
                            var numtimes = 1
                            if(aa){
                                var numroll = setInterval(()=>{
                                    if(numtimes>=90){
                                        clearInterval(numroll)
                                    }
                                    numtimes++
                                    this.arr[0].data[0].num = parseInt(res.data.msg.change_24h.eth.user/90*numtimes)
                                    
                                    this.arr[0].data[1].num = parseInt(res.data.msg.change_24h.eth.vol/90*numtimes)
                                    
                                    this.arr[0].data[2].num = parseInt( res.data.msg.change_24h.eth.tx/90*numtimes)
                                    
                                    this.arr[1].data[0].num = parseInt(res.data.msg.change_24h.eos.user/90*numtimes)
                                    
                                    this.arr[1].data[1].num = parseInt(res.data.msg.change_24h.eos.vol/90*numtimes)
                                    
                                    this.arr[1].data[2].num = parseInt(res.data.msg.change_24h.eos.tx/90*numtimes)
                                  
                                    this.arr[2].data[0].num = parseInt(res.data.msg.change_24h.nas.user/90*numtimes)
                                    
                                    this.arr[2].data[1].num = parseInt(res.data.msg.change_24h.nas.vol/90*numtimes)
                                    
                                    this.arr[2].data[2].num = parseInt(res.data.msg.change_24h.nas.tx/90*numtimes)
                                    
                                },20)
                            }
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

                                this.arr[0].num = res.data.msg.count.eth
                                this.arr[1].num = res.data.msg.count.eos
                                this.arr[2].num = res.data.msg.count.nas
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
                            this.$store.commit('changeloadopacty',false)
                            this.redrawflag = !this.redrawflag
                        })
            }
    }
}
</script>

<style scoped>
.cont{
    margin-left: 330px;
    margin-top: 50px;
    transition: all 0.5s;
}
.card{
    min-width: 351px;
    height: 262px; 
    background-color: #fff;
    /* float: left; */
    padding: 30px;
    box-sizing: border-box;
    margin-top: 50px;
    margin-right: 30px;
    box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
        position: relative;
}
.dappnum{
    position: absolute;
    top: 30px;
    right: 30px;
    background-color: #f7f8fa;
    height: 24px;
    line-height: 24px;
    font-size: 12px;
    color: #797b8e;
    padding: 0 20px;
    border-radius: 12px;
}
.alltitle{
    margin-top: 50px;
    text-align: left;
    font-size: 24px;
    color: #c1c7cd;
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
.card_flex{
    display: flex;
    justify-content:space-between;
}
.card_out{
    display: flex;
    justify-content:space-around;
    text-align: center;
}
.card_in{
    width: 97px;
    text-align: center;
}
.title{
    font-size: 18px;
    color: #212229;
    font-weight: 600;
    margin-bottom: 40px;
    text-align: left;
}
.tips{
    font-size: 12px;
    color: #797b8e;
    margin-bottom: 30px;
}
.subtitle{
    color: #797b8e;
    font-size: 14px;
    position: relative;
}
.numbers{
    font-size: 30px;
    color: #464a58;
    margin-bottom: 20px;
}
.mgt{
    vertical-align: -3px;
}
.picture{
    width: 100%;
    height: 500px;
    background-color: #fff;
    margin-top: 30px;
    float: right;
    margin-right: 30px;
    padding: 27px 30px 30px 60px;
    box-sizing: border-box;
    box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
}
.left{
    float: left;
}
.lefttips{
    color: #212229;
    font-weight: 600;
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

