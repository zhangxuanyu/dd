<template>
    <div class="out"  :style="{marginLeft:theleft}">
        <!-- <p  class="alltitle">{{toparr[0][$store.state.alllang]}}</p> -->
        <div class="ranktb">
            <p class="title">{{toparr[0][$store.state.alllang]}}</p>
            <div class="searchbox">
                 <input type="text" v-model="code1"  :placeholder="toparr[0][$store.state.alllang]" style="float:left;width:510px;font-size: 16px;"  @keyup.13="serch()"> <img src="../../static/search1.png" @click="serch" alt="" style="vertical-align:-5px;float:right;">
            </div>
            <p class="tips">"{{code}}"{{toparr[1][$store.state.alllang]}}</p>
            <table  width="100%" cellspacing='0' style="text-align: center;">
                <tr class="top bg pd">
                    <th class="all" v-for="(item,index) in titlearr" :style="index==0?{borderLeft:'1px solid rgb(235, 236, 240)'}:''">{{item[$store.state.alllang]}}</th>
                </tr>
                <tr  class="top pd conthover" v-for="(item,index) in arr">
                    <td class="title all" style="border-left:1px solid rgb(235, 236, 240);">{{index+1+(currentPage1-1)*10}}</td>
                    <td class="title all hhvv cur" @click="gotodetail(item.dapp_id)"><div style="width:26px;height:26px;border-radius: 13px;backgroundImage:url(../../static/all1.png);display:inline-block;margin-top:5px;vertical-align:-5px;margin-right:10px;"></div>{{item.title}}</td>
                    <td class="title all">{{item.dapp_id.split('_')[0]}}</td>
                    <td class="title all">{{item.category}}</td>
                    <td class="title all">
                        {{item.description}}
                        </td>
                    
                </tr>
            </table>
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page.sync="currentPage1"
                :page-size="10"
                layout="total, prev, pager, next"
                :total="all" style="margin-top:30px;">
            </el-pagination>
        </div>
        
    </div>
</template>

<script>
import Axios from 'axios';
export default {
            data(){
                return{
                    toparr:[['搜索中心','Search Center'],['搜索结果','Search Result'],['请输入搜索内容','Search…']],
                    titlearr:[['序号','Serial Number'],['名称','Name'],['平台','Platform'],['分类','Category'],['简介','Introduction']],
                    arr:[],
                    currentPage1: 1,
                    code:'',
                    code1:'',
                    all:'',
                    theleft:'330px'
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
                let href = window.location.href;
                if(href.indexOf('?')>-1){
                    console.log(window.location.href.split('?')[1].split('='||'&'))
                    var code = window.location.href.split('?')[1].split('=')[0];
                    var num = window.location.href.split('?')[1].split('=')[1];
                    // this.code = num
                    var num1 = num.replace(/(%[0-9]+)/, ' ')
                    var num2 =  num.replace(/(%[0-9]+)/, '-')
                    console.log(num2)
                    console.log(decodeURIComponent(num))
                    this.code = decodeURIComponent(num)
                    this.code1 = decodeURIComponent(num)
                }
                this.fornew()
                this.cglf(this.$store.state.themenuflag)
            },
            methods:{
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
                    this.fornew()
                },
                gotodetail(a){
                    this.$router.push({path:'/detail?id='+a});
                },
               //请求数据函数
                fornew(){
                    console.log(this.$store.state.moneyty,this.$store.state.requesttime)
                    var url = this.$store.state.requrl+'/search';
                    Axios.post(url,{
                                        "key_words":this.code,
                                        "page":this.currentPage1
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        this.all = res.data.msg.count
                                        this.arr = res.data.msg.dapp_list
                                        this.$store.commit('changeloadopacty',false)
                                    })
                },
                serch(){
                    this.code = this.code1
                    this.fornew()
                }
            }
}
</script>

<style scoped>
input{  
	background:none;  
	outline:none;  
	border:0px;  
}
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
     background-color: #fff;
     min-height: 696px;
     box-sizing: border-box;
     padding: 0 40px;
     padding-top: 50px;
     box-shadow: 1px 1px 10px 0px 
		rgba(2, 121, 255, 0.1);
    padding-bottom: 40px;
}
.alltitle{
    margin-bottom: 30px; 
    text-align: left;
    font-size: 24px;
    color: #c1c7cd;
}
.top{
    height: 55px;
    line-height: 51px;
    font-size: 16px;
    color: #111111;
    padding-left: 30px;
    box-sizing: border-box;
    text-align: left;
    border-bottom: 1px solid #ececec;
}
.title{
    font-size: 36px;
    color: #4f5f6e;
    margin-bottom: 40px;
}
.searchbox{
    width: 600px;
    height: 60px;
    line-height: 60px;
    margin: 0 auto;
    margin-bottom: 40px;
    border: solid 1px #ececec;
    padding: 20px;
    box-sizing: border-box;
}
.tips{
    font-size: 16px;
    color: rgb(33, 34, 41);
    font-weight: 600;
    text-align: left;
    margin-bottom: 20px;
}
.bg{
    background-color: #f9f9f9;
}
.pd{
    padding-left: 0px;
}
.all{
    text-align: center;
    height: 51px;
    font-size: 14px;
    border-right: 1px solid rgb(235, 236, 240);
    border-bottom: 1px solid rgb(235, 236, 240);
    white-space: nowrap;
    color: #808c9b;
}
.bg .all{
    border-top: 1px solid rgb(235, 236, 240);
    color: #4f5f6e;
}
.all:nth-of-type(1){
    width: 100px;
}
.all:nth-of-type(2){
    width: 250px;
    padding-left: 20px;
    box-sizing: border-box;
    text-align: left;
}
.all:nth-of-type(3){
    width: 100px;
}
.all:nth-of-type(4){
    width: 150px;
}
.all:nth-of-type(5){
    padding-left: 20px;
    box-sizing: border-box;
    text-align: left;
}
.conthover:hover{
    background-color: #fbfeff;
}
.hhvv:hover{
    color: #409efe;
}


</style>


