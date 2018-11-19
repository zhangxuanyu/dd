<template>
    <div style="padding-left:1px;height:0.6rem;">
         <div class="rightph"><span :style="$store.state.alllang == 1?{marginRight:'0.85rem'}:{}" class="timetext">{{time[$store.state.alllang]}}</span>
            <!-- <div @click="openPicker" class="timein" :style="$store.state.alllang == 1?{marginLeft:'0.74rem'}:{}">
                <div class="timebox">{{dateTime}}</div>
            </div> -->
            <input type="text" id="demo_date" v-model="timevalue"  style="float:left;color:#797b8e;padding-left:0.3rem;margin-bottom:0.35rem;width: 2.4rem;height: 0.6rem;border: 1px solid #dfe4ed;border-radius: 0.3rem;box-sizing: border-box;margin-right:1rem;"/>

            <div style="float:left;margin-bottom:0.3rem;">
                <span style="margin-right:0.14rem;font-size:0.26rem;margin-top: 0.15rem;float:left" v-if="showtype">{{tyarr[$store.state.alllang]}}</span>
                <el-select v-model="type"   class="top_right"  v-if="showtype" style="float:left">
                    <el-option :key="index" :label="item[$store.state.alllang]" :value="index" v-for="(item,index) in typearr1" v-if="$store.state.moneyty == 0">{{item[$store.state.alllang]}}</el-option>
                    <el-option :key="index" :label="item[$store.state.alllang]"  :value="index" v-for="(item,index) in typearr2" v-if="$store.state.moneyty == 1">{{item[$store.state.alllang]}}</el-option>
                    <el-option :key="index" :label="item[$store.state.alllang]"  :value="index" v-for="(item,index) in typearr3" v-if="$store.state.moneyty == 2">{{item[$store.state.alllang]}}</el-option>
                </el-select>
            </div>
            
            
            
         </div>

    </div>
</template>

<script>
export default {
    data(){
        return{
            moneyarr:['ETH','EOS','NAS'],
            typearr1:[['全部','total'],['交易所','exchanges'],['游戏','game'],['高风险','high-risk'],['市场','marketplaces'],['博彩','gambling'],['其他','other']],
            typearr2:[['全部','total'],['游戏','game'],['工具','tool'],['交易所','exchanges'],['市场','marketplaces'],['博彩','gambling'],['高风险','high-risk'],['其他','other']],
            typearr3:[['全部','total'],['游戏','game'],['工具','tool'],['市场','marketplaces'],['其他','other']],
            value1: '',
            time:['日期','Date'],
            tyarr:['分类','Categories'],
            type:'',
            //币种选择
            mnysel:0,
            //分类模块的显示
            showtype:true,
            dateTime:'',
            pickerValue:'',
            timevalue:''
        }
    },
    created(){
        this.mnysel = this.$store.state.moneyty
        // this.timeday(new Date(this.begintime))
        if(this.$store.state.requesttime){
            // this.pickerValue = new Date(this.$store.state.requesttime)
            // this.dateTime = this.timeday(new Date(this.$store.state.requesttime));
            this.timevalue = this.timeday(new Date(this.$store.state.requesttime));
        }else{
             var now = new Date();
            //小时,分钟，秒，毫秒
            //凌晨2点50分50秒0毫秒
            now.setHours(0, 0, 0, 0);
            // this.pickerValue = new Date(now.getTime()-86400000)
            console.log(now.getTime());
            this.$store.commit('gettime',now.getTime()-86400000)
            // this.dateTime = this.timeday(new Date(this.$store.state.requesttime));
            this.timevalue = this.timeday(new Date(this.$store.state.requesttime));
        }
       
        if(this.$route.path == '/chain'){
            this.showtype = false
        }
        this.$store.commit('getdapptype',0)
        this.type = this.$store.state.dapptype
    },
    mounted(){
        var theme = "ios";
        var mode = "scroller";
        var display = "bottom";
        var lang="zh";
        var that = this
        $('#demo_date').mobiscroll().date({
            
            theme: theme,
            mode: mode,
            display: display,
            lang: lang,
            // dateFormat:"yyyy-mm-dd",
            // minDate: new Date(2018,3,10),
            // maxDate: new Date(2030,7,30),
            // stepMinute: 1
            onSelect:function(textVale,inst){ //选中时触发事件
                that.requesttime(textVale)
            }
        })
        
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
        },
        
    },
    methods:{
    requesttime(textVale){
        var now = new Date(textVale)
            now.setHours(0, 0, 0, 0)
            console.log(now.getTime())
            this.$store.commit('gettime',now.getTime())
    },
        //时间处理
    timeday(time) {
      var year = time.getFullYear();
      var month = time.getMonth() + 1;
      if (month < 10) {
        month = "0" + month;
      }
      var day = time.getDate();
      if (day < 10) {
        day = "0" + day;
      }
      return year + "/" + month + "/" + day;
    },
        openPicker(){
            this.$refs.picker.open();
        },
        handleConfirm(){
            var now = new Date(this.pickerValue);
            this.$store.commit('gettime',now.getTime())
            // this.begintime = now.getTime();
            // console.log(now.getTime());
            // console.log(now.getFullYear());
            this.dateTime = this.timeday(now);
        },
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
input{  
	background:none;  
	outline:none;  
	border:0px;  
}
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

select option{
    background-color: #fff;
}
select option:hover{
    background-color: #f8f9fa;
}

.rightph{
    float:left;
    color: #797b8e;
    font-weight: 400;
    width: 100%;
}

.timein {
  float: left;
  font-size: 0.26rem;
  color: #797b8e;
  line-height: 0.6rem;
  margin-bottom: 0.2rem;
  margin-right: 1.3rem;
}
.timebox {
  height: 0.6rem;
  width: 2.4rem;
  border-radius: 0.3rem;
  border: 1px solid #dfe4ed;
  padding: 0 0.3rem;
  text-align: left;
  float: left;
  box-sizing: border-box;
}
.timetext{
    margin-right:0.14rem;
    font-size:0.26rem;
    float:left;
    margin-top: 0.15rem;
    margin-bottom:0.3rem;
}
</style>

<style>
.rightph .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 2.4rem;
}
.rightph .el-input--suffix .el-input__inner{
    border-radius: 0.3rem;
    background-color: rgba(0,0,0,0);
    width: 2.4rem;
}
.rightph .el-input__suffix{
    right:0.25rem;
}
.rightph .el-input__inner{
    font-size:0.26rem;
    color:#797b8e;
    height: 0.6rem;
    line-height: 0.6rem;
    border: 1px solid #dfe4ed;
}
.rightph .el-input__icon{
    line-height: 0.6rem;
}
.rightph .el-icon-date:before {
    content: "";
}
.rightph .el-input--prefix .el-input__inner{
    padding-left:0.3rem;
}

.picker-slot {
  float: left;
}
.picker-items {
  overflow: hidden;
  display: flex;
  position: relative;
  justify-content: space-around;
}
.picker-toolbar {
  display: flex;
  justify-content: space-around;
}
.picker-center-highlight {
  position: absolute;
  width: 100%;
  top: 125px;
  border-top: 1px solid #e4e4e4;
  border-bottom: 1px solid #e4e4e4;
}
.rightpage .el-select .el-input__inner {
  width: 1.6rem;
  height: 0.6rem;
}
.rightpage .el-select .el-input .el-select__caret {
  line-height: 0.6rem;
}
</style>
