<template>
    <div class="top"  :style="{paddingLeft:open}">
        <div class="left cur" @click="closemenu"></div>
        <!-- <div class="middle" :style="{top:srhtop+'px'}"> -->
            <div class="middle" :style="{top:srhtop+'px'}">
            <div class="fllt cur cls" style="margin-top:2px;"  @click="showsearch(false)"></div>
            
            <input type="text"  class="fllt" v-model="searchcont" :placeholder="ttarr[$store.state.alllang]" @keyup.13="gotoserh()" ref="content" @blur="showsearch(false)">
           
            <div class="fllt cur serh" style="margin-top:-2px;" @click="gotoserh()"></div>
        </div>
        <!-- 中英文 -->
            <div class="myselect cur" @mouseenter="showlang" @mouseleave="showlang">
                <img :src="langarr[$store.state.alllang]" alt="" style="width:30px;">
                <div class="selectbox">
                    <div class="selectboxshaw">
                        <div v-if="headlang"  v-for="(item,index) in langarr" @click="cglang(index)" style="width:90px;height:40px;backgroundColor:#fff;">
                            <p>
                                <img :src="item" alt="" style="width:20px;float:left;marginTop:10px;margin-left:20px;">
                                <span style="float:right;font-size:14px;line-height:40px;margin-right:14px;color:#797b8e;">{{choose[index]}}</span>
                            </p>
                        </div>
                    </div>
                    
                </div>
                
            </div>
            
        <div class="right cur rightser" @click="showsearch(true)" v-show="!this.showflag">

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
            choose:['CN','EN'],
            ttarr:['请输入搜索内容','Search...'],
            langarr:['../../static/icon-cn.png','../../static/icon-en.png'],
            srhtop:-60,
            headlang:false,
            open:''
        }
    },
    computed:{
        addclose(){
                return this.$store.state.themenuflag 
            },
    },
    watch:{
        lang(n,o){
            console.log(n)
            
        },
        addclose(n,o){
            this.allchange(n)
        }
    },
    created(){
        this.allchange(this.$store.state.themenuflag)
    },
    methods:{
        allchange(aa){
            if(aa){
                this.open = 253+'px'
            }else{
                this.open =70+'px'
            }
        },
        //关闭弹窗
        closemode(){
            this.showflag=false
            this.srhtop=-60
        },
        //菜单伸缩
        closemenu(){
            this.$store.commit('changemenuflag',!this.$store.state.themenuflag)
            
            this.allchange(this.$store.state.themenuflag)
            
            this.$store.commit('changeclose')
            
            console.log(this.$store.state.themenuflag)
        },
        //是否展示语言下拉
        showlang(){
            this.headlang = !this.headlang
            console.log(this.headlang)
            
            
        },
        cglang(a){
            this.lang = a
            this.$store.commit('changlang',a)
            this.showlang()
        },
        showsearch(aa){
            setTimeout(()=>{
                this.searchcont = ''
                if(aa){
                    this.showflag = true
                    var topinterval = setInterval(()=>{
                        this.srhtop = this.srhtop + 4
                        if(this.srhtop >= 0){
                            this.srhtop = 0
                            clearInterval(topinterval)  
                        }
                        //避免触发失去焦点事件
                        
                                this.$refs.content.focus()
                         
                    },17)
                }else{
                    this.showflag = false
                    var topinterval = setInterval(()=>{
                        this.srhtop = this.srhtop - 4
                        if(this.srhtop <= -60){
                            this.srhtop = -60
                            clearInterval(topinterval)
                            
                        }
                    },17)
                }

            },50)
        },
        
        gotoserh(){
            // this.$router.push({path:'/search?id='+this.searchcont});
            this.$router.replace({path:'/empty?',query:{id:this.searchcont}});
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
    margin-right: 30px;
    margin-left: 10px;
    box-sizing: border-box;
    font-size: 16px;
    color: #4f5f6e;
    margin-top: 15px;
    float: right;
    position: relative;
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
    box-sizing: border-box;
    position: fixed;
    box-shadow: 0px 2px 6px 0px 
		rgba(0, 0, 0, 0.08);
        transition: all 0.5s;
}
.left{
    margin-left: 30px;
    margin-top: 22px;
    padding-right: 30px;
    width: 19px;
    height: 17px;
    float: left;
    background-repeat: no-repeat;
    border-right: 1px solid #e8e8f1;
    background-image: url(../../static/menu2.png);
}
.left:hover{
    background-image: url(../../static/menu1.png);
}
.middle{
    float: left;
    position: absolute;
    padding-top: 20px;
    width: 400px;
    height: 60px;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    box-sizing: border-box;
}
.fllt{
    float: left;
    margin: 0 15px;
    width: 269px;
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
    float: left;
    margin-top: 20px;
    margin-right: 40px;
}
.rightser{
    background-image: url(../../static/search1.png);
    width: 80px;
    height: 60px;
    background-repeat: no-repeat;
    background-position: center center;
    margin: 0;
    transition: all 0.5s
}
.rightser:hover{
    background-image: url(../../static/search4.png);
}
.selectbox{
    position: absolute;
    padding-top: 20px;
    top: 30px;
    right:0px;
    
}
.selectboxshaw{
    box-shadow: 3px 2px 10px 0px 
		rgba(37, 48, 76, 0.08);
}
</style>

