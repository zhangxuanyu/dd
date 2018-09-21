<template>
    <div class="out" :style="{marginLeft:theleft,minWidth: '1144px'}">
        <!-- <p class="alltitle">{{toparr[$store.state.alllang]}}</p> -->
        <the-sel></the-sel>
        <div class="ranktb"  style="minHeight:955px;">
            <div class="top" style="font-weight: 600;color:#212229;">
                 {{toparr[$store.state.alllang]}}
            </div>
            <table  width="100%" cellspacing='0' style="text-align: center;">
                <tr class="top bg" style="color: rgb(70, 74, 88);">
                    <th  v-for="(item,index) in titlearr" class="title all" :style="{width:stylearr[index],borderBottom:'2px solid #ebecf0'}">{{item[$store.state.alllang]}}</th>
                </tr>
                <tr  class="top pd" v-for="(item,index) in arr">
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{index+1+(currentPage1-1)*10}}</td>
                   <td class="title all hhvv cur" @click="gotodetail(item.dapp_id)" :style="index == arr.length -1 ?{border:'none'}:''"><div class="ttimg"><img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.dapp_id+'.jpg'" alt="" onerror="javascript:this.src='../../static/all1.png'" style="width:26px;height:26px;position:absolute;"></div>{{item.title}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">
                        <img src="../../static/up.png" alt="" v-if="item.change > 0" class="mgt">
                        <img src="../../static/down.png" alt="" v-if="item.change < 0" class="mgt" >
                        {{item.change}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.total_vol.toFixed(2))}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.day_vol.toFixed(2))}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.day_vol_rate.toFixed(2))}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.average_vol.toFixed(2))}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none',textTransform:'capitalize'}:{textTransform:'capitalize'}">{{item.category}}</td>
                </tr>
            </table>
           
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
                    toparr:['交易金额排行','Volume'],
                    titlearr:[[' ',' '],['名称','Name'],['变动情况','Changes'],['交易量','Volume'],['当日交易量','Daily Volume'],['增长率','Growth Rate'],['日均交易量','ADTV'],['分类','Category']],
                    arr:[],
                    currentPage1: 1,
                    //请求数组
                    reqarr:['eth','eos','nas'],
                    reqAarr:['ETH','EOS','NAS'],
                    all:'',
                    // typearr:['total','game','tool','market','other'],
                    allmoney:[['total','exchanges','games','high-risk','marketplaces','gambling','other'],['total','game','tool','exchange','other'],['total','Game','Tool','Market','Other']],
                    theleft:'280px',
                    stylearr:['','','100px','','','','','']
                    
                }
            },
            computed:{
                //监听时间和币种的改变
                themoney(){
                    this.currentPage1 = this.$store.state.yourpage
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
            created(){
                this.$store.commit('changeloadopacty',true)
                this.$store.commit('changeloadflge',true)
                setTimeout(()=>{
                    this.fornew()
                },50)
                this.cglf(this.$store.state.themenuflag)
                this.currentPage1 = this.$store.state.yourpage
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
                    // this.$store.commit('falsemenu',false)
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
                                        "order_by":'vol',
                                        "category":this.allmoney[this.$store.state.moneyty][this.$store.state.dapptype]
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        this.all = res.data.msg.count
                                        this.arr = res.data.msg.data.data
                                        this.$store.commit('changeloadopacty',false)
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
    /* background-color: #f9f9f9; */
}
.pd{
    padding-left: 0px;
}
.all{
    text-align: right;
    padding-right: 20px;
    box-sizing: border-box;
    height: 71px;
    font-size: 14px;
    border-bottom: 1px solid #ececec;
    white-space: nowrap;
    position: relative;
}
.all:nth-of-type(1){
    text-align: center;
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
    width: 141px;
}
.all:nth-of-type(2){
    width: 406px;
}
.all:nth-of-type(3){
    width: 166px;
}
.all:nth-of-type(4){
    width: 165px;
}
.all:nth-of-type(5){
    width: 181px;
}
.all:nth-of-type(6){
    width: 160px;
}
.all:nth-of-type(7){
    width: 180px;
}
.all:nth-of-type(8){
    width: 141px;
} */

</style>

<style>
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

