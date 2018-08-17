<template>
    <div class="top">
        <img src="../../static/logo.png" alt="" class="left cur" @click="gotoindex">
        <div class="middle" :style="{top:srhtop+'px'}">
            <div class="fllt cur cls" style="margin-top:2px;"  @click="showsearch(false)"></div>
            
            <input type="text"  class="fllt" v-model="searchcont" :placeholder="ttarr[$store.state.alllang]" @keyup.13="gotoserh()">
           
            <div class="fllt cur serh" style="margin-top:-2px;" @click="gotoserh"></div>
        </div>
        <!-- 中英文 -->
            <div class="myselect cur" @click="showlang">
                <img :src="langarr[lang]" alt="" style="width:30px;">
                <div v-if="headlang"  v-for="(item,index) in langarr" @click="cglang(index)" style="margin-top:10px;">
                    
                    <img :src="item" alt="" style="width:30px;">
                </div>
            </div>
            
        <div class="right cur rightser" @click="showsearch(true)" v-if="!this.showflag">

        </div>

        
    </div>
</template>

<script>
export default {
    data(){
        return{
            showflag:false,
            searchcont:'',
            lang:0,
            ttarr:['请输入搜索内容','Search...'],
            langarr:['../../static/icon-cn.png','../../static/icon-en.png'],
            srhtop:-60,
            headlang:false
        }
    },
    watch:{
        lang(n,o){
            console.log(n)
            this.$store.commit('changlang',n)
        }
    },
    methods:{
        //是否展示语言下拉
        showlang(){
            this.headlang = !this.headlang
            console.log(this.headlang)
        },
        cglang(a){
            this.lang = a
            
        },
        showsearch(aa){
            this.showflag = !this.showflag
            this.searchcont = ''
            if(aa){
                var topinterval = setInterval(()=>{
                    this.srhtop = this.srhtop + 2
                    if(this.srhtop >= 0){
                        this.srhtop = 0
                        clearInterval(topinterval)
                    }
                },17)
            }else{

                var topinterval = setInterval(()=>{
                    this.srhtop = this.srhtop - 2
                    if(this.srhtop <= -60){
                        this.srhtop = -60
                        clearInterval(topinterval)
                    }
                },17)
            }
        },
        gotoindex(){
            this.$router.push({path:'/'});
        },
        gotoserh(){
            // this.$router.push({path:'/search?id='+this.searchcont});
            this.$router.push({path:'/empty?',query:{id:this.searchcont}});
        },
        
    }
}
</script>

<style scoped>
select {
/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
border: solid 1px #ccc;
/*很关键：将默认的select选择框样式清除*/
appearance:none;
-moz-appearance:none;
-webkit-appearance:none;
/*将背景改为红色*/
background:#fff;
/*加padding防止文字覆盖*/
padding-right: 14px;
}
/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
select::-ms-expand { display: none; }
.myselect{
    width: 40px;
    height: 40px;
    border-radius: 5px;
    margin-right: 40px;
    margin-left: 10px;
    box-sizing: border-box;
    font-size: 16px;
    color: #4f5f6e;
    margin-top: 15px;
    float: right;
}
input{  
	background:none;  
	outline:none;  
	border:0px;  
}
.top{
    height: 60px;
    width: 100%;
    background-color: #fff;
    position: fixed;
    box-shadow: 0px 2px 6px 0px 
		rgba(0, 0, 0, 0.08);
}
.left{
    margin-left: 84px;
    margin-top: 12px;
    float: left;
    width: 129px;
    height: 35px;
}
.middle{
    float: left;
    position: absolute;
    padding-top: 20px;
    width: 300px;
    height: 60px;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
}
.fllt{
    float: left;
    margin: 0 15px;
}
.cls{
    background-image: url(../../static/close1.png);
    width: 14px;
    height: 14px;
}
.cls:hover{
    background-image: url(../../static/close2.png);
}
.serh{
    width: 20px;
    height: 20px;
    background-image: url(../../static/search3.png);
}
.serh:hover{
    background-image: url(../../static/search4.png);
}
.right{
    float: right;
    margin-top: 20px;
    margin-right: 40px;
}
.rightser{
    background-image: url(../../static/search1.png);
    width: 60px;
    height: 60px;
    background-repeat: no-repeat;
    background-position: center center;
    margin: 0;
    transition: all 0.5s
}
.rightser:hover{
    background-image: url(../../static/search4.png);
}
</style>

