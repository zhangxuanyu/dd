<template>
    <div  class="out" :style="{minHeight:geth,marginLeft:mglf}" >
        <min-menu class="leftme" :style="{left:open}"></min-menu>
        <div class="contright" v-if="arr.title">
            <!-- dapp介绍 -->
            <div class="dapp" style="minHeight:600px;">
                <div class="outtitle">
                    <img :src="'../../static/icon/'+urlid+'.jpg'" alt="" class="titleimg" onerror="javascript:this.src='../../static/all1.png'">
                    <div class="title">
                        <p class="titlf">{{arr.title}}</p>
                        <p class="titlty">{{arr.platform}}>{{arr.category}}</p>
                    </div>
                </div>

                <!-- 轮播图 -->
                <div class="pic topnav_box">
                    <ul :style="allleng" class="allpic">
                        <li v-for="(item,index) in picarr" class="outpic" v-show="imgcount"><img :src="'../../static/'+urlid+'/'+item+'.png'" alt="" onerror="javascript:this.src=''"  class="picwh"><img :src="'../../static/'+urlid+'/'+item+'.jpg'" alt="" onerror="javascript:this.src=''"  class="picwh"> </li>
                        <li v-for="(item,index) in picarr" class="inpic" v-show="!imgcount"><img :src="wrongarr[index]" alt="" onerror="javascript:this.src=''"  class="picwh"></li>
                    </ul>
                </div>
                
                <div style="position:relative;">
                    <div class="intro">
                        <p style="color:#111;font-size:16px;margin-bottom:19px;">{{ttarr[0][$store.state.alllang]}}</p>
                        <p style="line-height:30px;font-size:14px;">{{arr.description}}</p>
                    </div>

                    <div class="info">
                        <p style="color:#111;font-size:16px;margin-bottom:19px;">{{ttarr[1][$store.state.alllang]}}</p>
                        <div  style="line-height:30px;font-size:14px;" class="cur base"><a :href="arr.website" target="_black"><img src="../../static/home.png" alt=""> {{ttarr[2][$store.state.alllang]}} <div class="go"></div></a></div>
                        <div  style="line-height:30px;font-size:14px;" class="cur base"><a :href="arr.github" target="_black"><img src="../../static/GitHub.png" alt=""> {{ttarr[3][$store.state.alllang]}} <div class="go"></div></a></div>
                        <div  style="line-height:30px;font-size:14px;" class="cur base"><a :href="theurl" target="_black"><img src="../../static/dapp.png" alt=""> {{ttarr[4][$store.state.alllang]}} <div class="go"></div></a></div>
                    </div>
                </div>
                

                
            </div>

            <!-- 图表 -->
            <div class="picture">
                <div id="thirtychart" style="min-width:500px;height:500px"></div>
            </div>  

            <!-- 动态和资讯 -->
            <div class="news" style="minWidth:1150px">
                <!-- <div class="newact">
                    <p>最新动态</p>
                    <p style="line-height:30px;font-size:14px;">基于星云链的新一代区块链游戏-恐龙乐园上线了！通过免费领取一颗龙蛋去孵化自己的龙宝宝，每个玩家限定免费领取一枚龙蛋！所有龙宝宝从龙蛋中孵化出来之后，力量、敏捷和速度值永远不会发生变化，体重初始值均为5KG。玩家还可以支付0.01NAS购买额外的龙蛋去孵化更多的龙宝宝，或者直接去市场中购买其他玩家挂售的稀有恐龙！玩家通过让自己的龙宝宝与其他恐龙进行PK，赢家将获得对方20%的体重，我们希望用更加公平的算法，通过所有玩家的共同努力，打造一条称霸宇宙的无敌霸王龙！还在等什么，快来恐龙乐园一起嗨吧！
    --感谢设计师@B.Q，所有的恐龙均为原画  </p>
                </div> -->
                <div class="newinfo">
                    <p>{{ttarr[5][$store.state.alllang]}}</p>
                    <p style="line-height:30px;font-size:14px;"></p>
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
                // 图片数组
                picarr:[1,2,3,4],
                allleng:'',
                mglf:'',
                open:'',
                arr:'',
                //请求数组
                reqarr:['eth','eos','nas'],
                reqAarr:['ETH','EOS','NAS'],
                wrongarr:['../../static/1-0-1.jpg','../../static/1-0-2.jpg','../../static/1-0-24.jpg','../../static/1-0-28.jpg'],
                ttarr:[['简介','Introduction'],
                        ['基本信息','Basic Information'],
                        ['访问主页','Homepage'],
                        ['查看GitHub源码','GitHub'],
                        ['查看智能合约','Smart contract'],
                        ['最新资讯','Latest News'],
                        ['累计用户','Users'],
                        ['交易量','Volume'],
                        ['调用次数','Transactions'],
                        ['综合排名','Rankings']],
                code:'',
                theurl:'',
                xarr:[],
                userarr:[],
                tradearr:[],
                usearr:[],
                allarr:[],
                urlid:'',
                //统计图片数量
                imgcount:0
            }
        },
        created(){
            this.geth = window.innerHeight - 60 + 'px',
            this.allleng = {'width':this.wrongarr.length*370+'px'}
                setTimeout(()=>{
                    this.fornew()
                },50)
            
            // let href = window.location.href;
            //     if(href.indexOf('?')>-1){
            //         console.log(window.location.href.split('?')[1].split('='||'&'))
            //         var code = window.location.href.split('?')[1].split('=')[0];
            //         var num = window.location.href.split('?')[1].split('=')[1];
            //         console.log(num)
            //         // this.code = num
            //         // var num1 = num.split('_')[0]
                   
            //         // console.log(num1)
            //         this.urlid = num
            //     }
        },
        mounted(){
            setTimeout(()=>{
                console.log(this.xarr)
                this.draw(this.xarr,this.userarr,this.usearr,this.tradearr,this.allarr,this.ttarr)
                $('.outpic').each((a)=>{
                    console.log($('.outpic').eq(a)[0].children)
                    if($('.outpic').eq(a)[0].children[0].src.indexOf('jpg')!=-1||$('.outpic').eq(a)[0].children[0].src.indexOf('png')!=-1){
                        this.imgcount++
                    }
                    if($('.outpic').eq(a)[0].children[1].src.indexOf('jpg')!=-1||$('.outpic').eq(a)[0].children[1].src.indexOf('png')!=-1){
                        this.imgcount++
                    }
                    // $(this).children.each((a)=>{
                    //     if($(this).src.indexOf('jpg')!=-1||$(this).src.indexOf('png')!=-1){
                    //         this.imgcount++
                    //     }
                    // })
                })
                console.log(this.imgcount)
                if(this.imgcount){
                    this.allleng = {'width':this.imgcount*370+'px'}
                }else{
                    this.allleng = {'width':this.wrongarr.length*370+'px'}
                }
                
            },1000)

            
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
                console.log(1111111111111)
                if(n){
                    this.open = 303+'px'
                    this.mglf = 658+'px'
                }else{
                    this.open = ''
                    this.mglf = ''
                }
                setTimeout(()=>{
                    
                    this.draw(this.xarr,this.userarr,this.usearr,this.tradearr,this.allarr,this.ttarr)
                },1000)
            },
            thelang(n,o){
                this.draw(this.xarr,this.userarr,this.usearr,this.tradearr,this.allarr,this.ttarr)
            }
        },
        methods:{
            draw(arr1,arr2,arr3,arr4,arr5,arr6) {
		    //   var chartContainer = document.getElementById('mychart')
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
				                text: arr6[6][this.$store.state.alllang],
				                style: {
				                    color:'#2E7DFF'
				                }
				            }
				        },
				        { // Secondary yAxis
				            title: {
				                text: arr6[7][this.$store.state.alllang],
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
				                text: arr6[8][this.$store.state.alllang],
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
						},
				        { // Secondary yAxis
				            title: {
				                text: arr6[9][this.$store.state.alllang],
				                style: {
				                    color:'red'
				                }
				            },
				            labels: {
				                format: '{value}',
				                style: {
				                    color:'red'
				                }
				            },
				            opposite: true
						}
						
			        ],
			        tooltip: {
                        shared: true,
                        
			        },
			        series: [
				        {
				            name: arr6[6][this.$store.state.alllang],
				            data: arr2,
                            type: 'spline',
                            color:'#2E7DFF'
				        },
				        {  //纵坐标
				            name: arr6[7][this.$store.state.alllang],
				            data: arr4,
				            type: 'spline',
                            yAxis: 1,
                            color:'black',
                            // tooltip:{
                            //     valueDecimals: 2,
                            //     valuePrefix: '$',
                            //     valueSuffix: ' USD'
                            // }
				        },
				        {  //纵坐标
				            name: arr6[8][this.$store.state.alllang],
				            data: arr3,
				            type: 'spline',
                            yAxis: 2,
                            color:'#90ed7d'
				        },
				        {  //纵坐标
				            name: arr6[9][this.$store.state.alllang],
				            data: arr5,
				            type: 'spline',
                            yAxis: 3,
                            color:'red'
				        }

			        ]
				}
                // this.chart = new Highcharts.Chart(chartContainer, options)
                var chart = Highcharts.chart('thirtychart',options)
                
	        	    window.onresize = function () {
	        	    	 chart.reflow();
	        	    }
            },
            fornew(){
                this.xarr = []
                this.userarr = []
                this.tradearr = []
                this.usearr = []
                this.allarr = []
                console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    var url = this.$store.state.requrl+'/'+this.$store.state.appid.split('_')[0].toLowerCase()+'/detail';
                    console.log(url)
                    Axios.post(url,{
                                        "dapp_id":this.$store.state.appid
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        this.arr = res.data.msg
                                        this.urlid = res.data.msg.dapp_id
                                        res.data.msg.day_30.forEach(e => {
                                            var ddd = new Date(e.timestamp*1000-86400000)
                                            var year = ddd.getFullYear()
                                            var month = ddd.getMonth()+1
                                            var day=ddd.getDate();
                                            this.xarr.unshift(year+'/'+month+'/'+day)
                                            this.userarr.unshift(e.day_info[0])
                                            this.tradearr.unshift(e.day_info[2].toFixed(2)-0)
                                            this.usearr.unshift(e.day_info[1])
                                            this.allarr.unshift(e.rank_order)
                                        });
                                        if(this.arr.platform == 'NAS'){
                                            this.theurl = 'https://explorer.nebulas.io/address'+this.arr.contracts[0]
                                        }else if(this.arr.platform == 'ETH'){
                                            this.theurl = 'https://etherscan.io/address/'+this.arr.contracts[0]
                                        }
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
a{
  text-decoration: none;
  outline: none;
  color: #333;
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
    padding: 30px;
    border-radius: 6px;
    box-sizing: border-box;
    position: relative;
    box-shadow: 1px 1px 10px 0px 
		rgba(2, 121, 255, 0.1);
}
.titleimg{
    width:64px;
    height:64px;
    float:left;
    margin-right: 10px;
}
.title{
    float:left;
    text-align: left;
}
.titlf{
    font-size: 24px;
    color: #4f5f6e;
}
.titlty{
    font-size: 16px;
    color: #808c9b;
    margin-top: 10px;
}
.outtitle{
    height: 95px;
    border-bottom: 1px solid #eff3f5;
}
.pic{
    height: 246px; 
    border-bottom: 1px solid #eff3f5; 
    margin-top: 30px;     
    overflow-X: scroll;                                                          
}
.topnav_box::-webkit-scrollbar
{  
    width: 5px;  
    height:4px;     

   background-color:#c1c1c1;

}  
.topnav_box::-webkit-scrollbar-track
{  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);  
    border-radius: 10px; 
      background-color:#f1f1f1;    
    
}
.topnav_box::-webkit-scrollbar-thumb{
    border-radius: 10px;  
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);  
   background-color:#c1c1c1;
} 
.allpic{
    height: 200px;
}
.picwh{
    width: 350px;
    height: 200px;
}
.outpic{
    float: left;
    margin: 0 10px;
}
.inpic{
    float: left;
    margin: 0 10px;
}
.intro{
    width: 100%;
    padding-right: 430px;
    box-sizing: border-box;
    text-align: left;
    margin-top: 30px;
}
.info{
    width: 320px;
    position: absolute;
    top: 0px;
    right: 10px;
    text-align: left;
}
.picture{
    width: 100%;
    height: 585px;
    background-color: #fff;
    margin-top: 30px;
    margin-right: 20px;
    border-radius: 6px;
    padding: 30px;
    box-sizing: border-box;
    box-shadow: 1px 1px 10px 0px 
		rgba(2, 121, 255, 0.1);
}
.news{
    width: 100%;
    box-sizing: border-box;
    overflow: hidden;
    
}
.newact{
    padding: 30px;
    float: left;
    border-radius: 6px;
    background-color: #fff;
    width: 43%;
    margin-right: 30px;
    margin-top: 30px;
}
.newinfo{
    padding: 30px;
    float: left;
    background-color: #fff;
    width: 95%;
    margin-top: 30px;
    text-align: left;
    box-shadow: 1px 1px 10px 0px 
		rgba(2, 121, 255, 0.1);
}
.go{
    width: 14px;
    height: 14px;
    background-image: url(../../static/go.png);
    display: inline-block;
}
.base:hover a{
    color: #409efe;
}
.base:hover .go{
    background-image: url(../../static/go1.png);
}
</style>
