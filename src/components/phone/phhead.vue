<template>
    <div class="head">
        <img src="../../../static/DappData-LOGO1.svg" alt="" class="logo" v-if="logoflag" @click="gotoindex()">
        
        <div v-if="!logoflag" style="float:right;font-size: 0.36rem;color:#fff;line-height:1.2rem;margin-left:0.4rem;margin-right:0.3rem;" @click="empty">{{langarr[1][$store.state.alllang]}}</div>
        <svg class="ham hamRotate ham1 menu" viewBox="0 0 100 100" width="80"  @click="showmenu" v-if="logoflag">
  <path
        class="line top"
        d="m 30,33 h 40 c 0,0 9.044436,-0.654587 9.044436,-8.508902 0,-7.854315 -8.024349,-11.958003 -14.89975,-10.85914 -6.875401,1.098863 -13.637059,4.171617 -13.637059,16.368042 v 40" />
  <path
        class="line middle"
        d="m 30,50 h 40" />
  <path
        class="line bottom"
        d="m 30,67 h 40 c 12.796276,0 15.357889,-11.717785 15.357889,-26.851538 0,-15.133752 -4.786586,-27.274118 -16.667516,-27.274118 -11.88093,0 -18.499247,6.994427 -18.435284,17.125656 l 0.252538,40" />
</svg>

        <!-- <div class="inputbox"  v-if="inputflag" :style="logoflag?{opacity:num_op,width:length}:{opacity:num_op,width:length,backgroundColor:'#fff'}">
            <div class="search"  v-if="!length"></div>
            <input type="text" v-model="value" placeholder="请输入搜索内容" @focus="showinput(true)" @blur="showinput(false)">
        </div> -->
        <img src="../../../static/phone/search.png" alt="" style="float:right;width:0.38rem;height:0.4rem;margin-top:0.4rem;margin-right:0.4rem;" @click="gotoother(2,3)">

        <div  @touchmove.prevent class="menudetail" :style="showflag?{}:{height:'0rem'}">
            <div v-for="(item,index) in mearr" :key="index" class="mutitle">
                <div v-if="item.title[$store.state.alllang]" class="type">
                    {{item.title[$store.state.alllang]}}
                </div>
                <div v-for="(it,idx) in item.content" :key="idx" class="title" @click="gotoother(idx,index)">
                    <p><img :src="it.img" alt="" style="width:0.4rem;height:0.4rem;">{{it.word[$store.state.alllang]}}</p>
                </div>
            </div>

            <div class="language" @click="changelang()">
                <p><img :src="$store.state.alllang==0?'../../../static/icon-cn.png':'../../../static/icon-en.png'" alt="">{{langarr[0][$store.state.alllang]}}</p>
            </div>
            
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      value: "",
      showflag: false,
      //菜单数组
      mearr: [
        {
          title: ["", ""],
          content: [
            { word: ["总览", "Overview"], img: "../../static/phone/Management.png" }
          ]
        },
        // {
        //   title: ["公链", "Chain"],
        //   content: [
        //     { word: ["公链数据", "Chain"], img: "../../static/data1.png" }
        //   ]
        // },
        {
          title: ["Dapp", "Dapp"],
          content: [
            { word: ["综合排行", "Rankings"], img: "../../static/phone/Comprehensive.png" },
            { word: ["用户数量排行", "Users"], img: "../../static/phone/User.png" },
            { word: ["交易金额排行", "Volume"], img: "../../static/phone/Transaction.png" },
            {
              word: ["合约调用排行", "Transactions"],
              img: "../../static/phone/Contract.png"
            }
          ]
        },
        {
          title: ["报告", "Report"],
          content: [
            { word: ["研究报告", "Report"], img: "../../static/phone/Report.png" }
          ]
        }
      ],
      //   语言
      langarr: [["简体中文", "English"],["取消", "no"]],
      // 控制输入框的显示隐藏
      inputflag: true,
      num_op:1,
      length:'',
      //logo等显示
      logoflag:true,

    };
  },
  created() {},
  methods: {
    gotoindex(){
      this.$router.push({path:'/'});
    },
      //清空输入
      empty(){
          this.value = ''
      },
      //输入框拉长
      showinput(flag){
          if(flag){
              this.logoflag = false
              this.length = '5.8rem'
          }else{
              this.length = ''
              setTimeout(()=>{
                  this.logoflag = true
              },400)
              this.empty()
          }
      },
    //改变语言
    changelang() {
      if (this.$store.state.alllang == 0) {
        this.$store.commit("changlang", 1);
      } else if (this.$store.state.alllang == 1) {
        this.$store.commit("changlang", 0);
      }
      this.showmenu()
    },
    
    showmenu() {
      this.showflag = !this.showflag;
      document.getElementsByClassName("menu")[0].classList.toggle("active");


      if(this.inputflag){
          var opac = setInterval(()=>{
              if(this.num_op <= 0){
                  clearInterval(opac)
              }
              this.num_op = this.num_op - 0.1
            },40)
            setTimeout(()=>{
                this.inputflag = false
            },400)
      }else{
          this.inputflag = true
          var opac = setInterval(()=>{
              if(this.num_op >= 1){
                  clearInterval(opac)
              }
              this.num_op = this.num_op + 0.1
            },40)
      }
      
    },
    gotoother(index, block) {
      if(block == 3){
        this.$router.push({ path: "/search" });
      }else{
        if (block == 1) {
        if (index == 0) {
          this.$router.push({ path: "/rank" });
        } else if (index == 1) {
          this.$router.push({ path: "/num" });
        } else if (index == 2) {
          this.$router.push({ path: "/money" });
        } else if (index == 3) {
          this.$router.push({ path: "/use" });
        }
      } else if (block == 0) {
        if (index == 0) {
          this.$router.push({ path: "/" });
        }
      }
      // else if(block == 1){
      //     if(index == 0){
      //       this.$router.push({ path: "/chain" });
      //     }
      // }
      else if (block == 2) {
        if (index == 0) {
          this.$router.push({ path: "/report" });
        }
      }
      this.$store.commit("savepage", 1);
      this.showmenu();
      }
      
    }
  }
};
</script>

<style scoped lang="scss">
div {
  box-sizing: border-box;
}
.ham {
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: transform 400ms;
  -moz-user-select: none;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.hamRotate.active {
  transform: rotate(45deg);
}
.hamRotate180.active {
  transform: rotate(180deg);
}
.line {
  fill: none;
  transition: stroke-dasharray 400ms, stroke-dashoffset 400ms;
  stroke: #fff;
  stroke-width: 5.5;
  stroke-linecap: round;
}
.ham1 .top {
  stroke-dasharray: 40 139;
}
.ham1 .bottom {
  stroke-dasharray: 40 180;
}
.ham1.active .top {
  stroke-dashoffset: -98px;
}
.ham1.active .bottom {
  stroke-dashoffset: -138px;
}

*:focus {
  outline: 0;
}
.head {
  width: 100%;
  height: 1.2rem;
  background-color: #25304c;
  // overflow: hidden;
  position: fixed;
  z-index: 99;
}
.logo {
  width: 2.14rem;
  height: 0.4rem;
  margin-top: 0.4rem;
  margin-left: 0.3rem;
  cursor: pointer;
  float: left;
}
.menu {
  float: right;
  width: 0.96rem;
  margin-top: 0.14rem;
}
.inputbox {
    width: 3rem;
  height: 0.5rem;
  background-color: #37425e;
  border-radius: 0.04rem;
  float: right;
  padding-left: 0.65rem;
  position: relative;
  margin-top: 0.35rem;
  transition: width 0.4s;
}
.search {
  position: absolute;
  top: 0.14rem;
  left: 0.2rem;
  width: 0.25rem;
  height: 0.25rem;
  background-image: url(../../../static/phone/search.png);
  background-size: contain;
}
.inputbox input {
  width: 90%;
  font-size: 0.2rem;
  float: left;
  background-color: rgba(0,0,0,0);
  border: 0;
  margin-top: 0.12rem;
}
.menudetail {
  width: 100%;
  height: 100%;
  background-color: #25304c;
  position: fixed;
  top: 1.2rem;
  overflow: hidden;
  text-align: left;
  padding-left: 0.3rem;
  transition: all 0.4s;
  z-index: 9999;
}
.type {
  height: 0.7rem;
  background-color: #212b45;
  font-size: 0.24rem;
  line-height: 0.7rem;
  color: #5a688a;
  margin-left: -0.3rem;
  padding-left: 0.3rem;
}
.title {
  width: 100%;
  height: 1.29rem;
  border-bottom: 1px solid #1c253d;
  font-size: 0.3rem;
  line-height: 1.29rem;
  letter-spacing: 1px;
  color: #a2aece;
}
.title img {
  vertical-align: middle;
  margin-right: 0.3rem;
}
.mutitle .title:nth-last-of-type(1) {
  border: 0;
}

.language {
  width: 100%;
  height: 1.29rem;
  position: absolute;
  bottom: 1.2rem;
  font-size: 0.3rem;
  line-height: 1.29rem;
  letter-spacing: 1px;
  color: #a2aece;
}
.language img {
  width: 0.5rem;
  height: 0.5rem;
  vertical-align: middle;
  margin-right: 0.3rem;
}
</style>
