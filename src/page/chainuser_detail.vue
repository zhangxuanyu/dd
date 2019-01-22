<template>
    <div  class="out" :style="{minHeight:geth,marginLeft:mglf,minWidth:'1000px'}" >
        <div class="contright">
            <!-- dapp介绍 -->
            <div class="dapp" style="">
                <p class="preview">{{ttarr[0][$store.state.alllang]}}</p>
                <div class="infoout">
                    <div class="infoleft">
                        <div class="typename">
                            <p v-for="(item,index) in arr[0]">{{item.type[$store.state.alllang]}}</p>
                        </div>
                        <div class="typevalue">
                           <p v-for="(item,index) in arr[0]">{{item.value}}</p>
                        </div>
                    </div>
                    <div class="inforight">
                        <div class="typename">
                            <p v-for="(item,index) in arr[1]">{{item.type[$store.state.alllang]}}</p>
                        </div>
                        <div class="typevalue">
                            <p v-for="(item,index) in arr[1]">{{item.value}}</p>
                        </div>
                    </div>
                </div>

            </div>
            
            <!-- 24小时概况 -->
            <div class="dapp" style="">
               <div v-for="(item,index) in dayarr" :key="index" class="daydata">
                   <p>{{item.title[$store.state.alllang]}} 
                       <!-- <span v-if="index == 2||index == 4" style="font-size:12px;">({{arr.blockchain=='tron'?'TRX':arr.blockchain.toUpperCase()}})</span>  -->
                    </p>
                   <p>{{item.value=="-"?item.value:item.value.toFixed(0)}}</p>
                   
               </div>
            </div>

            <!-- 常用dapp -->

            <div class="dapp">
                <div class="top" style="font-weight:600;color:#212229;margin-bottom:30px;text-align:left;">
                    常用dapp
                    <the-time></the-time>
                </div>

                <table  width="100%" cellspacing='0' style="text-align: center;">
                <tr class="top" style="color: #464a58;background-color:#f7fafc;">
                    <th  v-for="(item,index) in titlearr" class="title all" 
                    :style="{width:stylearr[index],borderBottom:'2px solid #ebecf0'}" 
                    :class="{cur:rankpic_arr[ranknum[index]]}" 
                    :key="index"
                    @click="rankdata(index)"
                    >
                       <span>{{item[$store.state.alllang]}}</span>  <span v-if="index == 4||index == 6" style="font-weight:400;color:#797b8e;">(ETH)</span>  
                        <img :src="rankpic_arr[ranknum[index]]" alt="" style="width:6px;height:12px;vertical-align: -1px;margin-left:6px;" v-if="rankpic_arr[ranknum[index]]" >
                    </th>
                </tr>
                <tr class="top pd" v-for="(item,index) in dapparr" :key="index">
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{index+1+(currentPage1-1)*pagesize}}</td>


                    <!-- icon选择 -->
                    <td class="title all hhvv cur " @click="gotodetail(item.dapp_id)" :style="index == arr.length -1 ?{border:'none'}:''"><div class="ttimg picfalse" v-show="picfalt">
                        <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.dapp_id+'.jpg'" alt="" onerror="javascript:this.src=''" style="width:26px;height:26px;position:absolute;">
                         <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.title+'.jpg'" alt="" onerror="javascript:this.src='../../static/all1.png'" style="width:26px;height:26px;position:absolute;">
                    </div>{{item.title[$store.state.alllang]}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.new_user.toString())}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.active_user.toString())}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.vol.toFixed(2))}}</td>
                    <td class="title all" :style="index == arr.length -1 ?{border:'none'}:''">{{conversion(item.call.toString())}}</td>
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
    </div>
</template>

<script>
import Highcharts from "highcharts/highstock";
import Axios from "axios";
import theTime from '../components/user_time'
export default {
  components:{
        theTime
    },
  data() {
    return {
      geth: "",
      mglf: "",
      open: "",
      all:1,
      // 排序功能控制数组 
      ranknum:[-1,-1,0,0,0,0,-1],
      stylearr:['','','100px','','','',''],
      currentPage1: 1,
      pagesize:30,
      //是否有通过id命名的icon
        picfalt:false,
      dapparr:[
          {"new_user": 111, "active_user": 606, "day_vol": 1494.8659135642813, "title": ["IDEX", "IDEX"], "category": "exchanges", "dapp_id": "ETH_356", "call": 4184, "vol": 1494.8659135642813, "day_tx": 437, "blockchain": "eth", "day_call": 4184}
      ],
      // 排序功能图片数组
        rankpic_arr:[
            '../../static/sort1.png','../../static/sort2.png','../../static/sort3.png'
        ],
      titlearr:[[' ',' '],['Dapp','Dapp'],['交易次数','Tx'],['交易额','Volume'],['活跃天数','Active Day'],['最近活跃','All Tx'],['Dapp类型','Dapp Type']],
      arr: [
          [{
              type:['用户地址','User Address'],
              value:'asasdasda'
          },
          {
              type:['创建时间','Start Time'],
              value:'asasdasda'
          },
          {
              type:['创建人','Builder'],
              value:'asasdasda'
          }],
           [ {
                type:['活跃天数','Active Day'],
                value:'asasdasda'
            },
            {
                type:['最近活跃','Last Active'],
                value:'asasdasda'
            }]
      ],
     
      reqAarr: ["ETH", "EOS", "NAS"],
      ttarr: [
        ["基本信息", "Base Info"],
        ["基本信息", "Basic Information"],
        ["访问主页", "Homepage"],
        ["查看GitHub源码", "GitHub"],
        ["智能合约", "Smart contract"],
        ["合约地址", "Contract address"],
        ["展开", "Show"],
        ["24小时概况", "Data 24H"],
        ["热门Dapp", "Hot Dapp"],
        ["更多", "More"],
        ["应用详情", "Details"],
        ["近 30 日排名", "Rank History"],
        ["预览","Preview"]
      ],
      dayarr:[
          {
            title:['新增用户','new users'],
            value:51651,
            rate:5.23
          },
          {
            title:['活跃用户','active users'],
            value:51651,
            rate:5.23
          },
          {
            title:['交易量','volume'],
            value:51651,
            rate:5.23
          },
          {
            title:['调用次数','transaction'],
            value:51651,
            rate:5.23
          },
          {
            title:['Dapp交易量','dapp vol'],
            value:51651,
            rate:5.23
          },
          {
            title:['Dapp调用次数','dapp tx'],
            value:51651,
            rate:5.23
          }
      ],
    };
  },
  created() {
    this.$store.commit("changemenuflag", false);
    this.$store.commit("changeloadopacty", true);
    this.$store.commit("changeloadflge", true);
    this.geth = window.innerHeight - 60 + "px"
    setTimeout(() => {
        let href = window.location.href;
        if (href.indexOf("?") > -1) {
        console.log(window.location.href.split("?")[1].split("=" || "&"));
        var code = window.location.href.split("?")[1].split("=")[0];
        var num = window.location.href.split("?")[1].split("=")[1];
        this.urlid = num;
        this.$store.commit("theappid", num);
        }
    }, 200);

    if (this.$store.state.themenuflag) {
      this.open = 0 + "px";
      this.mglf = 290 + "px";
    } else {
      this.open = "";
      this.mglf = "";
    }
  },
  mounted() {
   
  },
  computed: {
    addclose() {
      return this.$store.state.themenuflag;
    },
    thelang() {
      return this.$store.state.alllang;
    }
  },
  watch: {
    addclose(n, o) {
      console.log(1111111111111);
      if (n) {
        this.open = 0 + "px";
        this.mglf = 290 + "px";
      } else {
        this.open = "";
        this.mglf = "";
      }

      var newchart = setInterval(() => {
        window.chartsss.reflow();
      }, 17);
      setTimeout(() => {
        clearInterval(newchart);
      }, 1010);
    },
    thelang(n, o) {
      
    }
  },
  methods: {
      handleCurrentChange(val) {
                    console.log(`当前页: ${val}`);
                    this.$store.commit('savepage',val)
                    this.fornew()
                },
      handleSizeChange(val) {
                    console.log(`每页 ${val} 条`);
                },
      //数字字符串添加逗号
                conversion(str){
                    if(/\./.test(str)){
                        return str.replace(/\d(?=(\d{3})+\.)/g, "$&,").replace(/\d{3}(?![,.]|$)/g, "$&,");
                    }else{
                        return str.replace(/\d(?=(\d{3})+$)/g, "$&,");
                    }
                },
    gotodapp(type,id){
        if(type == 1){
            this.$router.push({ path: "/rank" });
        }else if(type == 2){
            this.$router.push({ path: "/detail?id="+id });
        }
    }
  }
};
</script>

<style scoped>
table {
     table-layout:fixed;
     }
table tr{
    background-color: #f9f9f9;
    height: 55px;
} 
table td{
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis;
    background-color: #fff;
    } 
.out {
  margin-left: 110px;
  margin-top: 102px;
  padding-left: 1px;
  margin-right: 30px;
  box-sizing: border-box;
  overflow: visible;
  transition: all 0.5s;
}
a {
  text-decoration: none;
  outline: none;
  color: #333;
}
.leftme {
  position: fixed;
  z-index: 100;
  top: 60px;
  left: 73px;
  transition: all 0.5s;
}
.alltitle {
  margin-top: 50px;
  margin-bottom: 30px;
  text-align: left;
  font-size: 24px;
  color: #c1c7cd;
}
.contright {
  width: 100%;
  box-sizing: border-box;
}
.dapp {
  width: 100%;
  background-color: #fff;
  padding: 30px;
  margin-bottom: 30px;
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
  box-shadow: 3px 2px 10px 0px rgba(37, 48, 76, 0.08);
}
.preview{
    text-align: left;
    font-size: 16px;
    color: #111;
    font-weight: 600;
    margin-bottom: 10px;
}
.chain_content{
    font-size: 14px;
	line-height: 30px;
	letter-spacing: 0px;
	color: #797b8e;
    text-align: left;
    margin-top: 10px;
    margin-bottom: 20px;
}
.info {
  width: 400px;
  text-align: left;
  height: 50px;
}
.go {
  width: 14px;
  height: 14px;
  background-image: url(../../static/go.png);
  display: inline-block;
}
.base{
    float: left;
}

.base:hover a {
  color: #409efe;
}
.base:hover .go {
  background-image: url(../../static/go1.png);
}
.tableout{
    padding-right: 90px;
    position: relative;
}
.showcontract{
    position: absolute;
    width: 67px;
	height: 30px;
	background-color: #49a5fb;
	border-radius: 4px;
    color: #fff;
    font-size: 14px;
    line-height: 30px;
    top: 0px;
    right: 0px;
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

.daydata{
    float: left;
    width: 16.66%;
}
.daydata p:nth-of-type(1){
    font-size: 14px;
	line-height: 18px;
	letter-spacing: 0px;
	color: #797b8e;
}

.daydata p:nth-of-type(2){
    font-size: 30px;
	line-height: 24px;
	color: #464a58;
    margin-top: 25px;
}
.daydata p:nth-of-type(3){
    font-size: 14px;
	line-height: 24px;
	letter-spacing: 0px;
	color: #1ccfa7;
    margin-top: 13px;
}
.infoout{
    overflow: hidden;
}
.infoleft{
    float: left;
}
.inforight{
    float: right;
}
.infoleft,.inforight{
    width: 50%;
    overflow: hidden;
    font-size: 14px;
}
.typename{
    float: left;
    margin-right: 40px;
    text-align: left;
}
.typevalue{
    float: left;
    text-align: left;
}
.infoout p{
    line-height: 30px;
}
</style>
<style>
.el-input__inner {
  border: 1px solid #f7f8fa;
}
.el-input__inner:hover {
  border-color: #f7f8fa;
}
.el-range-editor.el-input__inner {
  border-radius: 20px;
  background-color: #f7f8fa;
}
.el-range-editor .el-range-input {
  background-color: #f7f8fa;
}
.el-pagination {
  font-weight: 400;
}
.el-date-editor--daterange.el-input,
.el-date-editor--daterange.el-input__inner,
.el-date-editor--timerange.el-input,
.el-date-editor--timerange.el-input__inner {
  width: 350px;
}
.el-icon-date:before {
  content: "";
}
.el-pager li.active {
  color: rgb(73, 165, 251);
}
.el-pager li:hover {
  color: #49a5fb;
}
.el-pagination {
  font-weight: 400;
}
</style>