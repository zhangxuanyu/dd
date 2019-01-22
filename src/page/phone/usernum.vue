<template>
    <div>
        <my-chain></my-chain>
        <p class="title">{{toparr[0][$store.state.alllang]}}</p>
        <my-type></my-type>

        <div style="padding:0.4rem;background-color:#FFF;margin-top:1.2rem;box-shadow:0.03rem 0.02rem 0.1rem 0rem rgba(37, 48, 76, 0.08);box-sizng:border-box;">
        <div class="tableout">
            <ul class="table">
                <li v-for="(item,index) in titlearr" :key="index">
                    <div  class="all titletop" :style="index == 1?{textAlign:'left'}:{}">
                        {{item[$store.state.alllang]}} 
                        <img :src="rankpic_arr[ranknum[index]]" alt="" style="width:6px;height:12px;vertical-align: -1px;margin-left:6px;" v-if="rankpic_arr[ranknum[index]]" > 
                    </div>


                    <div class="all" v-if="index == 0" v-for="(it,idx) in arr" :key="idx">
                        {{idx+1+(thepage-1)*thepagesize}}
                    </div>
                    <div class="all" v-if="index == 1" v-for="(it,idx) in arr" :key="idx" style="text-align:left;overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;"  @click="gotodetail(it.dapp_id)">
                       {{it.title[$store.state.alllang]}}
                    </div>
                    <div class="all" v-if="index == 2" v-for="(it,idx) in arr" :key="idx">
                        {{conversion(it.total_user.toString())}}
                    </div>
                    <div class="all" v-if="index == 3" v-for="(it,idx) in arr" :key="idx">
                        {{conversion(it.new_user.toString())}}
                    </div>
                    <div class="all" v-if="index == 4" v-for="(it,idx) in arr" :key="idx">
                        {{conversion(it.active_user.toString())}}
                    </div>
                    <div class="all" v-if="index == 5" v-for="(it,idx) in arr" :key="idx">
                        {{it.category}}
                    </div>
                    
                </li>
            </ul>
           
        </div>
        </div>
        
        
        <div class="botpage">
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
        </div>
    </div>
</template>

<script>
import myChain from '../../components/phone/chain'
import myType from '../../components/phone/time_type'
import Axios from 'axios';
export default {
    components:{
        myChain,
        myType
    },
    data(){
        return{
            toparr:[['用户数量排行','Users'],['上一页','pre'],['下一页','next'],['第','page'],['页','']],
            titlearr:[[' ',' '],['名称','Name'],['累计用户','Total Users'],['新增用户','New Users'],['活跃用户','Active Users'],['分类','Category']],
            stylearr:['','3.1rem','','','','',''],
            // 排序功能图片数组
                    rankpic_arr:[
                        '../../static/sort1.png','../../static/sort2.png','../../static/sort3.png'
                        ],
                        //请求数组
                    reqarr:['eth','eos','nas','tron','neo','qtum','gxchain'],
                        // 排序功能控制数组 
                    ranknum:[-1,-1,0,0,0,0,-1],
                    thepage:1,
                    thepagesize:10,
                    arr:[],
                    all:0,
                    allmoney:[['total','exchanges','games','high-risk','marketplaces','gambling','other'],['total','game','tool','exchange','marketplaces','gambling','high-risk','other'],['total','Game','Tool','Market','Other'],['total','Gambling','Games','Other'],['Other'],['Other'],['Other']],
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
        }
    },
    methods:{
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
            this.$router.push({path:'/detail?id='+id});
        },
        //请求数据函数
                fornew(){
                    this.all = 0
                    this.arr = ''
                    console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                     var url =  this.$store.state.requrlnew+'/dapp/rank';
                    Axios.post(url,{
                                        "blockchain": this.reqarr[this.$store.state.moneyty],
                                        "timestamp": this.$store.state.requesttime/1000,
                                        "order": "active_user",
                                        "category": this.allmoney[this.$store.state.moneyty][this.$store.state.dapptype],
                                        "page_num": this.thepage,
                                        "page_size": this.thepagesize,
                                        "rank": "user",
                                        "stat": -1
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        this.all = res.data.msg.count
                                        this.arr = res.data.msg.data
                                        
                                    })
                }
    }
}
</script>

<style scoped  lang="scss">
.title{
	font-size: 0.36rem;
	color: #525864;
    margin-top: 0.85rem;
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
    width: 3.1rem;
}
.titletop{
    font-size: 0.3rem;
	color: #464a58;
    background-color: #f7fafc;
    font-weight: 600;
    border-bottom: 2px solid rgb(235, 236, 240);
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
</style>
