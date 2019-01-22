<template>
    <div class="topname">
        <div class="outtitle">
            <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+showDapp.dapp_id+'.jpg'" alt="" class="titleimg" onerror="javascript:this.src='../../static/all1.png'">
            <div class="title">
                <p class="titlf" style="overflow : hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;">{{showDapp.title[$store.state.alllang]}}</p>
                <p class="titlty">{{showDapp.platform}} | {{showDapp.category}}</p>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from "axios";
export default {
    data(){
        return{
            showDapp: '',
            urlid:''
        }
    },
    created(){
      console.log(1111111111111111)
        setTimeout(() => {
      this.request();
    }, 50);
    setTimeout(() => {
      console.log(this.showDapp);
    }, 3000);
    let href = window.location.href;
    if (href.indexOf("?") > -1) {
      console.log(window.location.href.split("?")[1].split("=" || "&"));
      var code = window.location.href.split("?")[1].split("=")[0];
      var num = window.location.href.split("?")[1].split("=")[1];
      // this.code = num
      var num1 = num.replace(/(%[0-9]+)/, " ");
      var num2 = num.replace(/(%[0-9]+)/, "-");
      console.log(num2);
      this.urlid = num;
      this.$store.commit("theappid", num);
    }
    },
    methods:{
        request() {
      var url =
        this.$store.state.requrlnew +
        "/dapp/detail";
      console.log(url);
      Axios.post(
        url,
        {
          blockchain:this.$store.state.appid.split("_")[0].toLowerCase(),
          dapp_id:this.$store.state.appid
        },
        {
          headers: { "Content-Type": "application/x-www-form-urlencoded" }
        }
      ).then(res => {
        console.log(res.data.msg);
        this.showDapp = res.data.msg
      });
    },
    }
}
</script>

<style scoped>
.topname{
    margin: 0 -0.3rem;
    margin-top: -0.5rem;
    background-color: #fff;
}
.titleimg {
  width: 1.3rem;
  height: 1.3rem;
  float: left;
  margin-right: 0.3rem;
}
.title {
  float: left;
  text-align: left;
}
.titlf {
  font-size: 0.36rem;
  font-weight: 600;
  color: #4f5f6e;
  line-height: 0.84rem;
  
}
.titlty {
  font-size: 0.26rem;
  color: #808c9b;
}
.outtitle {
    box-sizing: border-box;
  height: 2.1rem;
  border-bottom: 1px solid #eff3f5;
  padding:0.4rem 0.3rem;
  position: relative;
  cursor: pointer;
}
.outtitle:hover .title_tips{
  display: block;
}
.title_tips{
  position: absolute;
	height: 0.2rem;
	box-shadow: 2px 2px 4px 0px 
		rgba(118, 118, 118, 0.3);
	border: solid 1px #767676;
  background-color: #fff;
  display: none;
  padding: 0 0.1rem;
  top: 0.28rem;
  left: 0.81rem;
  font-size: 1.2rem;
	color: #4f5f6e;
  line-height: 0.22rem;
  white-space:nowrap;
}
.pagetype{
    height: 0.89rem;
    padding: 0.3rem;
    box-sizing: border-box;
}

</style>
