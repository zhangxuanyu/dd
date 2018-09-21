<template>
    <div class="menu" :style="{minHeight:geth,width:loww}">
        
        
        <div class="lock lotop" v-if="$store.state.themenuflag">
            <img src="../../static/logo.png" alt="" class="logo cur" @click="gotoindex">
            <!--  -->
        </div>
        <div v-for="(item,index) in mearr" class="lock cur lockh" v-if="$store.state.themenuflag" :style="index == select?{color:'#fff',backgroundColor:'#212b45'}:''" @click="gotoother(index)" @mouseenter="move(index)" @mouseleave="moveout">
            <!-- <div class="leftblue" v-if="index == select"></div> -->
            <!-- 改变背景图 -->
            <div  class="left mg1" :style="{backgroundImage:'url('+item.img+')'}"></div>
            <!-- <img :src="item.img" alt=""> -->
            <span  class="left mg2">{{item.word[$store.state.alllang]}}</span>
        </div>

        <div v-if="!$store.state.themenuflag" style="width:70px;">
            <div class="lock1 lotop" v-if="!$store.state.themenuflag">
                <img src="../../static/logo1.png" alt="" class="logo1 cur" @click="gotoindex">
                <!-- <div class="right cur rightl" @click="closemenu"></div> -->
            </div>
            <div  class="flpfont">
                <div v-for="(item,index) in mearr" class="lock1 cur lockh flip" v-if="!$store.state.themenuflag" :style="index == select?{}:''" @click="gotoother(index)"  @mouseenter="move(index)" @mouseleave="moveout">
                    <img :src="item.img" alt="" class="left mg1 leftl">
                    <!-- 放上去显示分类 -->
                    <!-- <div class="flip1">
                        <span>{{item.word[$store.state.alllang]}}</span>
                    </div> -->
                </div>
            </div>

        </div>
        
        
    </div>
</template>

<script>
export default {
    data(){
        return {
            //获取高度
            geth:'',
            //菜单数组
            mearr:[
            {word:['总览','Overview'],img:'../../static/all2.png'},
            {word:['综合排行','Rankings'],img:'../../static/rank2.png'},
            {word:['用户数量排行','Users'],img:'../../static/user1.png'},
            {word:['交易金额排行','Volume'],img:'../../static/money.png'},
            {word:['合约调用排行','Transactions'],img:'../../static/use.png'}
            ],
            //改变菜单
            // menuflag:true,
            //改变宽度
            loww:'',
            //显示选中
            select:0,
            //页面收缩
            // 记录图片列表
            imglist:''
            
        }
    },
    created(){
        this.geth = window.innerHeight - 60 + 'px'
        console.log(this.$route.path)
        
        this.routechange(false)
    },
    computed:{
        flgmenu(){
            return this.$store.state.themenuflag
        }
    },
    watch: {
        '$route' (to, from) {
            this.routechange(true)
        },
        flgmenu(n,o){
            if(n){
                this.loww = ''
            }else{
                this.loww = 70+'px'
            }
        }
    },
    methods:{
        //深拷贝
        deepclone(obj){
            let _obj = JSON.stringify(obj),
                objClone = JSON.parse(_obj);
            return objClone
        },
        move(aa){
            console.log(111111111111111)
            console.log(this.imglist)
            if(aa == 0){
                this.mearr[aa].img = '../../static/all2.png'
                
            }else if(aa ==1){
                this.mearr[aa].img = '../../static/rank1.png'
                
            }else if(aa == 2){
                this.mearr[aa].img = '../../static/user2.png'
                
            }else if(aa == 3){
                this.mearr[aa].img = '../../static/money1.png'
                
            }else if(aa ==4){
                this.mearr[aa].img = '../../static/use1.png'
                
            }
            console.log(this.imglist)
            console.log(this.mearr)
        },
        moveout(){
            console.log(22222222222)
            console.log(this.imglist)
            this.mearr = this.deepclone(this.imglist)
        },
        gotoindex(){
            this.$router.push({path:'/'});
        },
        gotoother(aa){
            this.select = aa
            this.$store.commit('savepage',1)
            this.mearr=[
                {word:['总览','Overview'],img:'../../static/all1.png'},
                {word:['综合排行','Rankings'],img:'../../static/rank2.png'},
                {word:['用户数量排行','Users'],img:'../../static/user1.png'},
                {word:['交易金额排行','Volume'],img:'../../static/money.png'},
                {word:['合约调用排行','Transactions'],img:'../../static/use.png'}
            ]
            if(aa == 0){
                this.mearr[aa].img = '../../static/all2.png'
                this.$router.push({path:'/'});
            }else if(aa ==1){
                this.mearr[aa].img = '../../static/rank1.png'
                this.$router.push({path:'/rank'});
            }else if(aa == 2){
                this.mearr[aa].img = '../../static/user2.png'
                this.$router.push({path:'/num'});
            }else if(aa == 3){
                this.mearr[aa].img = '../../static/money1.png'
                this.$router.push({path:'/money'});
            }else if(aa ==4){
                this.mearr[aa].img = '../../static/use1.png'
                this.$router.push({path:'/use'});
            }
            setTimeout(()=>{
                this.imglist = this.deepclone(this.mearr)
                console.log(this.imglist)
            },50)
            
            
        },
        
        routechange(abc){
            this.mearr=[
                {word:['总览','Overview'],img:'../../static/all1.png'},
                {word:['综合排行','Rankings'],img:'../../static/rank2.png'},
                {word:['用户数量排行','Users'],img:'../../static/user1.png'},
                {word:['交易金额排行','Volume'],img:'../../static/money.png'},
                {word:['合约调用排行','Transactions'],img:'../../static/use.png'}
            ]
            if(this.$route.path == '/'){
                this.select = 0
                this.mearr[0].img = '../../static/all2.png'
            }else if(this.$route.path == '/rank'){
                this.select = 1
                this.mearr[1].img = '../../static/rank1.png'
            }else if(this.$route.path == '/num'){
                this.select = 2
                this.mearr[2].img = '../../static/user2.png'
            }else if(this.$route.path == '/money'){
                this.select = 3
                this.mearr[3].img = '../../static/money1.png'
            }else if(this.$route.path == '/use'){
                this.select = 4
                this.mearr[4].img = '../../static/use1.png'
            }else if(this.$route.path == '/detail'||this.$route.path == '/user'||this.$route.path == '/trade'||this.$route.path == '/usedapp'){
                this.select = -1
                // if(this.$store.state.themenuflag&&abc){
                    
                //     this.$store.commit('changeclose')
                // }
                // this.$store.commit('falsemenu',false)
                
                // this.loww = 70+'px'
            }else if(this.$route.path == '/search'){
                this.select = -1
            }
            this.imglist = this.deepclone(this.mearr)
        }
    }
}
</script>

<style scoped>
.menu{
    width: 250px;
    height: 100%;
    background-color: #25304c;
    border-right: 1px solid #fafafb;
    overflow: hidden;
    transition: all 0.5s;
}
.lock{
    width: 250px;
    height: 70px;
    float: left;
    line-height: 70px;
    color: #a2aece;
    font-size: 16px;
    position: relative;
    margin-bottom: 30px;
}
.leftblue{
    position: absolute;
    left: 0px;
    top: 0px;
    width: 4px;
    height: 70px;
    background-color: #3b8cff;
}
.lock1{
    width: 70px;
    height: 70px;
    float: left;
    line-height: 70px;
    margin-bottom: 30px;
    color: #4f5f6e;
}
/* .lotop{
    border-bottom: 1px solid #fafafb;
} */
.logo{
    margin-top: 10px;
    float: left;
    margin-left: 30px;
}
.logo1{
    margin-top: 10px;
}
.right{
    float: right;
    margin-top: 20px;
    margin-right: 40px;
    
}
.rightl{
    margin-right: 29px;
}

.left{
    float: left;
}
.mg1{
    width: 24px;
    height: 24px;
    margin-left:30px;
    margin-top: 20px;
}
.leftl{
    margin-left: 19px;
}
.mg2{
    margin-left: 30px;
}
.lockh:hover{
    color:#d1d8e8;
}
.flip{
    transition: all 1s;
    border-radius: 10px;
    position: relative;
}
.flip1{
    position: absolute;
    width: 70px;
    height: 70px;
    top: 0px;
    left:0px;
    overflow: visible;
    word-break: break-all;
    background-color: #f2f4f7;
    opacity: 0;
}
.flip:hover .flip1{
    opacity: 1;
    transition: all 0.5s ease-in-out 0s;
}

.flip1 span{
    /* word-break: break-all; */
    display: inline-block;
    line-height: 20px;
    width: 46px;
    height: 40px;
    margin-top: 15px;
    overflow: hidden;
    word-wrap:break-word;
    white-space:normal;
}
.flip:nth-of-type(1) span{
    line-height: 35px;
}
</style>
