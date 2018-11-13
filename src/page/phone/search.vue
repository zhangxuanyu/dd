<template>
    <div class="out">
        <div style="position:fixed;width:100%;z-index:99;">
            <div class="topsearch">
                <input type="text" :placeholder="ttarr[0][$store.state.alllang]" class="search" v-model="serachvalue" id="search">
                <span class="close" @click="close">{{ttarr[1][$store.state.alllang]}}</span>
            </div>
        </div>
        
        <div class="searchcont" v-if="searcht" style="padding-top:1.1rem;">
            {{searcht}}  {{ttarr[2][$store.state.alllang]}}
        </div>

        <div style="min-height:100vh;padding: 0 0 1.2rem 0;">
            <div v-for="(item,index) in arr" :key="index" class="searchcont normal" @click="gotodetail(item.dapp_id)">
                <div style="border-radius:15px;overflow:hidden;position:absolute;width:26px;height:26px;" class="titleimg">
                    <img :src="'https://bkc-dapp-1252899312.cos.ap-hongkong.myqcloud.com/dappdata/static/icon/'+item.dapp_id+'.jpg'" alt="" onerror="javascript:this.src='../../../static/all1.png'" style="width:26px;float:left;" >
                </div>
                
                <div class="title">
                    {{item.title}}
                </div>
                <span class="plat">{{item.dapp_id.split('_')[0]}}</span>
            </div>

        </div>

        <ph-foot style="margin:0 -0.3rem;width:auto;"></ph-foot>
    </div>
</template>

<script>
import Axios from "axios";
import phFoot from '../../components/phone/phfoot'
export default {
    components:{
                phFoot
            },
    data(){
        return{
            serachvalue:'',
            ttarr:[['请输入搜索内容','search...'],['取消','close'],['搜索结果','Search Result']],
            showflag:false,
            searcht:'',
            arr:[],
            currentPage1:1,
            all:0,
            isLoading:false
        }
    },
    mounted(){
        $("#search").on('keypress', (e)=> {
        var keycode = e.keyCode;
        //获取搜索框的值
        if (keycode == '13') {
            e.preventDefault();
            //请求搜索接口
            if (this.serachvalue == '') {

            } else {
                this.arr = []
                this.fornew()
            }
        }
    });
    this.scroll()
    },
    methods:{
        gotodetail(id){
            this.$router.push({path:'/detail?id='+id});
        },
        close(){
            this.$router.back(-1)
        },
        fornew(){
            var url = this.$store.state.requrl+'/search';
                    Axios.post(url,{
                                        "key_words":this.serachvalue,
                                        "page":this.currentPage1,
                                        // "page_size":30
                                    },{
                                        headers: {'Content-Type': "application/x-www-form-urlencoded"}
                                    }).then(res => {
                                        console.log(res.data.msg)
                                        this.all = res.data.msg.count
                                        this.arr.push(...res.data.msg.dapp_list)
                                        this.searcht = this.serachvalue
                                        this.isLoading = false
                                    })
        },
        scroll() {
            this.isLoading = false
            window.onscroll = () => {
                // 距离底部200px时加载一次
                let bottomOfWindow = document.documentElement.offsetHeight - document.documentElement.scrollTop - window.innerHeight <= 189
                if (bottomOfWindow && this.isLoading == false) {
                    if(this.all>this.currentPage1*10){
                        this.isLoading == true
                        this.fornew()
                        this.currentPage1 = this.currentPage1 + 1
                    }
                    
                }
            }
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
.out{
    padding: 0 0.3rem;
}
.search{
    width: 100%;
    height: 0.7rem;
    line-height: 0.7rem;
	background-color: #ffffff;
	border-radius: 4px;
    margin-top: 0.29rem;
    float: left;
    padding-left: 0.3rem;
    box-sizing: border-box;
    font-size: 0.34rem;
}
.topsearch{
    background-color: #25304c;
    height: 1.2rem;
    padding: 0 0.3rem;
    padding-right: 1.4rem;
    margin: -0.1rem -0.3rem 0rem -0.3rem;
    margin-right:0.3rem;
    position: relative;
}
.close{
    position: absolute;
    font-size: 0.36rem;
    color: #fff;
    top:0.4rem;
    right: 0.3rem;
}
.searchcont{
    height: 0.8rem;
    line-height: 0.8rem;
    font-size: 0.26rem;
    padding-left: 0.3rem;
    margin: 0 -0.3rem;
    font-weight: 600;
    background-color: #fff;
    text-align: left;
	color: #797b8e;
    border-bottom: 1px solid #eff3f5;
}
.normal{
    height: 1rem;
    line-height: 1rem;
    font-size: 0.34rem;
    font-weight: 400;
    padding-left: 1rem;
    padding-right: 0.3rem;
    border: 0;
    position: relative;
}
.titleimg{
    left: 0.3rem;
    top: 0.2rem;
}
.title{
    float: left;
    white-space:nowrap;
    overflow:hidden; 
    text-overflow:ellipsis;
    width: 4rem;
}
.plat{
    float: right;
}
</style>
