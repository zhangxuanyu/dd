<template>
    <div style="overflow:hidden;padding-left:1px;height:45px;">
         <div v-for="(item,index) in moneyarr" class="mytype cur" :style="mnysel == index?{color:'rgb(73,165,251)',backgroundColor:'#fff',border:'none'}:''" @click="changemny(index)">
             {{item}}
             <span v-if="index == 1" style="font-size:12px;color:rgb(73, 165, 251)">(beta)</span>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            moneyarr:['ETH','EOS','NAS','TRON','NEO'],
            type:'',
            //币种选择
            mnysel:0,
            //分类模块的显示
            showtype:true,
            
        }
    },
    created(){
        this.mnysel = this.$store.state.moneyty
        this.$store.commit('getdapptype',0)
        this.type = this.$store.state.dapptype
    },
    watch:{
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
    margin-right:30px;
}
</style>


