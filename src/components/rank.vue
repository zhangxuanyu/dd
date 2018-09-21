<template>
    <div class="menu" :style="{minHeight:geth,width:loww}">
        
        <div v-for="(item,index) in mearr" class="outlock">
            <div class="lock lockh " :style="index == select?{color:'#48a5fb',backgroundColor:'#f6f9fb'}:''"  @click="gotoother(index,true)">
                <img :src="item.img" alt="" class="left mg1 cur" >
                <span  class="left mg2 cur" >{{item.word[$store.state.alllang]}}</span>
                <img :src="item.icon" alt="" @click.stop="changeflag(index)" class="cur">
            </div>
            <div v-if="item.address.length > 0&&item.flag" v-for="(itt,indd) in item.address" :class="{'adflow':true,'cur':true,'nobot':indd==item.address.length-1}" @click="run(index,item.posi[indd],index)" :style="">
                {{itt[$store.state.alllang]}}
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
            {word:['应用详情','Details'],img:'../../static/an.png'},
            {word:['用户分析','User Analysis'],img:'../../static/an.png',icon:'../../static/downcld.png',flag:false,address:[['累计用户','Users'],['新增用户','New users'],['活跃用户','Active Users']],posi:[0,630,1920]},
            {word:['交易数据','Transaction Data'],img:'../../static/an.png',icon:'../../static/downcld.png',flag:false,address:[['交易笔数','Transactions'],['交易总额','Volume']],posi:[0,1300]},
            // {word:['合约调用','Transactions'],img:'../../static/an.png',icon:'../../static/downcld.png',flag:false,address:[['调用次数','Transactions'],['实时调用','nowcall']],posi:[0,1350]}
            {word:['合约调用','Transactions'],img:'../../static/an.png'}
            ],
            //路由数组
            routearr:['/detail','/user','/trade','/usedapp'],
            //改变宽度
            loww:'',
            //显示选中
            select:0,
            //子类选中
            minselect:0,
            urlid:''
        }
    },
    created(){
        this.geth = window.innerHeight - 60 + 'px'
        let href = window.location.href;
                if(href.indexOf('?')>-1){
                    console.log(window.location.href.split('?')[1].split('='||'&'))
                    var code = window.location.href.split('?')[1].split('=')[0];
                    var num = window.location.href.split('?')[1].split('=')[1];
                    // this.code = num
                    var num1 = num.replace(/(%[0-9]+)/, ' ')
                    var num2 =  num.replace(/(%[0-9]+)/, '-')
                    console.log(num2)
                    this.urlid = num
                    this.$store.commit('theappid',num)
                }
        console.log(this.$route.path)
         this.mearr=[
                {word:['应用详情','Details'],img:'../../static/an.png'},
                {word:['用户分析','User Analysis'],img:'../../static/an.png',icon:'../../static/downcld.png',flag:false,address:[['累计用户','Users'],['新增用户','New users'],['活跃用户','Active Users']],posi:[0,630,1920]},
                {word:['交易数据','Transaction Data'],img:'../../static/an.png',icon:'../../static/downcld.png',flag:false,address:[['交易笔数','Transactions'],['交易总额','Volume']],posi:[0,1300]},
                 {word:['合约调用','Transactions'],img:'../../static/an.png'}
            ]
        if(this.$route.path == '/detail'){
            this.select = 0
            this.mearr[0].img = '../../static/light.png'
           
        }else if(this.$route.path == '/user'){
            this.select = 1
            this.mearr[1].img = '../../static/light.png'
        }else if(this.$route.path == '/trade'){
            this.select = 2
            this.mearr[2].img = '../../static/light.png'
        }else if(this.$route.path == '/usedapp'){
            this.select = 3
            this.mearr[3].img = '../../static/light.png'
        }
        this.changeflag(this.select)
    },
    watch:{
        mearr(n,o){
            console.log(n)
        }
    },
    methods:{
        gotoother(aa,bb){
            
            console.log(this.routearr[aa] != this.$route.path)
            console.log(this.$route.path)
            if(this.routearr[aa] != this.$route.path){
                    this.select = aa
                // this.mearr[0].img = '../../static/an.png'
                // this.mearr[1].img = '../../static/an.png'
                // this.mearr[2].img = '../../static/an.png'
                // this.mearr[3].img = '../../static/an.png'
                this.mearr=[
                    {word:['应用详情','Details'],img:'../../static/an.png'},
                    {word:['用户分析','User Analysis'],img:'../../static/an.png',icon:'../../static/downcld.png',flag:false,address:[['累计用户','Users'],['新增用户','New users'],['活跃用户','Active Users']],posi:[0,630,1920]},
                    {word:['交易数据','Transaction Data'],img:'../../static/an.png',icon:'../../static/downcld.png',flag:false,address:[['交易笔数','Transactions'],['交易总额','Volume']],posi:[0,1300]},
                    {word:['合约调用','Transactions'],img:'../../static/an.png'}
                ]
                if(aa == 0){
                    this.mearr[aa].img = '../../static/light.png'
                    this.$router.push({path:'/detail?id='+this.urlid});
                }else if(aa ==1){
                    this.mearr[aa].img = '../../static/light.png'
                    this.$router.push({path:'/user?id='+this.urlid});
                }else if(aa == 2){
                    this.mearr[aa].img = '../../static/light.png'
                    this.$router.push({path:'/trade?id='+this.urlid});
                }else if(aa == 3){
                    this.mearr[aa].img = '../../static/light.png'
                    this.$router.push({path:'/usedapp?id='+this.urlid});
                }
                console.log(3333333333)
            }
            
           if(bb){
                this.changeflag(aa)
           }
           
           
        },
        changeflag(aa){
            console.log(aa)
            console.log(this.mearr[aa].flag)
            if(String(this.mearr[aa].flag) == 'true'){
                console.log(2222222)
                this.mearr[aa].flag = false
                this.mearr[aa].icon = '../../static/downcld.png'
            }else if(String(this.mearr[aa].flag) == 'false'){
                console.log(11111111)
                this.mearr[aa].flag = true
                this.mearr[aa].icon = '../../static/upcld.png' 
            }
            console.log(this.mearr[aa].flag)
        },
        //滑动页面
        run(ind,ab,inn){
            if(this.select != ind){
                this.gotoother(inn,false)
            }
            console.log(ab)
            setTimeout(() => {
              var bbc = document.documentElement.scrollTop || document.body.scrollTop; 
              if(bbc < ab){
                  var toscroll =  setInterval(()=>{
                    bbc = bbc + 100
                    if(bbc >= ab){
                        window.scrollTo(0,ab)
                        clearInterval(toscroll)
                        return
                    }
                    
                    window.scrollTo(0,bbc)
                },10)
              }else if(bbc > ab){
                  var toscroll =  setInterval(()=>{
                    bbc = bbc - 100
                    if(bbc <= ab){
                        window.scrollTo(0,ab)
                        clearInterval(toscroll)
                        return
                    }
                   
                    window.scrollTo(0,bbc)
                },10)
              }else{

              }
          }, 500);
        }
    }
}
</script>

<style scoped>
.menu{
    width: 220px;
    height: 100%;
    padding-top: 52px;
    background-color: #fff;
}
.outlock{
    overflow: hidden;
    margin-bottom: 61px;
}
.lock{
    width: 220px;
    height: 40px;
    float: left;
    line-height: 40px;
    color: #4f5f6e;
    font-size: 16px;
    
}
.lock:hover .mg2{
    color: #49a5fb;  
}
.lock1{
    width: 70px;
    height: 70px;
    float: left;
    line-height: 70px;
    color: #4f5f6e;
}
.right{
    float: right;
    width: 19px;
    height: 17px;
    margin-top: 20px;
    margin-right: 40px;
    background-image: url(../../static/menu2.png);
}
.rightl{
    margin-right: 29px;
}
.right:hover{
    background-image: url(../../static/menu1.png);
}
.left{
    float: left;
}
.mg1{
    width: 6px;
    height: 6px;
    margin-left: 26px;
    margin-top: 16px;
}
.leftl{
    margin-left: 19px;
}
.mg2{
    margin-left: 30px;
}
.lockh:hover{
    color: #48a5fb;
}
.adflow{
    width: 220px;
    height: 35px;
    line-height: 35px;
    font-size: 14px;
    color: #808c9b;
    box-sizing: border-box;
    padding-left: 62px;
    float: left;
    text-align: left;
    margin-bottom: 20px;
}
.adflow:hover{
    color:#48a5fb;
}
.nobot{
    margin-bottom: 0px;
}
</style>
