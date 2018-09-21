<template>
    <div class="out"  :style="{marginLeft:theleft,minWidth: '1144px'}">
        <!-- <p class="alltitle">{{toparr[$store.state.alllang]}}</p> -->
        <the-sel></the-sel>
        <div class="ranktb"  style="minHeight:955px;">
            <div class="top" style="font-weight:600;color:#212229;">
                 {{toparr[$store.state.alllang]}}
            </div>
            <table  width="100%" cellspacing='0' style="text-align: center;">
                <tr class="top" style="color: #464a58;">
                    <th  v-for="(item,index) in titlearr" class="title all" :style="{width:stylearr[index],borderBottom:'2px solid #ebecf0'}">{{item[$store.state.alllang]}}</th>
                </tr>
                <tr class="top pd" v-for="(item,index) in arr">
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{item.rank_order}}</td>


                    <!-- icon选择 -->
                    <td class="title all hhvv cur " @click="gotodetail(item.dapp_id)" :style="index == arr.length -1 ?{border:'none'}:''"><div class="ttimg picfalse" v-show="picfalt">
                        <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.dapp_id+'.jpg'" alt="" onerror="javascript:this.src=''" style="width:26px;height:26px;position:absolute;">
                         <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.title+'.jpg'" alt="" onerror="javascript:this.src='../../static/all1.png'" style="width:26px;height:26px;position:absolute;">
                    </div>{{item.title}}</td>
                    


                    <td class="title all" :style="index == arr.length -1 ?{width:stylearr[index],border:'none'}:{width:stylearr[index]}">
                        <img src="../../static/up.png" alt="" v-if="item.change > 0" class="mgt">
                        <img src="../../static/down.png" alt="" v-if="item.change < 0" class="mgt" >
                        {{item.change}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.user.toString())}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.vol.toFixed(2))}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.call.toString())}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{item.value.toFixed(2)}}</td>
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
                    toparr:['综合排行','Rankings'],
                    titlearr:[[' ',' '],['名称','Name'],['变动情况','Changes'],['累计用户','Users'],['交易量','Volume'],['调用次数','Transactions'],['评分','Score'],['分类','Category']],
                    arr:[],
                    currentPage1: 1,
                     //请求数组
                    reqarr:['eth','eos','nas'],
                    reqAarr:['ETH','EOS','NAS'],
                    stylearr:['','','100px','','','',''],
                    all:'',
                    theleft:'280px',
                    idimg:'',
                    //是否有通过id命名的icon
                    picfalt:false
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
                //数字字符串添加逗号
                conversion(str){
                    if(/\./.test(str)){
                        return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
                    }else{
                        return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
                    }
                },
                //排序方法
                rankarr(num,string){
                    if(1 == num ){
                //         //从小到大
                        this.arr.sort(function(a,b){
                            return  a[string]-b[string]
                        })
                    }else{
                //         //从大到小
                        this.arr.sort(function(a,b){
                            return b[string]-a[string]
                        })
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
                    this.$router.push({path:'/detail?id='+a});
                },
                //请求数据函数
                fornew(){
                    this.all = []
                    this.arr = ''
                    this.picfalt = false
                    console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    var url =  this.$store.state.requrl+'/'+this.reqarr[this.$store.state.moneyty]+'/rank';
                    Axios.post(url,{
                                        "page":this.currentPage1,
                                        "timestamp":this.$store.state.requesttime/1000,
                                        "order_by":'total',
                                        "category":"total"
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        this.all = res.data.msg.count
                                        this.arr = res.data.msg.info
                                        // this.rankarr(1,'rank_order')
                                        setTimeout(()=>{
                                            $('.picfalse').each((a)=>{
                                                if($('.picfalse').eq(a)[0].children[0].src.indexOf('jpg')!=-1){
                                                    $('.picfalse').eq(a)[0].children[1].style.width = '0px'
                                                }
                                            })
                                            this.picfalt = true
                                        },1000)
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
   
}
.pd{
    padding-left: 0px;
}
.all{
    text-align: right;
    font-size: 14px;
    height: 71px;
    padding-right: 20px;
    box-sizing: border-box;
    border-bottom: 1px solid #ebecf0;
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
    background-color: #fafbfc;
}

.hhvv:hover{
    color: #409efe;
}
.mgt{
    position: absolute;
    top: 27px;
    left: 27px;
}


</style>

<style>
.el-pager li{
    background: rgba(0,0,0,0)!important;
}
.el-pagination .btn-next, .el-pagination .btn-prev{
    background: rgba(0,0,0,0)!important;
}
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
