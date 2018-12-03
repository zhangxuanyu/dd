<template>
    <div>
        <ph-name></ph-name>
        <ph-type></ph-type>
        <!-- <p class="preview">{{ttarr[5][$store.state.alllang]}}</p> -->
                <!-- 轮播图 -->
        <div v-if="arr">
            <p class="preview">{{ttarr[0][$store.state.alllang]}}</p>
            <p class="intro">
                {{arr.description[$store.state.alllang]}}
            </p>

            <p class="preview">{{ttarr[1][$store.state.alllang]}}</p>
            <div class="info">
                <a :href="arr.website.indexOf('http')==-1?'http://'+arr.website:arr.website" target="_black" rel="noopener noreferrer">
                <img src="../../../static/home.png" alt=""><span> {{ttarr[2][$store.state.alllang]}} </span><div class="go" v-if="arr.website"></div>
                </a>
            </div>
            <div class="info">
                <a :href="arr.github?arr.github:'javascript:;'" :style="arr.github?{}:{color:'#ccc'}" target="_black" rel="noopener noreferrer">
                <img src="../../../static/GitHub.png" alt=""><span> {{ttarr[3][$store.state.alllang]}} </span><div class="go" v-if="arr.github"></div>
                </a>
            </div>
        </div>

        <p class="preview">{{ttarr[9][$store.state.alllang]}}</p>

        <div class="daydata">
            <div class="daycont" v-for="(item,index) in dayarr" :key="index">
                <p><span>{{item.title[$store.state.alllang]}}</span><span style="font-size:0.2rem;">(24h)</span></p>
                <p>{{item.value=='-'?item.value:item.value.toFixed(0)}}</p>
                <p :style="item.rate>0?{color:'#1ccfa7'}:item.rate<0?{color:'rgb(248, 94, 112)'}:{}">
                  <img :src="item.rate>0?'../../../static/phone/UP.png':item.rate<0?'../../../static/phone/DOWN.png':''" alt="" style="width:0.12rem;height:0.14rem;">
                  {{item.rate=='-'?item.rate:(item.rate*100).toFixed(5)}}{{item.rate=='-'?'':'%'}}
                </p>
            </div>
        </div>


        <p class="preview titlepre" v-if="$store.state.appid!='steem'">
          <span>{{ttarr[6][$store.state.alllang]}}</span>
          <span @click="gotoother(0,0)">{{ttarr[10][$store.state.alllang]}}</span>
        </p>

        <div class="dapp" v-for="(item,index) in hotarr"  v-if="hotarr.length>=1&&$store.state.appid!='steem'" @click="gotoother(1,item.dapp_id)">
          <div class="dapptitle">
            <div class="imgbox">
              <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.dapp_id+'.jpg'" alt="" onerror="javascript:this.src='../../../static/all1.png'" style="width:1.1rem;height:1.1rem;">
            </div>
            <p style="overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;">{{item.en_cn[$store.state.alllang].title}}</p>
            <p>{{item.blockchain.toUpperCase()}}&nbsp;|&nbsp;{{item.category}}</p>
          </div>
          <div class="dappdata">
            <div class="dappcont">
              <p><span>{{ttarr[7][$store.state.alllang]}}</span> <span style="font-size:0.2rem;">(24h)</span> </p>
              <p>{{item.new_user}}</p>
              <p  :style="item.new_user_rate>0?{color:'#1ccfa7'}:item.new_user_rate<0?{color:'#f85e70'}:{color:'#797b8e'}">
                <img src="../../../static/up.png" alt="" class="mgt" v-if="item.new_user_rate>0">
                <img src="../../../static/down.png" alt="" class="mgt" v-if="item.new_user_rate<0">
                {{(item.new_user_rate*100).toFixed(3)}}%</p>
            </div>

            <div class="dappcont">
              <p><span>{{ttarr[8][$store.state.alllang]}}</span>  <span style="font-size:0.2rem;">(24h)</span> </p>
              <p>{{item.active_user}}</p>
              <p  :style="item.active_user_rate>0?{color:'#1ccfa7'}:item.active_user_rate<0?{color:'#f85e70'}:{color:'#797b8e'}">
                <img src="../../../static/up.png" alt="" class="mgt" v-if="item.active_user_rate>0">
                <img src="../../../static/down.png" alt="" class="mgt" v-if="item.active_user_rate<0">
                {{(item.active_user_rate*100).toFixed(3)}}%</p>
            </div>
          </div>
        </div>

              
    </div>
</template>

<script>
import phName from '../../components/phone/chainname.vue'
import phType from '../../components/phone/chaindetail_type.vue'
import Axios from "axios"; 
export default {
    components:{
        phName,
        phType
    },
    data(){
        return{
            allleng: "",
            //轮播图显示
            picshow: false,
            // 图片数组
            picarr: [1, 2, 3, 4],
            //统计图片数量
            imgcount: 0,
            wrongarr: [
                "../../static/1-0-1.jpg",
                "../../static/1-0-2.jpg",
                "../../static/1-0-24.jpg",
                "../../static/1-0-28.jpg"
            ],
            urlid:'',
            arr:'',
            showindex:0,
            ttarr: [
                ["简介", "Introduction"],
                ["基本信息", "Basic Information"],
                ["访问主页", "Homepage"],
                ["查看GitHub源码", "GitHub"],
                ["合约地址", "Contract address"],
                ["预览","Preview"],
                ["热门Dapp","Hot Dapp"],
                ["新增用户","New User"],
                ["活跃用户","Active User"],
                ["24小时概况","24H Data"],
                ["查看更多","more >"],
            ],
            dayarr:[],
            infoarr:[],
            hotarr:[]
        }
    },
    created(){
        setTimeout(() => {
            this.fornew();
            this.fornewdapp()
        }, 100);
    },
    mounted(){
      
    },
    methods:{
        gotoother(a,b){
          if(a == 0){
            this.$router.push({path:'/rank'});
          }else if(a == 1){
            this.$router.push({path:'/detail?id='+b});
          }
        },
        show_dapp_pic(){
            
        },
        changeindex(flag){
          if(flag){
          if(this.showindex){
              this.showindex = 0
          }else{
              this.showindex = this.arr.contracts.length + 1
          }
        } 
        },
        fornew() {
      console.log(this.$store.state.moneyty, this.$store.state.requesttime);
      console.log(this.$store.state.appid)
      var url =
        this.$store.state.requrlnew +
        "/" +'chain/detail';
      console.log(url);
      Axios.post(
        url,
        {
            "blockchain":this.$store.state.appid
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res.data.msg);
        this.arr = res.data.msg;
        this.dayarr=[
          {
            title:['新增用户','New User'],
            value:this.arr.hour24_item.new_user,
            rate:this.arr.hour24_item.new_user_rate
          },
          {
            title:['活跃用户','Active User'],
            value:this.arr.hour24_item.active_user,
            rate:this.arr.hour24_item.active_user_rate,
          },
          {
            title:['交易量','Volume'],
            value:this.arr.hour24_item.vol,
            rate:this.arr.hour24_item.vol_rate,
          },
          {
            title:['调用次数','Transaction'],
            value:this.arr.hour24_item.call,
            rate:this.arr.hour24_item.call_rate,
          },
          {
            title:['Dapp交易量','Dapp Vol'],
            value:this.arr.hour24_item.dapp_vol,
            rate:this.arr.hour24_item.dapp_vol_rate,
          },
          {
            title:['Dapp调用次数','Dapp Tx'],
            value:this.arr.hour24_item.dapp_call,
            rate:this.arr.hour24_item.dapp_call_rate,
          }
      ]
        // res.data.msg.hour24_item.forEach(e => {
        //   var ddd = new Date(e.timestamp * 1000 - 86400000);
        //   var year = ddd.getFullYear();
        //   var month = ddd.getMonth() + 1;
        //   var day = ddd.getDate();
        // });
        this.$store.commit("changeloadopacty", false);
        this.infoarr = [this.arr.website,this.arr.github]
      });
    },
    fornewdapp(){
      Axios.post(
        this.$store.state.requrlnew + "/hotdapp/test",
        {
          "num":6,
          "order":"active_user",
          "blockchain":this.$store.state.appid
         },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res)
        res.data.msg.data.forEach(element => {
          this.hotarr.unshift(element)
        });
      })
    }
    }
}
</script>

<style scoped>
a{
    text-decoration: none;
    outline: none;
}
.pic {
  height: 4.18rem;
  border-bottom: 1px solid #eff3f5;
  margin-top: 0.2rem;
  overflow-x: scroll;
  margin-right: -0.3rem;
  overflow-y: hidden;
}
.topnav_box::-webkit-scrollbar {
  width: 0;
  height: 0;

  background-color: #c1c1c1;
}
.topnav_box::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 0;
  background-color: #f1f1f1;
}
.topnav_box::-webkit-scrollbar-thumb {
  border-radius: 0;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #c1c1c1;
}

.allpic {
  overflow-y: hidden;
  margin-left: -0.3rem;
}
.picwh {
  width: 6.9rem;
  height: 4.18rem;
}
.outpic {
  float: left;
}
.inpic {
  float: left;
}
.preview{
	font-size: 0.36rem;
	color: #525864;
    font-weight: 600;
    text-align: left;
    margin-top: 0.8rem;
    margin-bottom: 0.4rem;
    overflow: hidden;
}
.titlepre span:nth-of-type(1){
  float: left;
}
.titlepre span:nth-of-type(2){
  float: right;
  color: #acb0bb;
  font-size: 0.28rem;
}
.intro{
    font-size: 0.28rem;
	color: #797b8e;
    text-align: left;
}
.go{
    width: 0.24rem;
    height: 0.28rem;
    background-image: url(../../../static/go2.png);
    background-size: contain;
    background-repeat: no-repeat;
    display: inline-block;
}
.info{
    font-size: 0.3rem;
	color: #2a79f9;
    text-align: left;
    margin-top: 0.4rem;
}
.info span{
    margin: 0 0.2rem;
}
.info1{
    font-size: 0.3rem;
	color: #797b8e;
    text-align: left;
    font-weight: 600;
    margin-top: 0.8rem;
    margin-bottom: 0.5rem;
}
.info1 img{
    float: right;
    margin-top: 0.1rem;
}
.contract{
    text-align: left;
    height: 0.6rem;
}
.contract a{
    text-decoration: none;
    outline: none;
    font-size: 0.3rem;
	color: #797b8e;
   float: left;
}

.daydata{
  width: 100%;
  background-color: #ffffff;
	box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
  padding: 0.4rem;
  box-sizing: border-box;
  overflow: hidden;
}
.daycont{
  width: 50%;
  float: left;
  font-size: 0.24rem;
  color: #797b8e;
  margin-bottom: 0.8rem;
}
.daydata .daycont:nth-last-of-type(1),.daydata .daycont:nth-last-of-type(2){
  margin-bottom: 0rem;
}
.daycont p{
  line-height: 0.5rem;
}
.daycont p:nth-of-type(2){
  font-size: 0.36rem;
	color: #464a58;
}
.daycont p:nth-of-type(3){
  font-size: 0.22rem;
	color: rgb(121, 123, 142);
}




.dapp{
  background-color: #fff;
  box-shadow: 3px 2px 10px 0px 
    rgba(37, 48, 76, 0.08);
    width: 100%;
    height: 3.9rem;
    margin-bottom: 0.4rem;
}
.dapptitle{
  width: 100%;
  height: 1.9rem;
  border-bottom: 1px solid #eff3f5;
  padding-left: 1.7rem;
  box-sizing: border-box;
  padding-top: 0.4rem;
  font-size: 0.32rem;
  position: relative;
}
.dapptitle .imgbox{
  position: absolute;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  overflow: hidden;
  top: 0.4rem;
  left: 0.4rem;
}
.dapptitle .imgbox img{
  float: left;
}
.dapptitle p{
  line-height: 0.6rem;
  text-align: left;
}
.dapptitle p:nth-of-type(1){
  color: #464a58;
}
.dapptitle p:nth-of-type(2){
  font-size: 0.28rem;
	color: #797b8e;
}
.dappdata{
  display: flex;
  justify-content: space-around;
  font-size: 0.24rem;
  padding-top: 0.25rem;
}
.dappcont p{
  line-height: 0.5rem;
}
.dappcont p:nth-of-type(1){
  color: #797b8e;
}
.dappcont p:nth-of-type(2){
  font-size: 0.36rem;
  font-weight: 600;
  color: #464a58;
}
.dappcont p:nth-of-type(3){
  font-size: 0.22rem;
  color: #797b8e;
}
.mgt {
  vertical-align: -1px;
}
</style>
