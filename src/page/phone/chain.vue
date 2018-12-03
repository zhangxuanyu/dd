<template>
    <div>
        <p class="title">{{toparr[0][$store.state.alllang]}}</p>
        <my-type></my-type>

        <div style="padding:0.4rem;background-color:#FFF;margin-top:0.2rem;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
        <div class="tableout">
            <ul class="table">
                <li v-for="(item,index) in titlearr" :key="index">
                    <div  class="all titletop" :style="index == 1?{textAlign:'left'}:{}">
                        {{item[$store.state.alllang]}} 
                        <img :src="rankpic_arr[ranknum[index]]" alt="" style="width:6px;height:12px;vertical-align: -1px;margin-left:6px;" v-if="rankpic_arr[ranknum[index]]" > 
                    </div>


                    <div class="all" v-if="index == 0" v-for="(it,idx) in chainarr" :key="idx">
                        {{idx+1+(thepage-1)*thepagesize}}
                    </div>
                    <div class="all" v-if="index == 1" v-for="(it,idx) in chainarr" :key="idx"  @click="gotodetail(it.blockchain)">
                       {{it.blockchain.toUpperCase()}}
                    </div>
                    <div class="all" v-if="index == 2" v-for="(it,idx) in chainarr" :key="idx">
                        {{conversion(it.chain_new_user.toString())}}
                    </div>
                    <div class="all" v-if="index == 3" v-for="(it,idx) in chainarr" :key="idx">
                        {{conversion(it.chain_active_user.toString())}}
                    </div>
                    <div class="all" v-if="index == 4" v-for="(it,idx) in chainarr" :key="idx">
                        {{conversion(it.chain_day_vol.toFixed(2))}}
                    </div>
                    <div class="all" v-if="index == 5" v-for="(it,idx) in chainarr" :key="idx">
                        {{conversion(it.chain_day_call.toString())}}
                    </div>
                    <div class="all" v-if="index == 6" v-for="(it,idx) in chainarr" :key="idx">
                        {{it.blockchain!='steem'?conversion(it.dapp_vol.toFixed(2)):'--'}}
                    </div>
                    <div class="all" v-if="index == 7" v-for="(it,idx) in chainarr" :key="idx">
                        {{it.blockchain!='steem'?conversion(it.dapp_call.toString()):'--'}}
                    </div>
                    
                </li>
            </ul>
           
        </div>
        </div>
        
        
        <!-- <div class="botpage">
            <div class="pre" @click="runpage(-1)" v-if="this.thepage>1">
                {{toparr[1][$store.state.alllang]}}
            </div>
            <div class="pre" @click="runpage(1)" v-if="this.thepage<Math.ceil(parseInt(all/thepagesize))">
                {{toparr[2][$store.state.alllang]}}
            </div>
            <p class="rightpage">
                <span>{{toparr[3][$store.state.alllang]}}</span>     
                <el-select v-model="thepage"   class="top_right"  v-if="all">
                        <el-option :key="index" :label="item" :value="item" v-for="(item,index) in  Math.ceil(parseInt(all/thepagesize))" >{{item}}</el-option>
                    </el-select>
                <span>{{toparr[4][$store.state.alllang]}}</span>
            </p>
        </div> -->

        <p class="title" style="margin-top:0.8rem;">{{toparr[5][$store.state.alllang]}}</p>

        <div style="float:left;margin-bottom:0.3rem;" class="right">
                <span style="margin-right:0.14rem;font-size:0.26rem;margin-top: 0.15rem;float:left">{{toparr[6][$store.state.alllang]}}</span>
                <el-select v-model="type"   class="top_right"  style="float:left">
                    <el-option :key="index" :label="item[$store.state.alllang]" :value="index" v-for="(item,index) in typearr1">{{item[$store.state.alllang]}}</el-option>
                </el-select>
            </div>

        <div style="padding:0.8rem 0.4rem 0.5rem 0.4rem;background-color:#FFF;margin-bottom:0.8rem;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;margin-top:1.5rem;">
        <div class="picture">   
          <div class="mychart" id="alluser"></div>
        </div>
        </div>
    </div>
</template>

<script>
import myType from '../../components/phone/time_type'
import Axios from 'axios';
import Highcharts from "highcharts/highstock";
export default {
    components:{
        myType
    },
    data(){
        return{
            toparr:[['公链数据','Chain'],['上一页','pre'],['下一页','next'],['第','page'],['页',''],['整体趋势','Trend'],['分类','Other']],
            titlearr:[[' ',' '],['名称','Name'],['新增用户','New Users'],['活跃用户','Active Users'],['交易量','Volume'],['调用次数','Transactions'],['Dapp交易量','Dapp Vol'],['Dapp调用次数','Dapp Tx']],
            stylearr:['','3.1rem','','','','',''],
            // 排序功能图片数组
                    rankpic_arr:[
                        '../../static/sort1.png','../../static/sort2.png','../../static/sort3.png'
                        ],
                        //请求数组
                    reqarr:['eth','eos','nas'],
                        // 排序功能控制数组 
                    ranknum:[-1,-1,0,0,0,0,-1],
                    thepage:1,
                    thepagesize:10,
                    arr:[],
                    all:0,
                    xarr : [],
                    drawarr : [],
                    chainarr:[],
                    type:2,
                    currentPage1:1,
                    redrawflag:true,
                    typearr1:[["新增用户","New User"],["交易量","Volume"],["调用次数","Transactions"],["Dapp交易量","Dapp Vol"],["Dapp调用次数","Dapp Tx"]],
                    allmoney:[['total','exchanges','games','high-risk','marketplaces','gambling','other'],['total','game','tool','exchange','marketplaces','gambling','high-risk','other'],['total','Game','Tool','Market','Other']],
        }
    },
    created(){
        // this.$store.commit('changeloadopacty',true)
            //     this.$store.commit('changeloadflge',true)
                setTimeout(()=>{
                    this.fornew()
                },50)
                this.thepage = this.$store.state.yourpage
    },
    computed:{
        themoney(){
                    return this.$store.state.moneyty
                },
         thetime(){
                    return this.$store.state.requesttime
                },
        thetype(){
                    return this.$store.state.dapptype
                },
        thelang(){
                    return this.$store.state.alllang
        }
    },
    watch:{
        themoney(n,o){
                    this.thepage = 1
                    this.fornew()
                },
        thetime(n,o){
                    this.fornew()
                },
        thetype(n,o){
                    this.fornew()
                },
        thepage(n,o){
            this.$store.commit('savepage',n)
            this.fornew()
        },
        redrawflag() {
            setTimeout(() => {
                this.initChart(this.xarr, this.drawarr);
            }, 1000);
            },
            type(n, o) {
            console.log(n);
            setTimeout(() => {
                this.initChart(this.xarr, this.drawarr);
            }, 1000);
            },
            thelang() {
            setTimeout(() => {
                this.initChart(this.xarr, this.drawarr);
            }, 1000);
            }
    },
    methods:{
        initChart(arr1, argument) {
      var obj = this.chart_series(argument);
      console.log("-----------------------");
      console.log(obj);
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
      window.trend = Highcharts.chart("alluser", options1);

      window.onresize = function() {
        // chart.reflow();
        window.trend.reflow();
      };
    },
    //根据数组的长度，组装chart参数
    chart_series(argument) {
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
      var series_obj = [];
      argument.forEach((e, index) => {
        console.log(index);
        series_obj.push({
          name: e.word.toUpperCase(),
          data: e.arr[this.type],
          type: "spline",
          visible: index <= 2 ? true : false
        });
      });
      return series_obj;
    },
        runpage(a){
            this.thepage = this.thepage + a
        },
        //数字字符串添加逗号
                conversion(str){
                    if(/\./.test(str)){
                        return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
                    }else{
                        return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
                    }
                },
        gotodetail(id){
            this.$router.push({ path: "/chaindetail?id=" + id });
        },
        //请求数据函数
                fornew(){
                    // this.all = 0
                    // this.arr = ''
                    // console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    // var url =  this.$store.state.requrl+'/'+this.reqarr[this.$store.state.moneyty]+'/rank';
                    // Axios.post(url,{
                    //                     "page":this.thepage,
                    //                     "timestamp":this.$store.state.requesttime/1000+86400,
                    //                     "order_by":'user',
                    //                     "num":this.thepagesize,
                    //                     "category":this.allmoney[this.$store.state.moneyty][this.$store.state.dapptype]
                    //                 },{
                    //                     headers: {'Content-Type': "application/x-www-form-urlencoded"}
                    //                 }).then(res => {
                                        
                    //                     this.all = res.data.msg.count
                    //                     this.arr = res.data.msg.data.data
                    //                     console.log(this.arr)
                                    
                    //                 })





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

<style scoped  lang="scss">
.title{
	font-size: 0.36rem;
	color: #525864;
    margin-bottom: 0.4rem;
    text-align: left;
}
.tableout{
	background-color: #ffffff;
    overflow-x: scroll;
}
.table{
    width: 20rem;
}
.table li{
    float: left;
    box-sizing: border-box;
}
.all{
    height: 1.6rem;
    line-height: 1.6rem;
    padding: 0 0.3rem;
    font-size: 0.3rem;
	color: #797b8e;
    border-bottom: 1px solid #dfe4ed;
}
.table li:nth-of-type(1) .all{
    width: 1.3rem;
}
.table li:nth-of-type(2) .all{
    
}
.titletop{
    font-size: 0.3rem;
	color: #464a58;
    background-color: #f7fafc;
    font-weight: 600;
    border-bottom: 2px solid rgb(235, 236, 240);
}

.picture {
  background-color: #ffffff;
  overflow-x: scroll;
}

.mychart {
  width: 20rem;
  height: 100%;
}
.botpage{
    height: 1.6rem;
    background-color: #fff;
    padding-top: 0.4rem;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
}
.pre{
    width: 1.3rem;
	height: 0.6rem;
	border: 1px solid #dfe4ed;
    font-size: 0.22rem;
	color: #797b8e;
    float: left;
    margin-right: 0.3rem;
    line-height: 0.6rem;
}
.rightpage{
    float:right;
    font-size: 0.22rem;
	color: #797b8e;
}
</style>

<style>
.rightpage .el-select .el-input__inner{
    width: 1.6rem;
    height: 0.6rem;
}
.rightpage .el-select .el-input .el-select__caret{
    line-height: 0.6rem;
}
.picker-toolbar{
  height: 1rem;
  line-height: 1rem;
  font-size:0.44rem;
  color:#2a79f9;
}
.picker-slot {
  float: left;
}
.picker-items {
  overflow: hidden;
  display: flex;
  font-size:0.44rem;
  position: relative;
  justify-content: space-around;
}
.picker-toolbar {
  display: flex;
  justify-content: space-around;
}
.picker-center-highlight {
  position: absolute;
  width: 100%;
  top: 125px;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
  background-color: rgba(42, 121, 249,0.1);
}


.right .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 194px;
}
.right .el-input--suffix .el-input__inner{
    border-radius: 20px;
    background-color: #f7f8fa;
    width: 200px;
}
.right .el-input__suffix{ 
    right:25px;
}
.right .el-input__inner{
    font-size:14px;
    color:#797b8e;
    height: 30px;
    line-height: 30px;
}
.right .el-input__icon{
    line-height: 30px;
}

</style>
