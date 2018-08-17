<template>
    <div style="overflow:hidden;padding-left:1px;height:45px;">
         <div v-for="(item,index) in moneyarr" class="mytype cur" :style="mnysel == index?{color:'#409efe',boxShadow: '2px 2px 11px 0px rgba(59, 140, 255, 0.3)'}:''" @click="changemny(index)">{{item}}</div>
         <p class="right"><span style="margin-right:12px;">{{time[$store.state.alllang]}}</span>
            <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期" style="font-size:16px;">
            </el-date-picker>
            <span v-if="showtype" style="margin-left:48px;margin-right:12px;">{{tyarr[$store.state.alllang]}}</span>
            <select v-model="type" class="myselect" v-if="showtype">
                <option :value="index" v-for="(item,index) in typearr1" v-if="$store.state.moneyty == 0">{{item[$store.state.alllang]}}</option>
                <option :value="index" v-for="(item,index) in typearr2" v-if="$store.state.moneyty == 1">{{item[$store.state.alllang]}}</option>
                <option :value="index" v-for="(item,index) in typearr3" v-if="$store.state.moneyty == 2">{{item[$store.state.alllang]}}</option>
            </select>
         </p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            moneyarr:['ETH','EOS','NAS'],
            typearr1:[['全部','total'],['交易所','exchanges'],['游戏','game'],['高风险','high-rish'],['市场','marketplaces'],['博彩','gambling'],['其他','other']],
            typearr2:[['全部','total'],['游戏','game'],['工具','tool'],['交易所','exchanges'],['其他','other']],
            typearr3:[['全部','total'],['游戏','game'],['工具','tool'],['市场','marketplaces'],['其他','other']],
            value1: '',
            time:['日期','Date'],
            tyarr:['分类','Categories'],
            type:'',
            //币种选择
            mnysel:0,
            //分类模块的显示
            showtype:true,
            
        }
    },
    created(){
        this.mnysel = this.$store.state.moneyty
        if(this.$store.state.requesttime){
            this.value1 = new Date(this.$store.state.requesttime);
        }else{
             var now = new Date();
            //小时,分钟，秒，毫秒
            //凌晨2点50分50秒0毫秒
            now.setHours(0, 0, 0, 0);
            console.log(now.getTime());
            this.$store.commit('gettime',now.getTime()-86400000)
            this.value1 = new Date(this.$store.state.requesttime);
        }
       
        if(this.$route.path == '/rank'){
            this.showtype = false
        }
        this.$store.commit('getdapptype',0)
        this.type = this.$store.state.dapptype
    },
    watch:{
        value1(n,o){
            console.log(n)
            var date = new Date(n);
            // 有三种方式获取，在后面会讲到三种方式的区别
            var time1 = date.getTime();
            //请求的时间戳
            this.$store.commit('gettime',time1)
            console.log(time1)
        },
        type(n,o){
            console.log(n)
            this.$store.commit('getdapptype',n)
        }
    },
    methods:{
        changemny(aa){
            this.mnysel = aa
            this.$store.commit('getdapptype',0)
            this.type = this.$store.state.dapptype
            this.$store.commit('changemoneyty',aa)
        }
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
outline: none;
}
/*清除ie的默认选择框样式清除，隐藏下拉箭头*/
select::-ms-expand { display: none; }
.myselect{
    width: 200px;
    height: 40px;
    border-radius: 5px;
    padding-left: 20px;
    box-sizing: border-box;
    font-size: 16px;
    color: #4f5f6e;
    border-radius: 20px;
    background-color: #edeff7;
}
.mytype{
    float: left;
    width: 120px;
    height: 40px;
    font-size: 14px;
    line-height: 40px;
    box-sizing: border-box;
    margin-right: 20px;
    position: relative;
    background-color: #ffffff;
	border-radius: 20px;
    color: #808c9b;
    
}
.right{
    float:right;
    margin-right:30px;
}
</style>

<style>
..el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 200px;
}
.el-input--suffix .el-input__inner{
    border-radius: 20px;
    background-color: #edeff7;
    width: 200px;
}
.el-input__suffix{
    right:25px;
}
</style>
