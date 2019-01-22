<template>
    <div style="overflow:hidden;padding-left:1px;height:45px;margin-top:-30px;">
         <div class="right">
             <div class="timetab" v-for="(item,index) in  arr" :key="index" :style="select == index?{color:'#409efe',border:'1px solid #409efe'}:{}" @click="changesel(index)">{{item[$store.state.alllang]}}</div>
         </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
           arr:[['全部','All'],['近三月','Last Quarter'],['本月','Last Month']],
           select:2
            
        }
    },
    created(){
        
    },
    mounted(){
        
    },
    computed:{
        
    },
    watch:{
        
    },
    methods:{
        changesel(index){
            this.select = index
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
    overflow: hidden;
}
.timetab{
    width: 100px;
	height: 30px;
	border-radius: 15px;
	border: solid 1px #ebecf0;
    margin-left: 30px;
    text-align: center;
    line-height: 30px;
    float: right;
    color: #797b8e;
    font-size: 14px;
    cursor: pointer;
}
</style>

