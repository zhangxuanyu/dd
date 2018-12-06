<template>
    <div class="out" :style="{marginLeft:theleft,minWidth: '1144px'}">
        <!-- <p class="alltitle">{{toptip[$store.state.alllang]}}</p> -->
        <the-sel></the-sel>
        <div class="ranktb" style="minHeight:955px;">
            <div class="top" style="font-weight: 600;color:#212229;margin-bottom:30px;">
                 {{toptip[$store.state.alllang]}}
                 <the-time></the-time>
            </div>
            <table  width="100%" cellspacing='0' style="text-align: center;">
                <tr class="top bg" style="color: rgb(70, 74, 88);background-color:#f7fafc;">
                    <th  v-for="(item,index) in titlearr" class="title all" :style="{width:stylearr[index],borderBottom:'2px solid #ebecf0'}" :class="{cur:rankpic_arr[ranknum[index]]}" 
                    :key="index" @click="rankdata(index)">
                        {{item[$store.state.alllang]}}
                        <img :src="rankpic_arr[ranknum[index]]" alt="" style="width:6px;height:12px;vertical-align: -1px;margin-left:6px;" v-if="rankpic_arr[ranknum[index]]" >
                    </th>
                </tr>
                <tr  class="top pd" v-for="(item,index) in arr">
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{index+1+(currentPage1-1)*pagesize}}</td>
                    <td class="title all hhvv cur" @click="gotodetail(item.dapp_id)" :style="index == arr.length -1 ?{border:'none'}:''"><div class="ttimg"><img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.dapp_id+'.jpg'" alt="" onerror="javascript:this.src='../../static/all1.png'" style="width:26px;height:26px;position:absolute;"></div>{{item.title[$store.state.alllang]}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.total_call.toString())}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.day_call.toString())}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion((item.call_rate*100).toFixed(2))}}%</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none',textTransform:'capitalize'}:{textTransform:'capitalize'}">{{item.category}}</td>
                </tr>
            </table>
            
            <div style="width:400px;height:50px;margin:0 auto;margin-top:40px;"  v-if="arr.length>=1">
                <span style="float:left;margin-top:7px;font-size:12px;color:#4f5f6e;" v-if="$store.state.alllang == 0">共 {{all}} 条</span>
                <span style="float:left;margin-top:7px;font-size:12px;color:#4f5f6e;" v-if="$store.state.alllang == 1">Total {{all}} items</span>
                <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page.sync="currentPage1"
                    :page-size="pagesize"
                    layout="prev, pager, next"
                    :total="all" style="width:200px;float:left;">
                </el-pagination>
            </div>
        </div>
    </div>
</template>

<script>
import theSel from '../components/type_money'
import theTime from '../components/time_type'
import Axios from 'axios';
export default {
    components:{
               theSel,theTime
            },
            data(){
                return{
                    // 排序功能图片数组
                    rankpic_arr:[
                        '../../static/sort1.png','../../static/sort2.png','../../static/sort3.png'
                        ],
                    // 排序功能控制数组 
                    ranknum:[-1,-1,0,0,0,-1],
                    toptip:['合约调用排行','Transactions'],
                    titlearr:[[' ',' '],['名称','Name'],['调用次数','Transactions'],['当日调用次数','Daily Transactions'],['增长率','Growth Rate'],['分类','Category']],
                    arr:[],
                    currentPage1: 1,
                    //请求数组
                    reqarr:['eth','eos','nas','tron'],
                    reqAarr:['ETH','EOS','NAS'],
                    allmoney:[['total','exchanges','games','high-risk','marketplaces','gambling','other'],['total','game','tool','exchange','marketplaces','gambling','high-risk','other'],['total','Game','Tool','Market','Other'],['total','Gambling','Games','Other']],
                    all:'',
                    theleft:'280px',
                    stylearr:['','','100px','','','',''],
                    pagesize:30
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
                    this.currentPage1 = this.$store.state.yourpage
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
                this.$store.commit('changeloadopacty',true)
                this.$store.commit('changeloadflge',true)
                setTimeout(()=>{
                    this.fornew()
                },50)
                this.cglf(this.$store.state.themenuflag)
                this.currentPage1 = this.$store.state.yourpage
            },
            methods:{
                rankdata(index){
                    console.log(this.ranknum[index])
                    if(index>1&&index<6){
                        if(this.ranknum[index] == 0){
                            this.ranknum=[-1,-1,0,0,0,0,-1]
                            this.ranknum[index] = 1
                        }else if(this.ranknum[index] == 1){
                            this.ranknum=[-1,-1,0,0,0,0,-1]
                            this.ranknum[index] = 2
                        }else if(this.ranknum[index] == 2){
                            this.ranknum=[-1,-1,0,0,0,0,-1]
                            this.ranknum[index] = 1
                        }
                        
                    }
                },
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
                    // console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    // var url = this.$store.state.requrl+'/'+this.reqarr[this.$store.state.moneyty]+'/rank';
                    // Axios.post(url,{
                    //                     "page":this.currentPage1,
                    //                     "timestamp":this.$store.state.requesttime/1000+86400,
                    //                     "order_by":'call',
                    //                     "num":this.pagesize,
                    //                     "category":this.allmoney[this.$store.state.moneyty][this.$store.state.dapptype]
                    //                 },{
                    //                     headers: {'Content-Type': "application/x-www-form-urlencoded"}
                    //                 }).then(res => {
                    //                     console.log(res.data.msg)
                    //                     this.all = res.data.msg.count
                    //                     this.arr = res.data.msg.data.data
                    //                     this.$store.commit('changeloadopacty',false)
                    //                 })


                    if(this.$store.state.moneyty <= 2){
                        var url =  this.$store.state.requrl+'/'+this.reqarr[this.$store.state.moneyty]+'/rank';
                        Axios.post(url,{
                                            "page":this.currentPage1,
                                            "timestamp":this.$store.state.requesttime/1000+86400,
                                            "order_by":'call',
                                            "num":this.pagesize,
                                            "category":this.allmoney[this.$store.state.moneyty][this.$store.state.dapptype]
                                        },{
                                            headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                        }).then(res => {
                                            console.log(res.data.msg)
                                            this.all = res.data.msg.count
                                            this.arr = res.data.msg.data.data
                                            // this.rankarr(1,'rank_order')
                                            
                                            this.$store.commit('changeloadopacty',false)
                                        })

                    }else if(this.$store.state.moneyty == 3){
                        var url =  this.$store.state.requrlnew+'/dapp/rank';
                        Axios.post(url,{
                                            "blockchain": this.reqarr[this.$store.state.moneyty],
                                            "timestamp": this.$store.state.requesttime/1000,
                                            "order": "total_call",
                                            "category": this.allmoney[this.$store.state.moneyty][this.$store.state.dapptype],
                                            "page_num": this.currentPage1,
                                            "page_size": this.pagesize,
                                            "rank": "call",
                                            "stat": -1
                                        },{
                                            headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                        }).then(res => {
                                            console.log(res.data.msg)
                                            this.all = res.data.msg.count
                                            this.arr = res.data.msg.data
                                            // this.rankarr(1,'rank_order')
                                           
                                            this.$store.commit('changeloadopacty',false)
                                        })
                    }
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
.ranktb{
     width: 98%;
     /* height: 899px; */
     padding-bottom: 59px;
     background-color: #fff;
     padding: 28px 30px 30px 30px;
     box-sizing: border-box;
     margin-top: 25px;
     box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
}
.alltitle{
    margin-bottom: 30px; 
    text-align: left;
    font-size: 24px;
    color: #c1c7cd;
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
    width: 100px;
    text-align: center;
}
.all:nth-of-type(2){
    text-align: left;
}
.pd:hover{
    background-color: #f9f9f9;
}

.hhvv {
  color: #409efe;
  font-weight: 600;
}
.hhvv:hover {
  color: rgb(34,48,74);
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


