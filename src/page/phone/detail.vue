<template>
    <div>
        <ph-name></ph-name>
        <ph-type></ph-type>
        <p class="preview">{{ttarr[5][$store.state.alllang]}}</p>
                <!-- 轮播图 -->
                <div v-if="arr">
                      <div class="pic topnav_box" >
                    <ul :style="allleng" class="allpic"  v-show="picshow">
                        <li v-for="(item,index) in picarr" class="outpic" v-show="imgcount">
                          <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/'+urlid+'/'+item+'.png'" alt="" onerror="javascript:this.src=''"  class="picwh" @click="show_dapp_pic('https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/'+urlid+'/'+item+'.png')">
                          <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/'+urlid+'/'+item+'.jpg'" alt="" onerror="javascript:this.src=''"  class="picwh" @click="show_dapp_pic('https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/'+urlid+'/'+item+'.jpg')"> </li>
                        <li v-for="(item,index) in picarr" class="inpic" v-show="!imgcount"><img :src="wrongarr[index]" alt="" onerror="javascript:this.src=''"  class="picwh" @click="show_dapp_pic(wrongarr[index])"></li>
                    </ul>
                </div>
        <p class="preview">{{ttarr[0][$store.state.alllang]}}</p>
        <p class="intro">
            {{arr.en_cn[$store.state.alllang].description}}
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

        <div class="info1">{{ttarr[4][$store.state.alllang]}} <img :src="showindex?'../../../static/unshow.png':'../../../static/show.png'" alt="" @click="changeindex(arr.contracts.length>1)"  v-if="arr.contracts.length>1"></div>
        <div  v-for="(item,index) in arr.contracts" :key="index" class="contract" v-if="index<=showindex">
            <a :href="'https://explorer.nebulas.io/#/address/'+item" v-if="arr.platform == 'NAS'" target="_black" rel="noopener noreferrer">{{item}}</a>
            <a :href="'https://etherscan.io/address/'+item" v-if="arr.platform == 'ETH'" target="_black" rel="noopener noreferrer">{{item}}</a>
            <a :href="'https://eospark.com/MainNet/account/'+item" v-if="arr.platform == 'EOS'" target="_black" rel="noopener noreferrer">{{item}}</a>  
        </div>
                </div>
              
    </div>
</template>

<script>
import phName from '../../components/phone/dappname.vue'
import phType from '../../components/phone/detail_type.vue'
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
                ["预览","Preview"]
            ],
        }
    },
    created(){
        setTimeout(() => {
            this.fornew();
        }, 100);
    },
    mounted(){
        setTimeout(() => {

      $(".outpic").each(a => {
        console.log($(".outpic").eq(a)[0].children);
        if (
          $(".outpic")
            .eq(a)[0]
            .children[0].src.indexOf("jpg") != -1 ||
          $(".outpic")
            .eq(a)[0]
            .children[0].src.indexOf("png") != -1
        ) {
          this.imgcount++;
        }
        if (
          $(".outpic")
            .eq(a)[0]
            .children[1].src.indexOf("jpg") != -1 ||
          $(".outpic")
            .eq(a)[0]
            .children[1].src.indexOf("png") != -1
        ) {
          this.imgcount++;
        }
      });
      console.log(this.imgcount);
      if (this.imgcount) {
        this.allleng = { width: this.imgcount * 365 + "px" };
      } else {
        this.allleng = { width: this.wrongarr.length * 365 + "px" };
      }
    }, 1000);
    },
    methods:{
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
      var url =
        this.$store.state.requrl +
        "/" +
        this.$store.state.appid.split("_")[0].toLowerCase() +
        "/detail";
      console.log(url);
      Axios.post(
        url,
        {
          dapp_id: this.$store.state.appid,
          flag:1
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        setTimeout(() => {
          this.picshow = true;
        }, 2000);
        console.log(res.data.msg);
        this.arr = res.data.msg;
        this.urlid = res.data.msg.dapp_id;
        // if (this.arr.platform == "NAS") {
        //   this.theurl =
        //     "https://explorer.nebulas.io/#/address/" + this.arr.contracts[0];
        // } else if (this.arr.platform == "ETH") {
        //   this.theurl = "https://etherscan.io/address/" + this.arr.contracts[0];
        // }
        // this.$store.commit("changeloadopacty", false);
      });
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
</style>
