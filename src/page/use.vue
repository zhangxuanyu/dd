<template>
    <div class="out" :style="{marginLeft:theleft}">
        <the-sel></the-sel>
        <div class="ranktb" style="minHeight:1000px;">
            <div class="top">
                 {{toptip[$store.state.alllang]}}
            </div>
            <table  width="100%" cellspacing='0' style="text-align: center;">
                <tr class="top bg pd">
                    <th  v-for="(item,index) in titlearr" class="title all" :style="{width:stylearr[index]}">{{item[$store.state.alllang]}}</th>
                </tr>
                <tr  class="top pd" v-for="(item,index) in arr">
                    <td class="title all">{{index+1+(currentPage1-1)*10}}</td>
                    <td class="title all hhvv cur" @click="gotodetail(item.dapp_id)"><div class="ttimg"><img :src="'../../static/icon/'+item.dapp_id+'.jpg'" alt="" onerror="javascript:this.src='../../static/all1.png'" style="width:26px;height:26px;position:absolute;"></div>{{item.title}}</td>
                    <td class="title all">
                        <img src="../../static/up.png" alt="" v-if="item.change > 0" class="mgt">
                        <img src="../../static/down.png" alt="" v-if="item.change < 0" class="mgt" >
                        {{item.change}}</td>
                    <td class="title all">{{conversion(item.total_call.toString())}}</td>
                    <td class="title all">{{conversion(item.day_call.toString())}}</td>
                    <td class="title all">{{conversion(item.call_rate.toFixed(2))}}%</td>
                    <td class="title all">{{item.category}}</td>
                </tr>
            </table>
            <!-- <div  class="top bg pd">
                <div v-for="(item,index) in titlearr" class="title all">{{item}}</div>
            </div>
            <div class="top pd" v-for="(item,index) in arr">
                <div v-for="(it,ind) in titlearr" class="title all">{{item}}</div>
            </div> -->
            <!-- <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="all" style="margin-top:40px;" v-if="arr.length>=1">
            </el-pagination> -->
            <div style="width:300px;height:50px;margin:0 auto;margin-top:40px;"  v-if="arr.length>=1">
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
    </div>
</template>

<script>
import theSel from '../components/type_money'
import Axios from 'axios';
export default {
    components:{
               theSel
            },
            data(){
                return{
                    toptip:['合约调用排行','Transactions'],
                    titlearr:[[' ',' '],['名称','Name'],['变动情况','Changes'],['总调用次数','Transactions'],['当日调用次数','Daily Transactions'],['增长率','Growth Rate'],['分类','Category']],
                    arr:[],
                    currentPage1: 1,
                    //请求数组
                    reqarr:['eth','eos','nas'],
                    reqAarr:['ETH','EOS','NAS'],
                    allmoney:[['total','exchanges','games','high-risk','marketplaces','gambling','other'],['total','game','tool','exchange','other'],['total','Game','Tool','Market','Other']],
                    all:'',
                    theleft:'330px',
                    stylearr:['','','100px','','','','']
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
                thetype(){
                    return this.$store.state.dapptype
                },
                inleft(){
                    return this.$store.state.themenuflag
                }
            },
            watch:{
                themoney(n,o){
                    this.fornew()
                },
                thetime(n,o){
                    this.fornew()
                },
                thetype(n,o){
                    this.fornew()
                },
                inleft(n,o){
                    console.log(n)
                    this.cglf(n)
                }
            },
            created(){
                setTimeout(()=>{
                    this.fornew()
                },50)
                this.cglf(this.$store.state.themenuflag)
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
                cglf(n){
                    if(n){
                        this.theleft='330px'
                    }else{
                        this.theleft='120px'
                    }
                },
                handleSizeChange(val) {
                    console.log(`每页 ${val} 条`);
                },
                handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                    this.fornew()
                },
                gotodetail(a){
                    this.$store.commit('falsemenu',false)
                    this.$router.push({path:'/detail?id='+a});
                },
                //请求数据函数
                fornew(){
                    this.all = []
                    this.arr = ''
                    console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    var url = this.$store.state.requrl+'/'+this.reqarr[this.$store.state.moneyty]+'/rank';
                    Axios.post(url,{
                                        "page":this.currentPage1,
                                        "timestamp":this.$store.state.requesttime/1000,
                                        "order_by":'call',
                                        "category":this.allmoney[this.$store.state.moneyty][this.$store.state.dapptype]
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        this.all = res.data.msg.count
                                        this.arr = res.data.msg.data.data
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
}
.ranktb{
     width: 98%;
     /* height: 899px; */
     padding-bottom: 59px;
     background-color: #fff;
     margin-top: 30px;
     border-radius: 6px;
     box-shadow: 1px 1px 10px 0px 
		rgba(2, 121, 255, 0.1);
}
.top{
    height: 75px;
    line-height: 71px;
    font-size: 16px;
    color: #111111;
    padding-left: 30px;
    box-sizing: border-box;
    text-align: left;
    border-bottom: 1px solid #ececec;
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
    background-color: #f9f9f9;
}
.pd{
    padding-left: 0px;
}
.all{
    text-align: center;
    height: 71px;
    border-bottom: 1px solid #ececec;
    white-space: nowrap;
    position: relative;
}
.all:nth-of-type(1){
    width: 100px;
}
.all:nth-of-type(2){
    text-align: left;
}
.pd:hover{
    background-color: #f9f9f9;
}

.hhvv:hover{
    color: #409efe;
}
.mgt{
    position: absolute;
    top: 27px;
    left: 27px;
}
/* .all:nth-of-type(1){
    width: 153px;
}
.all:nth-of-type(2){
    width: 436px;
}
.all:nth-of-type(3){
    width: 191px;
}
.all:nth-of-type(4){
    width: 208px;
}
.all:nth-of-type(5){
    width: 222px;
}
.all:nth-of-type(6){
    width: 174px;
}
.all:nth-of-type(7){
    width: 155px;
} */


</style>


