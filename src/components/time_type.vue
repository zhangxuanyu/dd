<template>
    <div style="overflow:hidden;padding-left:1px;height:45px;margin-top:-30px;">
         <p class="right"><span style="margin-right:14px;font-size:14px;">{{time[$store.state.alllang]}}</span>
            <el-date-picker
            v-model="value1"
            type="date"
            placeholder="选择日期" style="font-size:16px;margin-right:10px;">
            </el-date-picker>
            <span style="margin-left:30px;margin-right:14px;font-size:14px;" v-if="showtype">{{tyarr[$store.state.alllang]}}</span>
            <el-select v-model="type"   class="top_right"  v-if="showtype">
                <el-option :key="index" :label="item[$store.state.alllang]" :value="index" v-for="(item,index) in typearr1" v-if="$store.state.moneyty == 0">{{item[$store.state.alllang]}}</el-option>
                <el-option :key="index" :label="item[$store.state.alllang]"  :value="index" v-for="(item,index) in typearr2" v-if="$store.state.moneyty == 1">{{item[$store.state.alllang]}}</el-option>
                <el-option :key="index" :label="item[$store.state.alllang]"  :value="index" v-for="(item,index) in typearr3" v-if="$store.state.moneyty == 2">{{item[$store.state.alllang]}}</el-option>
            </el-select>
         </p>
    </div>
</template>

<script>
export default {
    data(){
        return{
            moneyarr:['ETH','EOS','NAS'],
            typearr1:[['全部','total'],['交易所','exchanges'],['游戏','game'],['高风险','high-rish'],['市场','marketplaces'],['博彩','gambling'],['其他','other']],
            typearr2:[['全部','total'],['游戏','game'],['工具','tool'],['交易所','exchanges'],['市场','marketplaces'],['博彩','gambling'],['高风险','high-rish'],['其他','other']],
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
       
        if(this.$route.path == '/chain'){
            this.showtype = false
        }
        this.$store.commit('getdapptype',0)
        this.type = this.$store.state.dapptype
    },
    computed:{
        thetype_money(){
            return this.$store.state.moneyty
        }
    },
    watch:{
        thetype_money(){
            this.type = 0
        },
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
            this.$store.commit('savepage',1)
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
    border: none;
    box-sizing: border-box;
    font-size: 14px;
    color: #4f5f6e;
    border-radius: 20px;
    background-color: #e8ecf2;
    /* background-color: #fff; */
}
select option{
    background-color: #fff;
}
select option:hover{
    background-color: #f8f9fa;
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
    border: solid 1px #e0e7ed;
	border-radius: 20px;
    color: #797b8e; 
}
.right{
    float:right;
    color: #797b8e;
    font-weight: 400;
}
</style>

<style>
.right .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 194px;
}
.right .el-input--suffix .el-input__inner{
    border-radius: 20px;
    background-color: #f7f8fa;
    width: 200px;
}
.right .el-input__suffix{
    right:25px;
}
.right .el-input__inner{
    font-size:14px;
    color:#797b8e;
    height: 30px;
    line-height: 30px;
}
.right .el-input__icon{
    line-height: 30px;
}
</style>
