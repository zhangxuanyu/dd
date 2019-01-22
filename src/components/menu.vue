<template>
<div style="height:100%;overflow-y:scroll;width:auto;" class="topnav_box1"> 
    <div class="menu" :style="{minHeight:'800px',width:loww}">
        
        
        <div class="lock lotop" v-if="$store.state.themenuflag">
            <img src="../../static/DappData-LOGO1.svg" alt="" class="logo cur" @click="gotoindex">
            <!--  -->
        </div>

        <div v-for="(item,index) in mearr" :key="index" class="type"  v-if="$store.state.themenuflag">
            <p class="type_title" v-if="item.title[$store.state.alllang]">{{item.title[$store.state.alllang]}}</p>
            <div v-for="(ite,ind) in item.content" :key="ind" class="lock cur lockh" :style="ind == select&&index == outselect?{color:'#fff',backgroundColor:'#212b45'}:''" @click="gotoother(ind,index)" @mouseenter="move(ind,index)" @mouseleave="moveout">
                <!-- 改变背景图 -->
                <div  class="left mg1" :style="{backgroundImage:'url('+ite.img+')'}"></div>
            
                <span  class="left mg2">{{ite.word[$store.state.alllang]}}</span>
            </div>
        </div>
        

        <div v-if="!$store.state.themenuflag" style="width:70px;">
            <div class="lock1 lotop" v-if="!$store.state.themenuflag">
                <img src="../../static/DappData-LOGO2.svg" alt="" class="logo1 cur" @click="gotoindex">
                <!-- <div class="right cur rightl" @click="closemenu"></div> -->
            </div>
            <div  class="flpfont" v-if="!$store.state.themenuflag">
                <div v-for="(item,index) in mearr" :key="index" class="type">
                    <p class="type_title title_min" v-if="item.title[$store.state.alllang]"><img src="../../static/simple.png" alt=""></p>
                    <div v-for="(ite,ind) in item.content" :key="ind" class="lock1 cur lockh flip"  :style="ind == select&&index == outselect?{}:''" @click="gotoother(ind,index)"  @mouseenter="move(ind,index)" @mouseleave="moveout">
                        <img :src="ite.img" alt="" class="left mg1 leftl">
                        <!-- 放上去显示分类 -->
                        <!-- <div class="flip1">
                            <span>{{item.word[$store.state.alllang]}}</span>
                        </div> -->
                    </div>

                </div>
            </div>

        </div>
        
        
    </div>

</div>
</template>

<script>
export default {
  data() {
    return {
      //获取高度
      geth: "",
      //菜单数组
      mearr: [
        {
          title: ["", ""],
          content: [
            { word: ["总览", "Overview"], img: "../../static/all2.png" }
          ]
        },
        {
          title: ["公链", "Chain"],
          content: [
            { word: ["公链数据", "Chain"], img: "../../static/data1.png" },
            { word: ["用户分析", "User Analysis"], img: "../../static/useralyse1.png" },
            { word: ["Dapp活跃分析", "Dapp Active"], img: "../../static/dappact1.png" }
          ]
        },
        {
          title: ["Dapp", "Dapp"],
          content: [
            { word: ["综合排行", "Rankings"], img: "../../static/rank2.png" },
            { word: ["用户数量排行", "Users"], img: "../../static/user1.png" },
            { word: ["交易金额排行", "Volume"], img: "../../static/money.png" },
            {
              word: ["合约调用排行", "Transactions"],
              img: "../../static/use.png"
            }
          ]
        },
        // {
        //   title: ["报告", "Report"],
        //   content: [
        //     { word: ["研究报告", "Report"], img: "../../static/report1.png" }
        //   ]
        // }
      ],
      //改变菜单
      // menuflag:true,
      //改变宽度
      loww: "",
      //显示选中
      select: 0,
      outselect:0,
      //页面收缩
      // 记录图片列表
      imglist: ""
    };
  },
  created() {
    this.geth = window.innerHeight - 60 + "px";
    console.log(this.$route.path);

    this.routechange(false);
  },
  computed: {
    flgmenu() {
      return this.$store.state.themenuflag;
    },
    eng_cn(){
        return this.$store.state.alllang;
    }
  },
  watch: {
    eng_cn(n,o){
        if(n == 0){
            document.title = "DappData - 专业的区块链数据服务平台"
        }else if(n == 1){
            document.title = "DappData - Blockchain Data Service Provider"
        }
    },
    $route(to, from) {
      console.log('-----------------------------')
      console.log(to)
      console.log(from)
      this.jump_menu(from.path,to.path)
      this.routechange(true);
    },
    flgmenu(n, o) {
      if (n) {
        this.loww = "";
      } else {
        this.loww = 70 + "px";
      }
    }
  },
  methods: {
    //控制菜单栏伸缩
    jump_menu(from,to){
      if(from =='/'||from =='/rank'||from =='/num'||from =='/money'||from =='/use'||from =='/search'||from =='/report'||from =='/chain' ){
        if(to =='/'||to =='/rank'||to =='/num'||to =='/money'||to =='/use'||to =='/search'||to =='/report'||to =='/chain'||to =='/useranalysis'||to =='/dappactive'){

        }else if(to =='/detail'||to =='/user'||to =='/trade'||to =='/usedapp'||to =='/chaindetail'||to =='/chainuser'||to =='/chainusedapp'||to =='/chaintrade'||to =='/chaindapp'||to =='/userdetail'){
          this.$store.commit('changemenuflag',false)
          console.log('-------------------xiangqing-----------------')
        }
      }else if(from =='/detail'||from =='/user'||from =='/trade'||from =='/usedapp'||from =='/chaindetail'||from =='/chainuser'||from =='/chainusedapp'||from =='/chaintrade'||from =='/chaindapp'||from =='/userdetail'){
        if(to =='/'||to =='/rank'||to =='/num'||to =='/money'||to =='/use'||to =='/search'||to =='/report'||to =='/chain'||to =='/useranalysis'||to =='/dappactive'){
          this.$store.commit('changemenuflag',true)
          console.log('-------------------waimian-----------------')
        }else if(to =='/detail'||to =='/user'||to =='/trade'||to =='/usedapp'||to =='/chaindetail'||to =='/chainuser'||to =='/chainusedapp'||to =='/chaintrade'||to =='/chaindapp'||to =='/userdetail'){

        }
      }
    },
      //图片赋值
      pic_src(aa,bb){
          if(bb == 2){
          if (aa == 0) {
            this.mearr[bb].content[aa].img = "../../static/rank1.png";
            this.$router.push({ path: "/rank" });
          } else if (aa == 1) {
            this.mearr[bb].content[aa].img = "../../static/user2.png";
            this.$router.push({ path: "/num" });
          } else if (aa == 2) {
            this.mearr[bb].content[aa].img = "../../static/money1.png";
            this.$router.push({ path: "/money" });
          } else if (aa == 3) {
            this.mearr[bb].content[aa].img = "../../static/use1.png";
            this.$router.push({ path: "/use" });
          }
      }else if(bb == 0){
          if(aa == 0){
            this.mearr[bb].content[aa].img = "../../static/all2.png";
            this.$router.push({ path: "/" });
          }
      }
      else if(bb == 1){
          if(aa == 0){
            this.mearr[bb].content[aa].img = "../../static/data2.png";
            this.$router.push({ path: "/chain" });
          }
          else if(aa == 1){
            this.mearr[bb].content[aa].img = "../../static/useralyse2.png";
            this.$router.push({ path: "/useranalysis" });
          }else if(aa == 2){
            this.mearr[bb].content[aa].img = "../../static/dappact2.png";
            this.$router.push({ path: "/dappactive" });
          }
      }
      else if(bb == 3){
          if(aa == 0){
            this.mearr[bb].content[aa].img = "../../static/report1.png";
            this.$router.push({ path: "/report" });
          }
      }
      },
    //深拷贝
    deepclone(obj) {
      let _obj = JSON.stringify(obj),
        objClone = JSON.parse(_obj);
      return objClone;
    },
    move(aa,bb) {
      console.log(111111111111111);
      console.log(this.imglist);
      console.log(this.mearr);
      if(bb == 2){
          if (aa == 0) {
            this.mearr[bb].content[aa].img = "../../static/rank1.png";
            
          } else if (aa == 1) {
            this.mearr[bb].content[aa].img = "../../static/user2.png";
            
          } else if (aa == 2) {
            this.mearr[bb].content[aa].img = "../../static/money1.png";
            
          } else if (aa == 3) {
            this.mearr[bb].content[aa].img = "../../static/use1.png";
            
          }
      }else if(bb == 0){
          if(aa == 0){
            this.mearr[bb].content[aa].img = "../../static/all2.png";
            
          }
      }
      else if(bb == 1){
          if(aa == 0){
            this.mearr[bb].content[aa].img = "../../static/data2.png";
          }
          else if(aa == 1){
            this.mearr[bb].content[aa].img = "../../static/useralyse2.png";
          }
          else if(aa == 2){
            this.mearr[bb].content[aa].img = "../../static/dappact2.png";
          }
      }
      else if(bb == 3){
          if(aa == 0){
            this.mearr[bb].content[aa].img = "../../static/report2.png";
            
          }
      }
      console.log(this.imglist);
      console.log(this.mearr);
    },
    moveout() {
      console.log(22222222222);
      console.log(this.imglist);
      this.mearr = this.deepclone(this.imglist);
      console.log(this.mearr);
    },
    gotoindex() {
      this.$router.push({ path: "/" });
    },
    gotoother(aa,bb) {
        console.log(aa)
      this.select = aa;
      this.outselect = bb
      this.$store.commit("savepage", 1);
      this.mearr = [
        {
          title: ["", ""],
          content: [
            { word: ["总览", "Overview"], img: "../../static/all1.png" }
          ]
        },
        {
          title: ["公链", "Chain"],
          content: [
            { word: ["公链数据", "Chain"], img: "../../static/data1.png" },
            { word: ["用户分析", "User Analysis"], img: "../../static/useralyse1.png" },
            { word: ["Dapp活跃分析", "Dapp Active"], img: "../../static/dappact1.png" }
          ]
        },
        {
          title: ["Dapp", "Dapp"],
          content: [
            { word: ["综合排行", "Rankings"], img: "../../static/rank2.png" },
            { word: ["用户数量排行", "Users"], img: "../../static/user1.png" },
            { word: ["交易金额排行", "Volume"], img: "../../static/money.png" },
            {
              word: ["合约调用排行", "Transactions"],
              img: "../../static/use.png"
            }
          ]
        },
        // {
        //   title: ["报告", "Report"],
        //   content: [
        //     { word: ["研究报告", "Report"], img: "../../static/report1.png" }
        //   ]
        // }
      ]
      this.pic_src(aa,bb)
      setTimeout(() => {
        this.imglist = this.deepclone(this.mearr);
        console.log(this.imglist);
      }, 50);
    },

    routechange(abc) {
      this.mearr = [
        {
          title: ["", ""],
          content: [
            { word: ["总览", "Overview"], img: "../../static/all1.png" }
          ]
        },
        {
          title: ["公链", "Chain"],
          content: [
            { word: ["公链数据", "Chain"], img: "../../static/data1.png" },
            { word: ["用户分析", "User Analysis"], img: "../../static/useralyse1.png" },
            { word: ["Dapp活跃分析", "Dapp Active"], img: "../../static/dappact1.png" }
          ]
        },
        {
          title: ["Dapp", "Dapp"],
          content: [
            { word: ["综合排行", "Rankings"], img: "../../static/rank2.png" },
            { word: ["用户数量排行", "Users"], img: "../../static/user1.png" },
            { word: ["交易金额排行", "Volume"], img: "../../static/money.png" },
            {
              word: ["合约调用排行", "Transactions"],
              img: "../../static/use.png"
            }
          ]
        },
        // {
        //   title: ["报告", "Report"],
        //   content: [
        //     { word: ["研究报告", "Report"], img: "../../static/report1.png" }
        //   ]
        // }
      ]
      if (this.$route.path == "/") {
        this.select = 0;
        this.outselect = 0
        this.mearr[0].content[0].img = "../../static/all2.png";
      } else if (this.$route.path == "/rank") {
        this.select = 0;
        this.outselect = 2
        this.mearr[2].content[0].img = "../../static/rank1.png";
      } else if (this.$route.path == "/num") {
        this.select = 1;
        this.outselect = 2
        this.mearr[2].content[1].img = "../../static/user2.png";
      } else if (this.$route.path == "/money") {
        this.select = 2;
        this.outselect = 2
        this.mearr[2].content[2].img = "../../static/money1.png";
      } else if (this.$route.path == "/use") {
        this.select = 3;
        this.outselect = 2
        this.mearr[2].content[3].img = "../../static/use1.png";
      } else if (
        this.$route.path == "/detail" ||
        this.$route.path == "/user" ||
        this.$route.path == "/trade" ||
        this.$route.path == "/usedapp"
      ) {
        this.select = -1;
      } else if (this.$route.path == "/search") {
        this.select = -1;
      }else if (this.$route.path == "/report"){
        this.select = 0;
        this.outselect = 3
        this.mearr[3].content[0].img = "../../static/report2.png";
      }else if (this.$route.path == "/chain"){
        this.select = 0;
        this.outselect = 1
        this.mearr[1].content[0].img = "../../static/data2.png";
      }
      else if (this.$route.path == "/useranalysis"){
        this.select = 1;
        this.outselect = 1
        this.mearr[1].content[1].img = "../../static/useralyse2.png";
      }
      else if (this.$route.path == "/dappactive"){
        this.select = 2;
        this.outselect = 1
        this.mearr[1].content[2].img = "../../static/dappact2.png";
      }
      this.imglist = this.deepclone(this.mearr);
    }
  }
};
</script>

<style scoped>
.topnav_box1::-webkit-scrollbar {
  width: 0px;
  height: 4px;

  background-color: #c1c1c1;
}
.topnav_box1::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 10px;
  background-color: #f1f1f1;
}
.topnav_box1::-webkit-scrollbar-thumb {
  border-radius: 10px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #c1c1c1;
}
.menu {
  width: 250px;
  height: 100%;
  background-color: #25304c;
  border-right: 1px solid #fafafb;
  overflow: hidden;
  transition: all 0.5s;
}
.type{
    overflow: hidden;
    float: left;
    border-bottom: 1px solid #1c253d;
}
.type_title{
    font-size: 16px;
    color: #5a688a;
    float: left;
    margin-left: 30px;
    margin-bottom: 10px;
    margin-top: 20px;
}
.title_min{
    margin-left: 22px;
}
.lock {
  width: 250px;
  height: 70px;
  float: left;
  line-height: 70px;
  color: #a2aece;
  font-size: 16px;
  position: relative;
  margin-bottom: 10px;
}
.leftblue {
  position: absolute;
  left: 0px;
  top: 0px;
  width: 4px;
  height: 70px;
  background-color: #3b8cff;
}
.lock1 {
  width: 70px;
  height: 70px;
  float: left;
  line-height: 0px;
  margin-bottom: 10px;
  color: #4f5f6e;
}
/* .lotop{
    border-bottom: 1px solid #fafafb;
} */
.logo {
  margin-top: 17px;
  float: left;
  margin-left: 30px;
  width: 165px;
  height: 30px;
}
.logo1 {
  margin-top: 17px;
  width: 27px;
  height: 30px;
}
.right {
  float: right;
  margin-top: 20px;
  margin-right: 40px;
}
.rightl {
  margin-right: 29px;
}

.left {
  float: left;
}
.mg1 {
  width: 24px;
  height: 24px;
  margin-left: 30px;
  margin-top: 20px;
}
.leftl {
  margin-left: 19px;
}
.mg2 {
  margin-left: 30px;
}
.lockh:hover {
  color: #d1d8e8;
}
.flip {
  transition: all 1s;
  border-radius: 10px;
  position: relative;
}
.flip1 {
  position: absolute;
  width: 70px;
  height: 70px;
  top: 0px;
  left: 0px;
  overflow: visible;
  word-break: break-all;
  background-color: #f2f4f7;
  opacity: 0;
}
.flip:hover .flip1 {
  opacity: 1;
  transition: all 0.5s ease-in-out 0s;
}

.flip1 span {
  /* word-break: break-all; */
  display: inline-block;
  line-height: 20px;
  width: 46px;
  height: 40px;
  margin-top: 15px;
  overflow: hidden;
  word-wrap: break-word;
  white-space: normal;
}
.flip:nth-of-type(1) span {
  line-height: 35px;
}
</style>
